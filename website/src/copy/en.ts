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

import type { Copy } from './types';

// The Incubator disclaimer is quoted verbatim from the Incubator branding
// guide and appears in English on every page, whatever the page language.
export const incubatorDisclaimer =
  'Apache Maka is an effort undergoing incubation at The Apache Software Foundation (ASF), sponsored by the Apache Incubator. Incubation is required of all newly accepted projects until a further review indicates that the infrastructure, communications, and decision making process have stabilized in a manner consistent with other successful ASF projects. While incubation status is not necessarily a reflection of the completeness or stability of the code, it does indicate that the project has yet to be fully endorsed by the ASF.';

export const en: Copy = {
  locale: 'en',
  langLabel: 'EN',
  siteName: 'Apache Maka (Incubating)',
  positioning:
    'Apache Maka (Incubating) is a high-performance agent workspace that keeps a complete record of everything it did.',
  theme: { toDark: 'Switch to dark mode', toLight: 'Switch to light mode' },
  nav: {
    docs: 'Docs',
    downloads: 'Downloads',
    benchmarks: 'Benchmarks',
    community: 'Community',
    security: 'Security',
    asf: 'ASF',
    getMaka: 'Get Maka',
  },
  hero: {
    headline: [
      'A high-performance agent workspace that ',
      'keeps a complete record',
      ' of everything it did.',
    ],
    lede: 'An agent harness exists to finish tasks. We hold it to one measure: how many it completes and at what cost. We publish every run: same model, same official verifier, full per-task record.',
    nightly: 'Try Desktop Nightly',
    source: 'Build from source',
    fine: 'Nightly is a developer build, not an ASF release',
    architecture: 'Read the architecture',
  },
  scene: {
    events: [
      { tone: 'mut', name: 'Model says', detail: '"I\'ll rerun the failing test."' },
      { tone: '', name: 'Runs a command', detail: 'Bash · npm test' },
      { tone: 'warn', name: 'Asks permission', detail: 'leaves the sandbox' },
      { tone: 'ok', name: 'You approve', detail: 'written down too' },
      { tone: '', name: 'Gets the result', detail: 'exit 1 · trimmed, but kept' },
      { tone: 'dim', name: 'Edits a file', detail: 'resume.ts' },
      { tone: 'dim ok', name: 'Turn ends', detail: 'run completed' },
    ],
    highWater: 'what the model still sees',
    caption: 'one turn · seven steps written down · nothing erased',
    formula: 'The log is the runtime',
  },
  measured: { h2: 'Measured, not claimed. Recorded, not remembered.' },
  leaderboard: {
    h3: 'Nine harnesses, one model, the official verifier',
    meta: 'Terminal-Bench 2.1 · DeepSeek V4 Flash · 89 tasks',
    more: 'Read the report',
    caption: 'pass@1 · reasoning max · one run per cell',
  },
  scatter: {
    h3: 'What a passed task cost',
    more: 'Outcome-normalized economics',
    x: 'Cost per passed task (USD)',
    y: 'Pass@1',
    caption: 'cost includes the failed runs · up and left is better',
  },
  paired: {
    h3: 'Head to head, same suite',
    more: 'Read the paired report',
    maka: 'Maka',
    other: 'OpenCode',
    of: 'of 89 tasks',
    gap: '+12 tasks · +13.5 pp',
    note: 'p = 0.0118, exact McNemar · cost per passed task at parity',
  },
  difficulty: {
    h3: 'No points dropped on the easy ones',
    more: 'Per-task CSV',
    rows: [
      { label: 'Easy', sub: 'solved by 7 to 9 harnesses · 48 tasks' },
      { label: 'Contested', sub: 'solved by 4 to 6 · 25 tasks' },
      { label: 'Hard', sub: 'solved by 3 or fewer · 16 tasks' },
    ],
    caption: 'Maka pass rate, nine-harness run',
  },
  get: {
    h3: 'Get Maka',
    nightly: {
      title: 'Try Desktop Nightly',
      body: 'Daily builds from main on GitHub Releases. Apple Silicon Macs; Windows is an unsigned preview.',
      note: 'NOT AN ASF RELEASE · MAY BE UNSTABLE',
    },
    source: {
      title: 'Build from source',
      body: 'Clone apache/maka, then npm ci and npm run build.',
      note: 'APACHE-2.0',
    },
    releases: {
      title: 'Apache Releases',
      body: 'None yet. When one exists, the signed source archive is the release.',
      note: 'KEYS · SHA-512 · .asc',
    },
  },
  reads: {
    h2: 'Reports and writing',
    blogLog: {
      cover: 'Why the log, not the screen, is the source of truth',
      kind: 'Blog',
      h3: 'Log Is the Runtime',
      meta: 'Kun Li · English / 中文',
    },
    blogTools: {
      cover: 'How an agent gets past function calling to the real world',
      kind: 'Blog',
      h3: 'Beyond Function Calling: How Agents Reach the Real World',
      meta: 'Kun Li · English / 中文',
    },
    nineArm: {
      cover: 'Maka is second of nine harnesses on Terminal-Bench 2.1',
      kind: 'Report',
      h3: 'Terminal-Bench 2.1, nine harnesses',
      meta: 'Report and per-task CSV',
    },
    paired: {
      cover: 'Twelve more tasks than OpenCode on the same 89',
      kind: 'Report',
      h3: 'Maka vs OpenCode',
      meta: 'Report and per-task CSV',
    },
  },
  footer: {
    foundation: 'Foundation',
    incubator: 'Incubator',
    conduct: 'Code of Conduct',
    license: 'License',
    events: 'Events',
    privacy: 'Privacy',
    security: 'Security',
    sponsorship: 'Sponsorship',
    thanks: 'Thanks',
    disclaimer: incubatorDisclaimer,
    trademark:
      'Copyright © 2026 The Apache Software Foundation, licensed under the Apache License, Version 2.0. Apache Maka, Apache Incubator, Apache and the Apache feather logo are trademarks of The Apache Software Foundation.',
  },
  downloads: {
    title: 'Downloads',
    lede: 'The signed source archive is the release. Everything else on this page is a convenience build, and says so.',
    onThisPage: 'On this page',
    copy: 'Copy',
    copied: 'Copied',
    status: {
      h3: 'Current status',
      release: {
        label: 'Apache release',
        value: 'None yet. The first one appears here after its vote.',
        note: 'NOT YET',
      },
      nightly: {
        label: 'Desktop Nightly',
        value: 'Daily from main, Apple Silicon Macs, Windows unsigned preview.',
        note: 'NOT AN ASF RELEASE',
      },
      source: {
        label: 'Source',
        value: 'apache/maka on GitHub, Apache License 2.0.',
        note: 'APACHE-2.0',
      },
    },
    releases: {
      h2: 'Apache releases',
      note: 'NO APACHE RELEASE YET',
      p: 'Apache Maka (Incubating) has not made an Apache release. When the first one passes its vote, this section will list it: the source archive, its SHA-512 checksum and detached GPG signature from the ASF distribution directory, and the KEYS file the signature verifies against.',
      distNote: 'Until then the distribution directory does not exist:',
    },
    verify: {
      h2: 'Verify a release',
      p: 'Every Apache release is verified the same way, and every reviewer on the vote does this before voting.',
      keys: 'Step 1: Import the release managers’ keys',
      signature: 'Step 2: Check the signature',
      checksum: 'Step 3: Check the checksum',
    },
    nightly: {
      h2: 'Desktop Nightly',
      note: 'NOT AN ASF RELEASE',
      p: 'Desktop Nightly is built daily from main for developers and testers and published as a GitHub prerelease. Choose the newest Maka Desktop Nightly; after installation the app updates itself on the Nightly channel. It is not an ASF release and is not intended for production use. It targets Apple Silicon Macs.',
      windows: 'Windows is an unsigned preview, not a supported release tier.',
    },
    source: {
      h2: 'Build from source',
      prerequisites: [
        'Node.js 22.19 or newer',
        'npm 11',
        'Git',
        'ripgrep, which the Grep tool shells out to',
      ],
      clone: 'Step 1: Clone the repository',
      build: 'Step 2: Install and build every workspace',
      after:
        'CONTRIBUTING covers the workspace layout and how to start Desktop, the TUI and the CLI from that build.',
    },
  },
};
