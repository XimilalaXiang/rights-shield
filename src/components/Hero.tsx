import React from 'react';
import { ArrowRight, ShieldCheck, Car, FileSearch } from 'lucide-react';
import WaveParticlesBackground from './WaveParticlesBackground';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden vignette">
      <WaveParticlesBackground position="full" />
      
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] animate-pulse-glow delay-300" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 mb-8 opacity-0 animate-fade-in-up">
          <span className="pill">
            <Car size={12} />
            车企数字预售消费者权益守护
          </span>
        </div>

        {/* Main heading */}
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6 opacity-0 animate-fade-in-up delay-100">
          <span className="text-white">AI 驱动的</span>
          <br />
          <span className="text-glow bg-gradient-to-r from-primary-300 via-accent to-blue-400 bg-clip-text text-transparent">
            购车合同守护
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-in-up delay-200">
          一键识别购车定金陷阱、分析预售合同条款是否侵权、获取专业维权建议。
          <br className="hidden md:block" />
          让 AI 为您的购车权益保驾护航。
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0 animate-fade-in-up delay-300">
          <a
            href="#ai-chat"
            className="group inline-flex items-center gap-2.5 px-8 py-4 bg-primary hover:bg-primary-600 text-white font-semibold btn-clip transition-all duration-300 glow-blue hover:glow-blue"
          >
            <span>免费咨询 AI</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white border border-white/[0.08] hover:border-white/[0.15] rounded-lg transition-all duration-300"
          >
            了解更多
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto opacity-0 animate-fade-in-up delay-400">
          {[
            { icon: FileSearch, value: '500+', label: '购车合同已分析' },
            { icon: Car, value: '95%', label: '识别准确率' },
            { icon: ShieldCheck, value: '1,200+', label: '车主信赖' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon size={20} className="text-accent mx-auto mb-2 opacity-60" />
              <div className="font-mono text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0 animate-fade-in-up delay-500">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
