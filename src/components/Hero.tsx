import { ArrowRight, Shield, FileText, Scale, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ParticleTextEffect } from './ParticleTextEffect'

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[124vh] flex flex-col overflow-hidden">
      {/* Particle background - full screen */}
      <div className="absolute inset-0 z-0">
        <ParticleTextEffect
          words={['权盾', 'RIGHTS SHIELD', '消费维权', '法律助手']}
        />
      </div>

      {/* Hero content - pushed down to avoid overlap with particle text */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-end px-4 pb-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-neutral-400 tracking-wide">AI 汽车维权平台</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            守护你的
            <br />
            <span className="font-light italic text-neutral-300">购车权益</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-neutral-500 max-w-xl mx-auto mb-10 leading-relaxed">
            专业分析汽车购车合同中的<span className="text-white/80">霸王条款</span>与
            <span className="text-white/80">侵权陷阱</span>，AI 为您的消费权益保驾护航
          </p>

          {/* CTA buttons - SafeCareer style */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/chat"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] transition-all duration-300"
            >
              [ AI 咨询 ]
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#cases"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-neutral-700 text-white/80 font-medium rounded-lg hover:bg-white/5 hover:border-neutral-500 transition-all duration-300"
            >
              [ 查看案例 ]
            </a>
          </div>
        </div>
      </div>

      {/* Bottom stats + scroll indicator */}
      <div className="relative z-10 pb-12 pt-6 px-4">
        <div className="max-w-lg mx-auto grid grid-cols-3 gap-6 mb-8">
          {[
            { icon: Shield, label: '保护案例', value: '1,200+' },
            { icon: FileText, label: '合同分析', value: '3,500+' },
            { icon: Scale, label: '维权成功率', value: '94.7%' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-4 h-4 mx-auto mb-1.5 text-neutral-600" />
              <p className="text-lg md:text-xl font-bold text-white">{stat.value}</p>
              <p className="text-[10px] text-neutral-600 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center">
          <a href="#features" className="animate-bounce">
            <ChevronDown className="w-5 h-5 text-neutral-600" />
          </a>
        </div>
      </div>
    </section>
  )
}
