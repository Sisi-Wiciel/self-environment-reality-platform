# 技术路线图
## 自我与环境真实感行为测量平台

更新时间：2026-03-12
项目：Self and Environmental Reality Assessment Platform

---

## 1. 总体技术策略

本项目优先构建一个：
- 轻量
- 稳定
- 本地可运行
- 适合实验室使用
- 后续可接 EEG / fMRI

的 MVP 平台。

整体策略为：

> 前端先跑通任务平台 → 本地结构化存储数据 → 支持导出 → 预留 EEG/fMRI 接口 → 再扩展研究者后台和多模态模块。

---

## 2. 推荐技术栈

### 2.1 前端框架
**推荐：React + Vite + TypeScript**

原因：
- 起步快
- 组件化清晰
- 适合任务页开发
- 后续扩展后台方便
- TypeScript 有利于数据结构约束

### 2.2 样式方案
**推荐：Tailwind CSS + 少量自定义样式**

原因：
- 开发效率高
- 页面风格统一
- 适合快速搭建实验平台与研究者后台

### 2.3 数据存储方案
**MVP 推荐：前端本地状态 + JSON/CSV 导出**

原因：
- 不依赖服务器
- 部署简单
- 本地实验环境友好
- 数据可控，便于后续与 EEG/fMRI 联动

### 2.4 图表方案
**推荐：Recharts**

用于：
- 条形图
- 雷达图
- 结果总览图

### 2.5 导出方案
- CSV：`papaparse`
- JSON：原生 `Blob`
- PDF（后续）：`jspdf` 或 HTML 转 PDF

---

## 3. 系统架构建议

### 3.1 MVP 架构分层

#### 1）UI 层
负责：
- 表单
- 任务页面
- 结果页
- 按钮交互

#### 2）任务引擎层
负责：
- trial 流程控制
- 刺激呈现
- 计时
- 响应记录
- 任务切换

#### 3）数据模型层
负责：
- subject 数据
- scale 数据
- task trial 数据
- summary 数据

#### 4）计算层
负责：
- 指标计算
- 反应时汇总
- 波动性计算
- 结果结构化

#### 5）导出层
负责：
- JSON 导出
- CSV 导出
- event 文件导出（预留）

---

## 4. 推荐目录结构

```bash
self-environment-reality-platform/
├── docs/
│   ├── self-environment-reality-platform-prd.md
│   ├── development-task-breakdown.md
│   └── technical-roadmap.md
├── public/
│   └── stimuli/
│       ├── images/
│       └── text/
├── src/
│   ├── app/
│   │   ├── routes/
│   │   └── layout/
│   ├── components/
│   │   ├── common/
│   │   ├── forms/
│   │   ├── tasks/
│   │   └── charts/
│   ├── modules/
│   │   ├── subject/
│   │   ├── scales/
│   │   ├── tasks/
│   │   ├── results/
│   │   └── export/
│   ├── data/
│   │   ├── task-self-reality.json
│   │   ├── task-environment-reality.json
│   │   └── task-self-environment-match.json
│   ├── lib/
│   │   ├── timer.ts
│   │   ├── scoring.ts
│   │   ├── exportCsv.ts
│   │   ├── exportJson.ts
│   │   └── eventMarkers.ts
│   ├── types/
│   │   ├── subject.ts
│   │   ├── scales.ts
│   │   ├── task.ts
│   │   └── result.ts
│   ├── hooks/
│   └── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 5. 页面路由设计

建议路由如下：
- `/` 首页
- `/subject` 基本信息页
- `/scales` 量表页
- `/task/self-reality`
- `/task/environment-reality`
- `/task/self-environment-match`
- `/results`
- `/export`
- `/researcher`（后续）

原则：每个任务页面只负责一个任务。

---

## 6. 数据模型建议

### 6.1 Subject
```ts
type Subject = {
  subjectId: string;
  age: number;
  sex: string;
  education: string;
  diagnosis: string;
  illnessDuration?: string;
  medicationStatus?: string;
  fatigueLevel?: number;
  anxietyLevel?: number;
  sleepQuality?: number;
  createdAt: string;
};
```

### 6.2 ScaleEntry
```ts
type ScaleEntry = {
  subjectId: string;
  cdsTotal?: number;
  selfRealityVAS: number;
  environmentRealityVAS: number;
  bodyOwnershipVAS: number;
  presenceVAS: number;
  emotionalNumbingVAS: number;
};
```

### 6.3 TrialRecord
```ts
type TrialRecord = {
  subjectId: string;
  taskName: string;
  trialId: string;
  condition: string;
  stimulusId: string;
  stimulusType: 'text' | 'image';
  response: string | number;
  rating?: number;
  confidence?: number;
  rt: number;
  timestamp: string;
};
```

### 6.4 TaskSummary
```ts
type TaskSummary = {
  subjectId: string;
  selfRealityScore?: number;
  environmentRealityScore?: number;
  selfEnvironmentMatchScore?: number;
  meanRt?: number;
  variabilityIndex?: number;
  confidenceIndex?: number;
};
```

---

## 7. 任务引擎设计

建议统一采用 `TaskRunner` 模式。

### 输入
- 刺激列表
- trial 数
- 呈现参数
- 响应类型

### 过程
- fixation
- stimulus
- response window
- inter-trial interval
- 数据记录

### 输出
- trial 级记录
- 任务 summary

推荐组件：
- `TaskScreen`
- `FixationScreen`
- `StimulusCard`
- `RatingScale`
- `ConfidenceScale`
- `TaskProgressBar`

---

## 8. 三大任务技术实现建议

### 8.1 自我真实感判断任务
数据文件：`task-self-reality.json`

刺激示例：
```json
{
  "id": "sr_001",
  "condition": "self_real",
  "text_zh": "我感觉自己是真实存在的",
  "text_en": "I feel that I truly exist"
}
```

### 8.2 环境真实感判断任务
数据文件：`task-environment-reality.json`

刺激示例：
```json
{
  "id": "er_001",
  "condition": "environment_real",
  "image": "/stimuli/images/room_01.jpg",
  "prompt_zh": "这个环境让你感觉真实吗？",
  "prompt_en": "Does this environment feel real to you?"
}
```

### 8.3 自我—环境匹配任务
数据文件：`task-self-environment-match.json`

刺激示例：
```json
{
  "id": "sem_001",
  "self_text_zh": "我感觉自己像旁观者",
  "env_text_zh": "周围世界像隔着一层膜",
  "self_text_en": "I feel like an observer of myself",
  "env_text_en": "The world feels as if separated by a veil",
  "condition": "matched_derealized"
}
```

---

## 9. 结果计算设计

建议写成纯函数模块：
- `calculateSelfRealityScore()`
- `calculateEnvironmentRealityScore()`
- `calculateMatchScore()`
- `calculateMeanRt()`
- `calculateVariability()`

优点：
- 可测试
- 可复用
- 便于写方法学论文
- 便于后续软著与专利说明

---

## 10. 导出设计

### MVP 导出内容
- `subject.csv`
- `scales.csv`
- `task_trials.csv`
- `task_summary.csv`
- `raw_session.json`

### 文件命名建议
```bash
subject-001_2026-03-12_trials.csv
subject-001_2026-03-12_summary.csv
subject-001_2026-03-12_session.json
```

---

## 11. EEG / fMRI 接口预留

### EEG
建议预留：
```ts
type EventMarker = {
  trialId: string;
  taskName: string;
  eventCode: number;
  eventTime: number;
};
```

MVP 先支持 marker JSON / CSV 输出。

### fMRI
在 trial 结构中预留：
- onset
- duration
- condition label

便于后续直接导出 event 文件。

---

## 12. 版本路线建议

### V0.1
- 技术框架跑起来
- 路由搭好
- 假数据可演示

### V0.2
- 3 个任务可真正跑通
- 数据可导出

### V0.3
- 结果页可展示
- 基础图表可看

### V0.4
- 研究者后台基础版
- 数据批量查看

### V0.5
- EEG/fMRI 接口预留
- 文档完善

---

## 13. 开发顺序建议

最合理顺序：
1. 先搭框架
2. 再做被试信息页和量表页
3. 再做任务 1
4. 再做任务 2
5. 再做任务 3
6. 再做结果页
7. 再做导出
8. 最后做研究者后台

---

## 14. 最小上线目标

MVP 上线标准：
- 首页可进入
- 被试信息可录入
- 三个任务可跑
- 结果可看
- 数据能导出 CSV

达到这 5 条，就已经是一个真正可用的研究软件原型。

---

## 15. 软著/专利对应关系

### 最适合软著的部分
- 前端任务平台
- 结果计算模块
- 导出模块
- 研究者后台

### 最适合专利的部分
- 任务设计逻辑
- 评分方法
- 指标组合方法
- 行为—脑信号联合评估流程

---

## 16. 一句话总结

> 用 React + Vite + TypeScript 先搭一个本地可运行、可导出、可扩展的行为任务平台，先完成纯行为 MVP，再逐步接 EEG / fMRI 与临床转化模块。
