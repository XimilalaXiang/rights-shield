import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'

export default function CaseCTA() {
  return (
    <section id="cases" className="py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-xs font-medium text-red-400/80">60+ 真实案例</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          汽车维权<span className="italic font-light text-neutral-300"> 案例库</span>
        </h2>

        <p className="text-neutral-500 text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed">
          收录 2018-2025 年间真实汽车消费维权案例，涵盖金融欺诈、合同陷阱、质量缺陷等 9 大类别
        </p>

        <Link
          to="/cases"
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
        >
          <BookOpen className="w-5 h-5 text-neutral-400" />
          <span className="text-white font-medium">浏览案例库</span>
          <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
}
