import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import { selfRealityStimuli } from './data/taskSelfReality'
import type { SelfRealityTrialRecord } from './types/task'

type SubjectForm = {
  subjectId: string
  age: string
  sex: string
  education: string
  diagnosis: string
  illnessDuration: string
  medicationStatus: string
  fatigueLevel: string
  anxietyLevel: string
  sleepQuality: string
  notes: string
}

type ScaleForm = {
  cdsTotal: string
  selfRealityVAS: string
  environmentRealityVAS: string
  bodyOwnershipVAS: string
  presenceVAS: string
  emotionalNumbingVAS: string
}

type TaskCardProps = {
  title: string
  desc: string
  path: string
}

const SUBJECT_STORAGE_KEY = 'serap_subject_v1'
const SCALE_STORAGE_KEY = 'serap_scales_v1'
const SELF_REALITY_TRIALS_KEY = 'serap_self_reality_trials_v1'

const defaultSubjectForm: SubjectForm = {
  subjectId: '',
  age: '',
  sex: '',
  education: '',
  diagnosis: '',
  illnessDuration: '',
  medicationStatus: '',
  fatigueLevel: '',
  anxietyLevel: '',
  sleepQuality: '',
  notes: '',
}

const defaultScaleForm: ScaleForm = {
  cdsTotal: '',
  selfRealityVAS: '',
  environmentRealityVAS: '',
  bodyOwnershipVAS: '',
  presenceVAS: '',
  emotionalNumbingVAS: '',
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

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="section-title">
      <h1>{title}</h1>
      {subtitle ? <p className="muted">{subtitle}</p> : null}
    </div>
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
            当前版本已接入被试信息页与量表页的本地保存能力，后续将继续扩展任务引擎、结果计算与导出模块。
          </p>
        </div>
        <div className="hero-meta">
          <div className="meta-card">
            <div className="meta-label">核心主轴</div>
            <div className="meta-value">Selfhood × Reality × insula–mPFC</div>
          </div>
          <div className="meta-card">
            <div className="meta-label">当前阶段</div>
            <div className="meta-value">被试信息 + 量表页可用</div>
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
        <SectionTitle title={title} subtitle={desc} />
        <p className="muted">
          当前页面为骨架占位。后续将接入正式表单、任务引擎、trial 数据记录与结果导出逻辑。
        </p>
      </section>
    </div>
  )
}

function SubjectPage({ form, setForm }: { form: SubjectForm; setForm: React.Dispatch<React.SetStateAction<SubjectForm>> }) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="page-shell">
      <section className="card form-card">
        <SectionTitle title="被试信息页" subtitle="录入被试基本信息与关键协变量；当前输入会自动保存在本地浏览器中。" />
        <div className="form-grid">
          <label>
            被试编号
            <input name="subjectId" value={form.subjectId} onChange={handleChange} placeholder="如：DPDR-001" />
          </label>
          <label>
            年龄
            <input name="age" value={form.age} onChange={handleChange} placeholder="如：28" />
          </label>
          <label>
            性别
            <select name="sex" value={form.sex} onChange={handleChange}>
              <option value="">请选择</option>
              <option value="female">女</option>
              <option value="male">男</option>
              <option value="other">其他</option>
            </select>
          </label>
          <label>
            教育程度
            <input name="education" value={form.education} onChange={handleChange} placeholder="如：本科 / 研究生" />
          </label>
          <label>
            诊断状态
            <input name="diagnosis" value={form.diagnosis} onChange={handleChange} placeholder="如：DPDR / HC" />
          </label>
          <label>
            病程
            <input name="illnessDuration" value={form.illnessDuration} onChange={handleChange} placeholder="如：2 年" />
          </label>
          <label>
            药物状态
            <input name="medicationStatus" value={form.medicationStatus} onChange={handleChange} placeholder="如：未服药 / 稳定服药" />
          </label>
          <label>
            当前疲劳程度（0-10）
            <input name="fatigueLevel" value={form.fatigueLevel} onChange={handleChange} placeholder="0-10" />
          </label>
          <label>
            当前焦虑程度（0-10）
            <input name="anxietyLevel" value={form.anxietyLevel} onChange={handleChange} placeholder="0-10" />
          </label>
          <label>
            睡眠情况（0-10）
            <input name="sleepQuality" value={form.sleepQuality} onChange={handleChange} placeholder="0-10" />
          </label>
        </div>
        <label className="full-width">
          备注
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={4} placeholder="记录特殊情况、实验注意事项或研究者备注" />
        </label>
      </section>
    </div>
  )
}

function ScalesPage({ form, setForm }: { form: ScaleForm; setForm: React.Dispatch<React.SetStateAction<ScaleForm>> }) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const scaleItems = [
    { key: 'cdsTotal', label: 'CDS 总分（可选）', hint: '用于后续与行为指标做相关分析' },
    { key: 'selfRealityVAS', label: '自我不真实感 VAS（0-100）', hint: '0 = 完全没有，100 = 极其严重' },
    { key: 'environmentRealityVAS', label: '环境不真实感 VAS（0-100）', hint: '用于刻画 derealization 核心维度' },
    { key: 'bodyOwnershipVAS', label: '身体疏离感 VAS（0-100）', hint: '用于刻画身体归属感与在场感' },
    { key: 'presenceVAS', label: '主观在场感 VAS（0-100）', hint: '可反映“我在不在这里”的体验强度' },
    { key: 'emotionalNumbingVAS', label: '情感麻木感 VAS（0-100）', hint: '可与身体/环境真实感共同解释' },
  ] as const

  return (
    <div className="page-shell">
      <section className="card form-card">
        <SectionTitle title="量表页" subtitle="录入主观评分基线，当前输入会自动保存在本地浏览器中。" />
        <div className="scale-list">
          {scaleItems.map((item) => (
            <label key={item.key} className="scale-item">
              <span className="scale-label">{item.label}</span>
              <span className="scale-hint">{item.hint}</span>
              <input
                name={item.key}
                value={form[item.key]}
                onChange={handleChange}
                placeholder="请输入数值"
              />
            </label>
          ))}
        </div>
      </section>
    </div>
  )
}

function SelfRealityTaskPage({
  subjectId,
  trials,
  setTrials,
}: {
  subjectId: string
  trials: SelfRealityTrialRecord[]
  setTrials: React.Dispatch<React.SetStateAction<SelfRealityTrialRecord[]>>
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startedAt, setStartedAt] = useState<number>(Date.now())
  const [finished, setFinished] = useState(false)

  const currentStimulus = selfRealityStimuli[currentIndex]
  const progress = `${Math.min(currentIndex + (finished ? 1 : 0), selfRealityStimuli.length)} / ${selfRealityStimuli.length}`

  const handleRate = (rating: number) => {
    if (!currentStimulus) return

    const rt = Date.now() - startedAt
    const record: SelfRealityTrialRecord = {
      subjectId: subjectId || 'UNASSIGNED',
      taskName: 'self-reality',
      trialId: `trial_${currentIndex + 1}`,
      condition: currentStimulus.condition,
      stimulusId: currentStimulus.id,
      stimulusTextZh: currentStimulus.textZh,
      stimulusTextEn: currentStimulus.textEn,
      rating,
      rt,
      answeredAt: new Date().toISOString(),
    }

    setTrials((prev) => {
      const next = [...prev.filter((item) => item.trialId !== record.trialId), record]
      return next.sort((a, b) => a.trialId.localeCompare(b.trialId))
    })

    if (currentIndex < selfRealityStimuli.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setStartedAt(Date.now())
    } else {
      setFinished(true)
    }
  }

  const handleRestart = () => {
    setTrials([])
    setCurrentIndex(0)
    setStartedAt(Date.now())
    setFinished(false)
  }

  return (
    <div className="page-shell">
      <section className="card form-card">
        <SectionTitle
          title="任务 1：自我真实感判断任务"
          subtitle="请根据当前陈述与你真实体验的符合程度进行 1–7 分评分。1 = 完全不符合，7 = 非常符合。"
        />

        <div className="task-status-row">
          <div className="task-status-card">
            <span className="meta-label">当前被试</span>
            <strong>{subjectId || '尚未填写被试编号'}</strong>
          </div>
          <div className="task-status-card">
            <span className="meta-label">任务进度</span>
            <strong>{progress}</strong>
          </div>
          <div className="task-status-card">
            <span className="meta-label">已记录试次</span>
            <strong>{trials.length}</strong>
          </div>
        </div>

        {!finished && currentStimulus ? (
          <div className="task-panel">
            <div className="stimulus-card">
              <div className="stimulus-label">当前陈述</div>
              <h2>{currentStimulus.textZh}</h2>
              <p className="muted">{currentStimulus.textEn}</p>
            </div>
            <div className="rating-grid">
              {[1, 2, 3, 4, 5, 6, 7].map((score) => (
                <button key={score} className="rating-button" onClick={() => handleRate(score)}>
                  {score}
                </button>
              ))}
            </div>
            <div className="muted">1 = 完全不符合　·　7 = 非常符合</div>
          </div>
        ) : (
          <div className="task-panel">
            <div className="stimulus-card success-card">
              <div className="stimulus-label">任务完成</div>
              <h2>自我真实感判断任务已完成</h2>
              <p className="muted">当前试次结果已保存到本地浏览器。下一步可以进入结果页查看完成度，后续再接统一导出模块。</p>
            </div>
            <button className="primary-action" onClick={handleRestart}>重新开始任务</button>
          </div>
        )}
      </section>
    </div>
  )
}

function ResultsPage({ subjectForm, scaleForm, selfRealityTrials }: { subjectForm: SubjectForm; scaleForm: ScaleForm; selfRealityTrials: SelfRealityTrialRecord[] }) {
  const completion = useMemo(() => {
    const subjectFilled = Object.values(subjectForm).filter(Boolean).length
    const scaleFilled = Object.values(scaleForm).filter(Boolean).length
    return {
      subjectFilled,
      scaleFilled,
      subjectTotal: Object.keys(subjectForm).length,
      scaleTotal: Object.keys(scaleForm).length,
    }
  }, [subjectForm, scaleForm])

  return (
    <div className="page-shell">
      <section className="card placeholder-card">
        <SectionTitle title="结果页（当前预览版）" subtitle="当前版本先展示数据录入状态，后续将扩展为五大域分数、图表和质量控制结果。" />
        <div className="preview-grid">
          <div className="preview-card">
            <h3>被试信息完成度</h3>
            <p>{completion.subjectFilled} / {completion.subjectTotal}</p>
            <p className="muted">当前被试编号：{subjectForm.subjectId || '未填写'}</p>
          </div>
          <div className="preview-card">
            <h3>量表录入完成度</h3>
            <p>{completion.scaleFilled} / {completion.scaleTotal}</p>
            <p className="muted">自我不真实感 VAS：{scaleForm.selfRealityVAS || '未填写'}</p>
          </div>
          <div className="preview-card">
            <h3>任务 1 完成情况</h3>
            <p>{selfRealityTrials.length} / {selfRealityStimuli.length}</p>
            <p className="muted">已记录自我真实感判断任务试次</p>
          </div>
        </div>
      </section>
    </div>
  )
}

function App() {
  const [subjectForm, setSubjectForm] = useState<SubjectForm>(() => {
    const raw = localStorage.getItem(SUBJECT_STORAGE_KEY)
    return raw ? { ...defaultSubjectForm, ...JSON.parse(raw) } : defaultSubjectForm
  })
  const [scaleForm, setScaleForm] = useState<ScaleForm>(() => {
    const raw = localStorage.getItem(SCALE_STORAGE_KEY)
    return raw ? { ...defaultScaleForm, ...JSON.parse(raw) } : defaultScaleForm
  })
  const [selfRealityTrials, setSelfRealityTrials] = useState<SelfRealityTrialRecord[]>(() => {
    const raw = localStorage.getItem(SELF_REALITY_TRIALS_KEY)
    return raw ? JSON.parse(raw) : []
  })

  useEffect(() => {
    localStorage.setItem(SUBJECT_STORAGE_KEY, JSON.stringify(subjectForm))
  }, [subjectForm])

  useEffect(() => {
    localStorage.setItem(SCALE_STORAGE_KEY, JSON.stringify(scaleForm))
  }, [scaleForm])

  useEffect(() => {
    localStorage.setItem(SELF_REALITY_TRIALS_KEY, JSON.stringify(selfRealityTrials))
  }, [selfRealityTrials])

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
          <Route path="/subject" element={<SubjectPage form={subjectForm} setForm={setSubjectForm} />} />
          <Route path="/scales" element={<ScalesPage form={scaleForm} setForm={setScaleForm} />} />
          <Route path="/task/self-reality" element={<SelfRealityTaskPage subjectId={subjectForm.subjectId} trials={selfRealityTrials} setTrials={setSelfRealityTrials} />} />
          <Route path="/task/environment-reality" element={<PlaceholderPage title="任务 2：环境真实感判断任务" desc="后续接入环境图片/语句刺激、真实感评分、环境疏离评分和反应时记录。" />} />
          <Route path="/task/self-environment-match" element={<PlaceholderPage title="任务 3：自我—环境匹配任务" desc="后续接入自我状态描述与环境状态描述的配对呈现、匹配评分和冲突条件分析。" />} />
          <Route path="/results" element={<ResultsPage subjectForm={subjectForm} scaleForm={scaleForm} selfRealityTrials={selfRealityTrials} />} />
          <Route path="/export" element={<PlaceholderPage title="导出页" desc="后续导出 CSV、JSON，以及预留 EEG/fMRI event 文件。" />} />
          <Route path="/researcher" element={<PlaceholderPage title="研究者后台" desc="后续接入被试列表、任务条件配置、批量导出和基础数据质控模块。" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
