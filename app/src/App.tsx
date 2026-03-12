import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

type TaskCardProps = {
  title: string
  desc: string
  path: string
}

function TaskCard({ title, desc, path }: TaskCardProps) {
  return (
    <NavLink className="task-card" to={path}>
      <h3>{title}</h3>
      <p>{desc}</p>
      <span>进入任务 →</span>
    </NavLink>
  )
}

function HomePage() {
  return (
    <div className="page-shell">
      <section className="hero-block card">
        <div>
          <span className="badge">MVP Skeleton</span>
          <h1>自我与环境真实感行为测量平台</h1>
          <p className="subtitle">
            Self and Environmental Reality Assessment Platform
          </p>
          <p className="lead">
            面向 DPDR、自我意识、自我—环境耦合与多模态研究的行为任务平台第一版代码骨架。
            当前版本优先完成基础页面、任务入口、数据结构预留与后续 EEG/fMRI 接口铺垫。
          </p>
        </div>
        <div className="hero-meta">
          <div className="meta-card">
            <div className="meta-label">核心主轴</div>
            <div className="meta-value">Selfhood × Reality × insula–mPFC</div>
          </div>
          <div className="meta-card">
            <div className="meta-label">当前阶段</div>
            <div className="meta-value">代码骨架 / MVP</div>
          </div>
        </div>
      </section>

      <section className="card section-block">
        <h2>平台流程</h2>
        <div className="flow-grid">
          <div className="flow-item">1. 被试信息</div>
          <div className="flow-item">2. 主观量表</div>
          <div className="flow-item">3. 核心任务</div>
          <div className="flow-item">4. 结果汇总</div>
          <div className="flow-item">5. 数据导出</div>
        </div>
      </section>

      <section className="section-block">
        <h2>核心任务入口</h2>
        <div className="task-grid">
          <TaskCard title="自我真实感判断任务" desc="测量自我真实感、自我异化与判断波动性。" path="/task/self-reality" />
          <TaskCard title="环境真实感判断任务" desc="测量环境真实感、疏离感和在场感。" path="/task/environment-reality" />
          <TaskCard title="自我—环境匹配任务" desc="测量自我状态与环境状态的协调性和失配敏感度。" path="/task/self-environment-match" />
        </div>
      </section>
    </div>
  )
}

function PlaceholderPage({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="page-shell">
      <section className="card placeholder-card">
        <h1>{title}</h1>
        <p>{desc}</p>
        <p className="muted">
          当前页面为骨架占位。后续将接入正式表单、任务引擎、trial 数据记录与结果导出逻辑。
        </p>
      </section>
    </div>
  )
}

function App() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">S</div>
          <div>
            <div className="brand-title">Self & Reality Platform</div>
            <div className="brand-sub">DPDR research software</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/">首页</NavLink>
          <NavLink to="/subject">被试信息</NavLink>
          <NavLink to="/scales">量表</NavLink>
          <NavLink to="/task/self-reality">任务 1</NavLink>
          <NavLink to="/task/environment-reality">任务 2</NavLink>
          <NavLink to="/task/self-environment-match">任务 3</NavLink>
          <NavLink to="/results">结果</NavLink>
          <NavLink to="/export">导出</NavLink>
          <NavLink to="/researcher">研究者后台</NavLink>
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subject" element={<PlaceholderPage title="被试信息页" desc="录入被试编号、年龄、性别、教育、诊断、病程、药物状态、疲劳/焦虑等基础协变量。" />} />
          <Route path="/scales" element={<PlaceholderPage title="量表页" desc="录入 CDS / VAS 等主观评分，形成自我真实感、环境真实感、身体归属感与主观在场感的基线。" />} />
          <Route path="/task/self-reality" element={<PlaceholderPage title="任务 1：自我真实感判断任务" desc="后续接入自我相关语句、自我异化语句、评分输入、反应时记录与 trial 导出。" />} />
          <Route path="/task/environment-reality" element={<PlaceholderPage title="任务 2：环境真实感判断任务" desc="后续接入环境图片/语句刺激、真实感评分、环境疏离评分和反应时记录。" />} />
          <Route path="/task/self-environment-match" element={<PlaceholderPage title="任务 3：自我—环境匹配任务" desc="后续接入自我状态描述与环境状态描述的配对呈现、匹配评分和冲突条件分析。" />} />
          <Route path="/results" element={<PlaceholderPage title="结果页" desc="后续在此展示五大域分数、反应时、波动性、质量控制与可视化结果。" />} />
          <Route path="/export" element={<PlaceholderPage title="导出页" desc="后续导出 CSV、JSON，以及预留 EEG/fMRI event 文件。" />} />
          <Route path="/researcher" element={<PlaceholderPage title="研究者后台" desc="后续接入被试列表、任务条件配置、批量导出和基础数据质控模块。" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
