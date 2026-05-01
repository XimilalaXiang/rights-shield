import React from 'react';

interface HeroProps {
  onOpenChat?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenChat }) => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-white pt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="nb-badge nb-badge-pink mb-6">
              中山大学研究项目
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-black mb-6 leading-none">
              车企消费者
              <br />
              <span className="text-[#ff006e]">权益守护</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-black/80 mb-8 max-w-xl leading-relaxed">
              基于AI技术的专业法律咨询平台，帮助您识别购车合同中的不公平条款，
              守护您的合法权益
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#features"
                className="nb-btn nb-btn-primary text-base px-8 py-4"
              >
                了解功能
              </a>
              <button
                onClick={onOpenChat}
                className="nb-btn nb-btn-outline text-base px-8 py-4"
              >
                免费咨询
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { value: '500+', label: '成功案例' },
                { value: '98%', label: '满意度' },
                { value: '24h', label: '响应时间' },
              ].map((stat) => (
                <div key={stat.label} className="nb-card p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#ff006e]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-black/60 mt-1 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            {/* Main Card */}
            <div className="nb-card p-8 bg-[#ccff00]">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-2xl font-bold text-black mb-2 uppercase">
                智能合同分析
              </h3>
              <p className="text-black/80">
                AI驱动的合同条款识别，一键发现潜在风险
              </p>
              <div className="mt-6 flex gap-4">
                <div className="nb-badge nb-badge-blue">合同审查</div>
                <div className="nb-badge nb-badge-orange">风险预警</div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 nb-card p-3 bg-[#00d9ff] nb-animate-bounce">
              <span className="text-2xl">⚡</span>
            </div>
            <div className="absolute -bottom-4 -left-4 nb-card p-3 bg-[#ff9500] nb-animate-shake">
              <span className="text-2xl">🛡️</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
