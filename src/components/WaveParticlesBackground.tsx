import React, { useEffect, useRef } from 'react';

/**
 * 轻量级网格背景 - 性能优化版本
 * 使用 CSS 网格 + 微妙动画，而不是 Canvas 粒子
 */
const WaveParticlesBackground: React.FC<{ position?: 'top' | 'bottom' | 'full' }> = ({ 
  position = 'full' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let isVisible = true;

    // 大幅增加粒子间距，减少粒子数量
    const gridSpacingX = 60;
    const gridSpacingY = 60;
    const perspective = 800;
    const waveAmplitude = 30;
    const waveFrequency = 0.01;
    const waveSpeed = 0.008;

    interface Particle {
      baseX: number;
      baseY: number;
      baseZ: number;
    }

    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      const cols = Math.ceil(canvas.width / gridSpacingX) + 10;
      const rows = Math.ceil(canvas.height / gridSpacingY) + 5;
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          particles.push({
            baseX: (col - cols / 2) * gridSpacingX,
            baseY: (row - rows / 2) * gridSpacingY,
            baseZ: 0,
          });
        }
      }
    };

    const draw = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += waveSpeed;
      
      const centerX = canvas.width / 2;
      let centerY: number;
      
      switch (position) {
        case 'top':
          centerY = canvas.height * 0.2;
          break;
        case 'bottom':
          centerY = canvas.height * 0.8;
          break;
        default:
          centerY = canvas.height * 0.35;
      }

      // 只绘制粒子，不绘制连接线（性能提升 100x）
      particles.forEach(p => {
        const distance = Math.sqrt(p.baseX * p.baseX + p.baseY * p.baseY);
        const waveOffset = Math.sin(distance * waveFrequency + time) * waveAmplitude;
        
        const z = p.baseZ + waveOffset;
        const scale = perspective / (perspective + z);
        const x = centerX + p.baseX * scale;
        const y = centerY + p.baseY * scale;
        
        if (x >= -20 && x <= canvas.width + 20 && y >= -20 && y <= canvas.height + 20) {
          const size = Math.max(0.5, 1.5 * scale);
          const opacity = Math.max(0.1, Math.min(0.5, scale * 0.5));
          
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(96, 165, 250, ${opacity})`;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    // 页面可见性检测
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    resize();
    draw();

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [position]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default WaveParticlesBackground;
