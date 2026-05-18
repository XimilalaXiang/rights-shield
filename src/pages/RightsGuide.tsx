import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check, ShieldCheck, AlertCircle, Phone } from 'lucide-react'
import {
  warningCategories,
  protectionStrategies,
  emergencySteps,
  emergencyContacts,
} from '../data/guideContent'

const STORAGE_KEY = 'rights-shield-guide-progress'

function loadProgress(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveProgress(data: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export default function RightsGuide() {
  const [reviewed, setReviewed] = useState<Record<string, boolean>>(loadProgress)

  useEffect(() => {
    saveProgress(reviewed)
  }, [reviewed])

  const toggle = (key: string) => {
    setReviewed(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const totalWarnings = warningCategories.reduce((sum, cat) => sum + cat.warnings.length, 0)
  const reviewedCount = Object.values(reviewed).filter(Boolean).length
  const progress = Math.round((reviewedCount / totalWarnings) * 100)

  return (
    <div className="bg-black min-h-screen w-full pt-20">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02),transparent_60%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white text-sm mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-green-400/80 tracking-wide">维权攻略</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-4">
            汽车消费 <span className="italic font-light text-neutral-300">维权指南</span>
          </h1>

          <p className="text-sm text-neutral-500 mt-4 max-w-lg mx-auto">
            掌握这些维权技巧，让你的购车之路更加安全顺畅
          </p>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{totalWarnings}</div>
              <div className="text-xs text-neutral-500 mt-1">预警信号</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{protectionStrategies.length}</div>
              <div className="text-xs text-neutral-500 mt-1">防护策略</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{warningCategories.length}</div>
              <div className="text-xs text-neutral-500 mt-1">风险类别</div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 mb-16">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">学习进度</h3>
                <p className="text-[11px] text-neutral-500">数据保存在浏览器本地</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{progress}%</div>
              <div className="text-[11px] text-neutral-500">{reviewedCount}/{totalWarnings}</div>
            </div>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Warning Categories */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              购车<span className="italic font-light text-neutral-300"> 预警信号</span>
            </h2>
            <p className="text-sm text-neutral-500 mt-3">点击每项标记为已学习</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {warningCategories.map(category => {
              const Icon = category.icon
              const catReviewed = category.warnings.filter((_, i) => reviewed[`${category.id}-${i}`]).length

              return (
                <div key={category.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}15`, border: `1px solid ${category.color}30` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: category.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{category.title}</h3>
                      <p className="text-[11px] text-neutral-500">{catReviewed}/{category.warnings.length} 已学习</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {category.warnings.map((warning, i) => {
                      const key = `${category.id}-${i}`
                      const isChecked = reviewed[key]
                      return (
                        <button
                          key={i}
                          onClick={() => toggle(key)}
                          className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-200 border ${
                            isChecked
                              ? 'bg-white/5 border-white/10'
                              : 'bg-transparent border-white/[0.04] hover:border-white/10'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                            isChecked ? 'bg-green-500' : 'border border-white/20'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 text-black" />}
                          </div>
                          <span className={`text-sm ${isChecked ? 'text-white' : 'text-neutral-400'}`}>
                            {warning}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5">
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${(catReviewed / category.warnings.length) * 100}%`, backgroundColor: category.color }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Protection Strategies */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              维权<span className="italic font-light text-neutral-300"> 防护策略</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {protectionStrategies.map((strategy, i) => (
              <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold">{strategy.title}</h3>
                </div>
                <p className="text-sm text-neutral-400 mb-4 leading-relaxed">{strategy.description}</p>
                <div className="space-y-2">
                  {strategy.tips.map((tip, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-blue-500/50 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-xs text-neutral-500">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency */}
        <section>
          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">遭遇侵权怎么办？</h3>
                <p className="text-xs text-neutral-500">紧急应对步骤</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
              {emergencySteps.map((step, i) => (
                <div key={i} className="rounded-xl bg-black/30 border border-white/5 p-4">
                  <div className="text-red-400 font-bold text-lg mb-2">{step.num}</div>
                  <p className="text-sm text-neutral-400">{step.text}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-6 justify-center">
              {emergencyContacts.map((contact, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-neutral-400">{contact.label}：</span>
                  <span className="text-sm text-white font-semibold">{contact.number}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
