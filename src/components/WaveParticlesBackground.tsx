import React, { useEffect, useRef } from 'react';

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

    const gridSpacingX = 22;
    const gridSpacingY = 22;
    const perspective = 800;
    const waveAmplitude = 50;
    const waveFrequency = 0.018;
    const waveSpeed = 0.012;

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
      const cols = Math.ceil(canvas.width / gridSpacingX) + 20;
      const rows = Math.ceil(canvas.height / gridSpacingY) + 10;
      
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

      const projectedParticles: Array<{
        x: number;
        y: number;
        z: number;
        size: number;
        opacity: number;
      }> = [];

      particles.forEach(p => {
        const distance = Math.sqrt(p.baseX * p.baseX + p.baseY * p.baseY);
        const waveOffset = Math.sin(distance * waveFrequency + time) * waveAmplitude;
        
        const z = p.baseZ + waveOffset;
        
        const scale = perspective / (perspective + z);
        const x = centerX + p.baseX * scale;
        const y = centerY + p.baseY * scale;
        
        if (x >= -50 && x <= canvas.width + 50 && y >= -50 && y <= canvas.height + 50) {
          const size = Math.max(0.5, 2 * scale);
          const opacity = Math.max(0.1, Math.min(0.7, scale * 0.7));
          
          projectedParticles.push({ x, y, z, size, opacity });
        }
      });

      projectedParticles.sort((a, b) => a.z - b.z);

      // Blue particles
      projectedParticles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        const r = Math.max(60, Math.min(120, 80 + p.z * 0.2));
        const g = Math.max(130, Math.min(200, 160 + p.z * 0.3));
        const b = Math.max(200, Math.min(255, 230 + p.z * 0.2));
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity})`;
        ctx.fill();
      });

      // Connection lines
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.04)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < projectedParticles.length; i++) {
        const p1 = projectedParticles[i];
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const p2 = projectedParticles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 35 && Math.abs(p1.z - p2.z) < 50) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.globalAlpha = Math.max(0, 0.12 * (1 - dist / 35));
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
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
