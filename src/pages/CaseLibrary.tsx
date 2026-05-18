import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, AlertCircle, BookOpen, ArrowLeft } from 'lucide-react'
import { carCases, CASE_COUNT } from '../data/cases'

export default function CaseLibrary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('全部')
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const caseTypes = ['全部', ...Array.from(new Set(carCases.map(c => c.category)))]

  const filteredCases = carCases
    .filter(c => {
      const matchesSearch =
        c.title.includes(searchTerm) ||
        c.summary.includes(searchTerm) ||
        c.warning_signs.some(s => s.includes(searchTerm))
      const matchesType = filterType === '全部' || c.category === filterType
      return matchesSearch && matchesType
    })
    .sort((a, b) => b.date.localeCompare(a.date))

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <div className="bg-black min-h-screen w-full pt-20">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02),transparent_60%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white text-sm mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-xs font-medium text-red-400/80 tracking-wide">真实案例</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-4">
            汽车维权 <span className="italic font-light text-neutral-300">案例库</span>
          </h1>

          <p className="text-sm text-neutral-500 mt-4 max-w-lg mx-auto">
            了解真实的汽车消费侵权案例，提高警惕，保护您的合法权益
          </p>
        </div>

        {/* Search & Filter */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-neutral-500 group-focus-within:text-white transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10 transition-all"
                placeholder="搜索案例关键词..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter */}
            <div className="relative min-w-[200px]" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setOpen(v => !v)}
                className="w-full flex items-center gap-2 px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-sm text-white hover:border-white/20 transition-all"
              >
                <Filter className="h-4 w-4 text-neutral-500" />
                <span className="truncate flex-1 text-left">{filterType}</span>
                <span className={`text-neutral-500 transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
              </button>

              {open && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-neutral-900 border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl">
                  {caseTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => { setFilterType(type); setOpen(false) }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        filterType === type ? 'bg-white/10 text-white' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-5 pt-5 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-neutral-600" />
              <span className="text-xs text-neutral-500">
                共收录 <span className="text-white">{CASE_COUNT}</span> 个案例
              </span>
            </div>
            <span className="text-xs text-neutral-500">
              当前显示 <span className="text-white">{filteredCases.length}</span> 个
            </span>
          </div>
        </div>

        {/* Case Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredCases.map(c => (
            <div
              key={c.id}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-base font-semibold text-white group-hover:text-neutral-100 leading-tight">
                  {c.title}
                </h3>
                <span className="flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-neutral-400">
                  {c.category}
                </span>
              </div>

              {/* Date */}
              <p className="text-[11px] text-neutral-600 mb-3 font-mono">{c.date}</p>

              {/* Summary */}
              <p className="text-sm text-neutral-400 leading-relaxed mb-5">
                {c.summary}
              </p>

              {/* Warning signs */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-3.5 w-3.5 text-red-500/80" />
                  <span className="text-[11px] text-neutral-500 tracking-wider uppercase">预警信号</span>
                </div>
                <ul className="space-y-1.5">
                  {c.warning_signs.map((sign, i) => (
                    <li key={i} className="flex items-start text-xs text-neutral-500">
                      <span className="inline-block w-1 h-1 bg-red-500/60 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Empty */}
        {filteredCases.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-10 h-10 text-neutral-700 mx-auto mb-4" />
            <p className="text-sm text-neutral-500">未找到匹配的案例，请尝试其他搜索条件</p>
          </div>
        )}
      </div>
    </div>
  )
}
