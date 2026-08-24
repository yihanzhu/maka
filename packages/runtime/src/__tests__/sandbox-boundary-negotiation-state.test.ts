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

import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { RuntimeEvent } from '@maka/core/runtime-event';

import { foldSandboxBoundaryNegotiationState } from '../sandbox-boundary-negotiation-state.js';

test('folds parallel boundary failures in one provider step as one correction round', () => {
  const events: RuntimeEvent[] = [];
  for (let index = 1; index <= 3; index += 1) {
    events.push(
      functionCall('inv-1', `call-${index}`, 'shared-step', index * 2 - 1),
      functionResponse('inv-1', `call-${index}`, index * 2),
    );
  }

  assert.deepEqual(foldSandboxBoundaryNegotiationState(events), {
    denied: false,
    invalidAttempts: 0,
    unresolvedRequirements: 1,
  });
});

test('keeps reused step ids distinct across continuation invocations', () => {
  const events = [1, 2, 3].flatMap((index) => [
    functionCall(`inv-${index}`, `call-${index}`, 'reused-step', index * 2 - 1),
    functionResponse(`inv-${index}`, `call-${index}`, index * 2),
  ]);

  assert.deepEqual(foldSandboxBoundaryNegotiationState(events), {
    denied: false,
    invalidAttempts: 0,
    unresolvedRequirements: 3,
    finalizationReason: 'unresolved_requirement_limit',
  });
});

test('ignores a delayed pre-approval failure that becomes durable after the approval', () => {
  const events = [
    functionCall('inv-1', 'call-before-approval', 'step-1', 1),
    runtimeEvent('inv-1', 'request', 2, {
      stateDelta: { sandboxBoundaryRequest: { requestId: 'request-1' } },
    }),
    runtimeEvent('inv-1', 'decision', 3, {
      stateDelta: {
        sandboxBoundaryDecision: {
          requestId: 'request-1',
          decision: 'allow',
          status: 'approved',
        },
      },
    }),
    functionResponse('inv-1', 'call-before-approval', 4),
  ];

  assert.deepEqual(foldSandboxBoundaryNegotiationState(events), {
    denied: false,
    invalidAttempts: 0,
    unresolvedRequirements: 0,
  });
});

test('does not treat a pre-denial call that settles late as a post-denial retry', () => {
  const delayedResult: RuntimeEvent = {
    ...runtimeEvent('inv-1', 'delayed-result', 4),
    role: 'tool',
    author: 'tool',
    content: {
      kind: 'function_response',
      id: 'call-before-denial',
      name: 'Bash',
      isError: true,
      result: {
        kind: 'terminal',
        cwd: '/workspace',
        cmd: 'blocked',
        status: 'failed',
        exitCode: 1,
        output: {
          mode: 'pipes',
          stdout: '',
          stderr: 'denied',
          stdoutTruncated: false,
          stderrTruncated: false,
          redacted: false,
        },
        sandboxDenial: { likely: true },
      },
    },
  };
  const events = [
    functionCall('inv-1', 'call-before-denial', 'step-1', 1),
    runtimeEvent('inv-1', 'request', 2, {
      stateDelta: { sandboxBoundaryRequest: { requestId: 'request-1' } },
    }),
    runtimeEvent('inv-1', 'decision', 3, {
      stateDelta: {
        sandboxBoundaryDecision: {
          requestId: 'request-1',
          decision: 'deny',
          status: 'denied',
        },
      },
    }),
    delayedResult,
  ];

  assert.deepEqual(foldSandboxBoundaryNegotiationState(events), {
    denied: true,
    invalidAttempts: 0,
    unresolvedRequirements: 0,
  });
});

test('restores a post-denial retry made through a custom wrapper tool', () => {
  const wrapperCall: RuntimeEvent = {
    ...functionCall('inv-1', 'wrapper-call', 'step-2', 4),
    content: {
      kind: 'function_call',
      id: 'wrapper-call',
      name: 'McpProxy',
      args: { operation: 'request authority' },
    },
  };
  const wrapperResult: RuntimeEvent = {
    ...runtimeEvent('inv-1', 'wrapper-result', 5),
    role: 'tool',
    author: 'tool',
    content: {
      kind: 'function_response',
      id: 'wrapper-call',
      name: 'McpProxy',
      isError: true,
      result: {
        kind: 'text',
        text: 'the user denied boundary expansion',
        sandboxFailure: { reason: 'invalid_boundary_declaration' },
      },
    },
  };
  const events = [
    runtimeEvent('inv-1', 'request', 1, {
      stateDelta: { sandboxBoundaryRequest: { requestId: 'request-1' } },
    }),
    runtimeEvent('inv-1', 'decision', 2, {
      stateDelta: {
        sandboxBoundaryDecision: {
          requestId: 'request-1',
          decision: 'deny',
          status: 'denied',
        },
      },
    }),
    wrapperCall,
    wrapperResult,
  ];

  assert.deepEqual(foldSandboxBoundaryNegotiationState(events), {
    denied: true,
    invalidAttempts: 0,
    unresolvedRequirements: 0,
    finalizationReason: 'post_denial_retry',
  });
});

function functionCall(invocationId: string, id: string, stepId: string, ts: number): RuntimeEvent {
  return {
    ...runtimeEvent(invocationId, `event-${id}`, ts),
    role: 'model',
    author: 'agent',
    modelVisibility: 'hidden',
    content: { kind: 'function_call', id, name: 'Read', args: { path: '/outside' } },
    refs: { stepId },
  };
}

function functionResponse(invocationId: string, id: string, ts: number): RuntimeEvent {
  return {
    ...runtimeEvent(invocationId, `result-${id}`, ts),
    role: 'tool',
    author: 'tool',
    modelVisibility: 'hidden',
    content: {
      kind: 'function_response',
      id,
      name: 'Read',
      isError: true,
      result: {
        kind: 'text',
        text: 'boundary required',
        sandboxFailure: { reason: 'sandbox_boundary_required' },
      },
    },
  };
}

function runtimeEvent(
  invocationId: string,
  id: string,
  ts: number,
  actions?: RuntimeEvent['actions'],
): RuntimeEvent {
  return {
    id,
    invocationId,
    runId: `run-${invocationId}`,
    sessionId: 'session-1',
    turnId: `turn-${invocationId}`,
    ts,
    partial: false,
    role: 'system',
    author: 'system',
    ...(actions ? { actions } : {}),
  };
}
