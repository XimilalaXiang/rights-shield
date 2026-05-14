import { ArrowRight, Shield, FileText, Scale } from 'lucide-react'
import { ParticleTextEffect } from './ParticleTextEffect'

interface HeroProps {
  onOpenChat: () => void
}

export default function Hero({ onOpenChat }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Particle text hero */}
      <div className="flex-1 flex items-start justify-center pt-24 px-4">
        <ParticleTextEffect
          texts={['权盾', 'RIGHTS SHIELD', '消费维权', '法律助手']}
          className="w-full max-w-4xl h-[300px] md:h-[400px]"
        />
      </div>

      {/* Bottom content */}
      <div className="container mx-auto text-center relative z-10 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg md:text-xl text-neutral-400 mb-8 leading-relaxed">
            专业分析汽车购车合同中的<span className="text-white font-medium">霸王条款</span>与
            <span className="text-white font-medium">侵权陷阱</span>，守护您的消费权益
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={onOpenChat}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-all duration-300"
            >
              免费咨询
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-neutral-700 text-white font-medium rounded-lg hover:bg-neutral-900 transition-all duration-300"
            >
              了解更多
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { icon: Shield, label: '保护案例', value: '1,200+' },
              { icon: FileText, label: '合同分析', value: '3,500+' },
              { icon: Scale, label: '维权成功率', value: '94.7%' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-5 h-5 mx-auto mb-2 text-neutral-500" />
                <p className="text-xl md:text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-neutral-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
