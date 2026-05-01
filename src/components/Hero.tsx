import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Wave animation
    let animationId: number;
    let time = 0;

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw multiple waves
      const waves = [
        { amplitude: 30, frequency: 0.02, speed: 0.03, color: 'rgba(26, 48, 85, 0.1)' },
        { amplitude: 20, frequency: 0.03, speed: 0.04, color: 'rgba(212, 85, 58, 0.08)' },
        { amplitude: 25, frequency: 0.025, speed: 0.035, color: 'rgba(201, 162, 39, 0.06)' },
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 + 
            Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
            Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 0.7) * wave.amplitude * 0.5;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      time++;
      animationId = requestAnimationFrame(drawWave);
    };

    drawWave();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden ue-washi">
      {/* Wave Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 border-2 border-[#1a3055]/20 rotate-45 ue-animate-float" />
      <div className="absolute bottom-20 right-10 w-12 h-12 bg-[#d4553a]/20 border-2 border-[#d4553a]/30 ue-animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-20 w-8 h-8 bg-[#c9a227]/20 rounded-full ue-animate-float" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        {/* Stamp */}
        <div className="inline-block mb-8">
          <span className="ue-stamp text-sm">
            中山大学研究项目
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#1a3055] mb-6 leading-tight tracking-wider">
          车企消费者
          <br />
          <span className="text-[#d4553a]">权益守护</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-[#1a3055]/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          基于AI技术的专业法律咨询平台，帮助您识别购车合同中的不公平条款，
          守护您的合法权益
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#features"
            className="ue-btn ue-btn-vermilion text-base px-8 py-4"
          >
            了解功能
          </a>
          <a
            href="#contact"
            className="ue-btn ue-btn-outline text-base px-8 py-4"
          >
            免费咨询
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
          {[
            { value: '500+', label: '成功案例' },
            { value: '98%', label: '满意度' },
            { value: '24h', label: '响应时间' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#d4553a]">
                {stat.value}
              </div>
              <div className="text-sm text-[#1a3055]/60 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-[#1a3055]/40">向下滚动</span>
          <div className="w-6 h-10 border-2 border-[#1a3055]/30 rounded-full flex justify-center">
            <div className="w-1.5 h-1.5 bg-[#1a3055]/40 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
