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

import { en, incubatorDisclaimer } from './en';
import type { Copy } from './types';

export const zhCN: Copy = {
  locale: 'zh-CN',
  langLabel: '中文',
  siteName: 'Apache Maka (Incubating)',
  positioning: 'Apache Maka（孵化中）是一个高性能的 Agent 工作台，并完整记录它做过的每一件事。',
  theme: { toDark: '切换到深色模式', toLight: '切换到浅色模式' },
  nav: {
    docs: '文档',
    downloads: '下载',
    benchmarks: '评测',
    community: '社区',
    security: '安全',
    asf: 'ASF',
    getMaka: '获取 Maka',
  },
  hero: {
    headline: ['一个高性能的 Agent 工作台，', '并完整记录', '它做过的每一件事。'],
    lede: 'Agent harness 的本职就是把任务做完。衡量它的标准只有一条：完成了多少，花了多少。我们公开每一次运行：同一个模型，同一个官方验证器，逐任务的完整记录。',
    nightly: '体验 Desktop Nightly',
    source: '从源码构建',
    fine: 'Nightly 是开发者构建，不是 ASF release',
    architecture: '阅读架构文档',
  },
  scene: {
    events: [
      { tone: 'mut', name: '模型说', detail: '「我重新跑一下失败的测试。」' },
      { tone: '', name: '执行命令', detail: 'Bash · npm test' },
      { tone: 'warn', name: '请求权限', detail: '超出沙箱' },
      { tone: 'ok', name: '你批准了', detail: '决定一并记录' },
      { tone: '', name: '拿到结果', detail: 'exit 1 · 裁剪展示，全量保留' },
      { tone: 'dim', name: '修改文件', detail: 'resume.ts' },
      { tone: 'dim ok', name: '本轮结束', detail: '运行完成' },
    ],
    highWater: '模型仍看得到的部分',
    caption: '一轮对话 · 七步全部写下 · 不删不改',
    formula: '日志就是运行时',
  },
  measured: { h2: '只认实测数据，只信落盘记录。' },
  leaderboard: {
    h3: '9 个 harness，同一个模型，官方验证器',
    meta: 'Terminal-Bench 2.1 · DeepSeek V4 Flash · 89 个任务',
    more: '查看评测报告',
    caption: 'pass@1 · reasoning max · 每格一次运行',
  },
  scatter: {
    h3: '通过一个任务花了多少',
    more: '按结果归一的成本',
    x: '每个通过任务的成本（美元）',
    y: 'Pass@1',
    caption: '成本含失败的运行 · 越靠左上越好',
  },
  paired: {
    h3: '同一套任务，正面对比',
    more: '查看对比报告',
    maka: 'Maka',
    other: 'OpenCode',
    of: '/ 89 个任务',
    gap: '多过 12 题 · +13.5 pp',
    note: 'p = 0.0118，精确 McNemar 检验 · 每个通过任务的成本持平',
  },
  difficulty: {
    h3: '简单题一道不丢',
    more: '逐任务 CSV',
    rows: [
      { label: '简单', sub: '7 到 9 家解出 · 48 题' },
      { label: '有争议', sub: '4 到 6 家解出 · 25 题' },
      { label: '困难', sub: '3 家及以下解出 · 16 题' },
    ],
    caption: 'Maka 的通过率，九方对比那次运行',
  },
  get: {
    h3: '获取 Maka',
    nightly: {
      title: '体验 Desktop Nightly',
      body: '每天基于 main 构建，发布在 GitHub Releases。目前支持 Apple Silicon Mac；Windows 是未签名预览。',
      note: '不是 ASF RELEASE · 可能不稳定',
    },
    source: {
      title: '从源码构建',
      body: '克隆 apache/maka，然后 npm ci 和 npm run build。',
      note: 'APACHE-2.0',
    },
    releases: {
      title: 'Apache Releases',
      body: '尚未发布。发布之后，带签名的源码包才是正式 release。',
      note: 'KEYS · SHA-512 · .asc',
    },
  },
  reads: {
    h2: '报告与文章',
    blogLog: {
      cover: '为什么日志才是事实来源，界面只是它的投影',
      kind: '博客',
      h3: 'Log Is the Runtime',
      meta: '李坤 · English / 中文',
    },
    blogTools: {
      cover: 'Agent 如何越过 function calling 触达真实世界',
      kind: '博客',
      h3: 'Beyond Function Calling：Agent 如何触达真实世界',
      meta: '李坤 · English / 中文',
    },
    nineArm: {
      cover: 'Terminal-Bench 2.1 九个 harness 中 Maka 排第二',
      kind: '报告',
      h3: 'Terminal-Bench 2.1：9 个 harness',
      meta: '评测报告与逐任务 CSV',
    },
    paired: {
      cover: '同样 89 题，比 OpenCode 多过 12 题',
      kind: '报告',
      h3: 'Maka 对比 OpenCode',
      meta: '对比报告与逐任务 CSV',
    },
  },
  footer: {
    foundation: '基金会',
    incubator: '孵化器',
    conduct: '行为准则',
    license: '许可证',
    events: '活动',
    privacy: '隐私',
    security: '安全',
    sponsorship: '赞助',
    thanks: '致谢',
    disclaimer: incubatorDisclaimer,
    trademark: en.footer.trademark,
  },
  downloads: {
    title: '下载',
    lede: '带签名的源码包才是正式 release。本页其余内容都是便利构建，并且都明确标注。',
    onThisPage: '本页目录',
    copy: '复制',
    copied: '已复制',
    status: {
      h3: '当前状态',
      release: {
        label: 'Apache release',
        value: '暂未发布。首个 release 投票通过后会列在这里。',
        note: '暂无',
      },
      nightly: {
        label: 'Desktop Nightly',
        value: '每天基于 main 构建，支持 Apple Silicon Mac，Windows 为未签名预览。',
        note: '不是 ASF RELEASE',
      },
      source: {
        label: '源码',
        value: 'GitHub 上的 apache/maka，Apache License 2.0。',
        note: 'APACHE-2.0',
      },
    },
    releases: {
      h2: 'Apache releases',
      note: '暂无 APACHE RELEASE',
      p: 'Apache Maka (Incubating) 尚未发布过 Apache release。首个 release 投票通过后会列在这里：源码包、ASF 分发目录中的 SHA-512 校验和与独立的 GPG 签名，以及签名对应的 KEYS 文件。',
      distNote: '在此之前，分发目录尚未创建：',
    },
    verify: {
      h2: '验证 release',
      p: '所有 Apache release 的验证方式都一样，参与投票的每位 reviewer 在表决前都会走一遍这几步。',
      keys: '第 1 步：导入 release manager 的公钥',
      signature: '第 2 步：校验签名',
      checksum: '第 3 步：核对校验和',
    },
    nightly: {
      h2: 'Desktop Nightly',
      note: '不是 ASF RELEASE',
      p: 'Desktop Nightly 每天基于 main 构建，面向开发者和测试者，以 GitHub prerelease 形式发布。选择最新的 Maka Desktop Nightly；安装后应用会在 Nightly 渠道自动更新。它不是 ASF release，不适合生产环境。目前仅支持 Apple Silicon Mac。',
      windows: 'Windows 是未签名预览，不属于受支持的发布层级。',
    },
    source: {
      h2: '从源码构建',
      prerequisites: ['Node.js 22.19 或更高版本', 'npm 11', 'Git', 'ripgrep，供 Grep 工具调用'],
      clone: '第 1 步：克隆仓库',
      build: '第 2 步：安装依赖并构建全部 workspace',
      after:
        'CONTRIBUTING 介绍了 workspace 的目录结构，以及如何从这份构建启动 Desktop、TUI 和 CLI。',
    },
  },
};
