import React from 'react';
import { ArrowRight, Shield, Car, FileText } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-[70vh] md:min-h-screen flex items-center px-4 md:px-8 py-16 md:py-24 bg-[#48dbfb] border-b-4 border-black relative overflow-hidden">
      {/* Memphis 装饰元素 */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-[#ff6b6b] border-4 border-black animate-memphis-float" />
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-[#feca57] border-4 border-black rounded-full animate-memphis-bounce" />
      <div className="absolute top-1/3 right-1/4 w-0 h-0 border-l-[20px] border-l-transparent border-b-[35px] border-b-[#ff9ff3] border-r-[20px] border-r-transparent animate-memphis-spin" style={{ animationDuration: '12s' }} />
      <div className="absolute bottom-10 left-10 w-24 h-3 bg-[#1dd1a1] border-2 border-black" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Label */}
        <div className="inline-block px-4 py-2 bg-[#feca57] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 md:mb-8">
          <span className="font-black text-sm tracking-wider">
            车企数字预售消费者权益守护
          </span>
        </div>

        {/* Main heading */}
        <h1 className="font-black text-5xl md:text-7xl lg:text-9xl leading-tight tracking-tight mb-6 md:mb-8">
          AI 驱动的
          <br />
          <span className="text-white" style={{ textShadow: '4px 4px 0px #000' }}>
            购车合同守护
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-base md:text-xl max-w-xl mb-8 md:mb-10">
          一键识别购车定金陷阱、分析预售合同条款是否侵权、获取专业维权建议。
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-12 md:mb-16">
          <a
            href="#ai-chat"
            className="group inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-[#ff6b6b] text-white font-black text-sm md:text-base border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200"
          >
            <span>免费咨询 AI</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white font-black text-sm md:text-base border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200"
          >
            了解更多
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-lg">
          {[
            { icon: FileText, value: '500+', label: '购车合同已分析', bg: '#ff9ff3' },
            { icon: Car, value: '95%', label: '识别准确率', bg: '#feca57' },
            { icon: Shield, value: '1,200+', label: '车主信赖', bg: '#1dd1a1' },
          ].map((stat, i) => (
            <div key={i} className="p-3 md:p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-8 h-8 mb-2 flex items-center justify-center border-2 border-black" style={{ background: stat.bg }}>
                <stat.icon size={14} />
              </div>
              <div className="font-black text-lg md:text-xl">{stat.value}</div>
              <div className="font-sans text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
