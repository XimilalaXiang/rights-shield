import React from 'react';
import { ArrowRight, Shield, Car, FileText } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-[80vh] md:min-h-screen flex items-center px-6 md:px-12 py-24 md:py-40 border-b border-[#1C1C1C]/10">
      <div className="max-w-5xl mx-auto w-full">
        {/* Label */}
        <div className="mb-8 md:mb-12">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1C]/40">
            车企数字预售消费者权益守护
          </span>
        </div>

        {/* Main heading */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-6 md:mb-8 text-[#1C1C1C]">
          AI 驱动的
          <br />
          <em className="italic">购车合同守护</em>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-base md:text-xl text-[#1C1C1C]/60 max-w-xl mb-10 md:mb-12 leading-relaxed">
          一键识别购车定金陷阱、分析预售合同条款是否侵权、获取专业维权建议。
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-16 md:mb-20">
          <a
            href="#ai-chat"
            className="group inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-[#1C1C1C] text-[#F9F8F6] text-sm tracking-wide transition-colors duration-200 hover:bg-[#1C1C1C]/80"
          >
            <span>免费咨询 AI</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 border border-[#1C1C1C]/20 text-[#1C1C1C]/60 hover:text-[#1C1C1C] hover:border-[#1C1C1C] text-sm tracking-wide transition-colors duration-200"
          >
            了解更多
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 md:gap-12 max-w-lg">
          {[
            { icon: FileText, value: '500+', label: '购车合同已分析' },
            { icon: Car, value: '95%', label: '识别准确率' },
            { icon: Shield, value: '1,200+', label: '车主信赖' },
          ].map((stat, i) => (
            <div key={i} className="text-left">
              <stat.icon size={16} className="text-[#1C1C1C]/40 mb-2" />
              <div className="font-serif text-xl md:text-2xl text-[#1C1C1C]">{stat.value}</div>
              <div className="font-sans text-xs text-[#1C1C1C]/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
