/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import type { SandboxBoundaryNegotiationState } from '@maka/core/events';
import type { RuntimeEvent } from '@maka/core/runtime-event';

import { REQUEST_SANDBOX_BOUNDARY_TOOL_NAME } from './sandbox-boundary-tool.js';

export const SANDBOX_BOUNDARY_NEGOTIATION_FAILURE_LIMIT = 3;

export function foldSandboxBoundaryNegotiationState(
  events: readonly RuntimeEvent[],
): SandboxBoundaryNegotiationState {
  const requestIds = new Set<string>();
  const toolCorrectionScopes = new Map<
    string,
    { readonly scope: string; readonly approvalGeneration: number }
  >();
  const invalidCorrectionScopes = new Set<string>();
  const requirementCorrectionScopes = new Set<string>();
  let approvalGeneration = 0;
  let denied = false;
  let invalidAttempts = 0;
  let unresolvedRequirements = 0;
  let finalizationReason: SandboxBoundaryNegotiationState['finalizationReason'];

  for (const event of events) {
    const request = event.actions?.stateDelta?.sandboxBoundaryRequest as
      | { requestId?: unknown }
      | undefined;
    if (typeof request?.requestId === 'string') {
      requestIds.add(requestIdentity(event.invocationId, request.requestId));
    }

    const decision = event.actions?.stateDelta?.sandboxBoundaryDecision as
      | { decision?: unknown; requestId?: unknown; status?: unknown }
      | undefined;
    if (
      typeof decision?.requestId === 'string' &&
      requestIds.has(requestIdentity(event.invocationId, decision.requestId))
    ) {
      if (decision.decision === 'deny' && decision.status === 'denied') {
        approvalGeneration += 1;
        denied = true;
      } else if (decision.decision === 'allow' && decision.status === 'approved') {
        approvalGeneration += 1;
        denied = false;
        invalidAttempts = 0;
        unresolvedRequirements = 0;
        invalidCorrectionScopes.clear();
        requirementCorrectionScopes.clear();
        finalizationReason = undefined;
      } else if (decision.status === 'conflict') {
        const scope = `${event.invocationId}:boundary-request:${decision.requestId}`;
        if (!requirementCorrectionScopes.has(scope)) {
          requirementCorrectionScopes.add(scope);
          unresolvedRequirements += 1;
        }
      }
    }

    const content = event.content;
    if (content?.kind === 'function_call') {
      const correctionScope = event.refs?.stepId
        ? `${event.invocationId}:provider-step:${event.refs.stepId}`
        : event.refs?.parentToolCallId
          ? `${event.invocationId}:code-parent:${event.refs.parentToolCallId}`
          : event.refs?.parentOperationId
            ? `${event.invocationId}:code-operation:${event.refs.parentOperationId}`
            : `${event.invocationId}:tool-call:${content.id}`;
      toolCorrectionScopes.set(toolIdentity(event.invocationId, content.id), {
        scope: correctionScope,
        approvalGeneration,
      });
      const repairedBoundaryAttempt =
        content.name === 'invalid' &&
        content.args !== null &&
        typeof content.args === 'object' &&
        (content.args as { sandboxBoundaryAttempt?: unknown }).sandboxBoundaryAttempt === true;
      if (
        denied &&
        (content.name.toLowerCase() === REQUEST_SANDBOX_BOUNDARY_TOOL_NAME ||
          repairedBoundaryAttempt)
      ) {
        finalizationReason = 'post_denial_retry';
      }
      continue;
    }
    if (content?.kind !== 'function_response') continue;
    const call = toolCorrectionScopes.get(toolIdentity(event.invocationId, content.id));
    if (call && call.approvalGeneration !== approvalGeneration) continue;
    const result = content.result;
    if (!result || typeof result !== 'object' || Array.isArray(result)) continue;
    const record = result as {
      sandboxDenial?: unknown;
      sandboxFailure?: { reason?: unknown };
    };
    if (denied && record.sandboxDenial !== undefined) {
      finalizationReason = 'post_denial_retry';
    }
    const reason = record.sandboxFailure?.reason;
    const correctionScope = call?.scope ?? `${event.invocationId}:tool-call:${content.id}`;
    if (reason === 'invalid_boundary_declaration') {
      if (denied) finalizationReason = 'post_denial_retry';
      else if (!invalidCorrectionScopes.has(correctionScope)) {
        invalidCorrectionScopes.add(correctionScope);
        invalidAttempts += 1;
      }
    } else if (reason === 'sandbox_boundary_required' || reason === 'requires_bypass') {
      if (denied) finalizationReason = 'post_denial_retry';
      else if (!requirementCorrectionScopes.has(correctionScope)) {
        requirementCorrectionScopes.add(correctionScope);
        unresolvedRequirements += 1;
      }
    }
    if (invalidAttempts >= SANDBOX_BOUNDARY_NEGOTIATION_FAILURE_LIMIT) {
      finalizationReason ??= 'invalid_attempt_limit';
    }
    if (unresolvedRequirements >= SANDBOX_BOUNDARY_NEGOTIATION_FAILURE_LIMIT) {
      finalizationReason ??= 'unresolved_requirement_limit';
    }
  }

  return {
    denied,
    invalidAttempts,
    unresolvedRequirements,
    ...(finalizationReason ? { finalizationReason } : {}),
  };
}

export function continuationLineageEvents(
  events: readonly RuntimeEvent[],
  sourceInvocationId: string,
): RuntimeEvent[] {
  const immediateSources = new Map<string, string>();
  for (const event of events) {
    const ancestor = event.actions?.continuationStart?.immediateSource.invocationId;
    if (ancestor) immediateSources.set(event.invocationId, ancestor);
  }
  const lineage = new Set<string>();
  let invocationId: string | undefined = sourceInvocationId;
  while (invocationId && !lineage.has(invocationId)) {
    lineage.add(invocationId);
    invocationId = immediateSources.get(invocationId);
  }
  return events.filter((event) => lineage.has(event.invocationId));
}

function requestIdentity(invocationId: string, requestId: string): string {
  return `${invocationId}\u0000${requestId}`;
}

function toolIdentity(invocationId: string, toolCallId: string): string {
  return `${invocationId}\u0000${toolCallId}`;
}
