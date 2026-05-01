import React, { useState, useEffect, useRef } from 'react';
import { Shield, Menu, X } from 'lucide-react';

const navItems = [
  { name: '首页', href: '#hero' },
  { name: '功能', href: '#features' },
  { name: 'AI 助手', href: '#ai-chat' },
  { name: '案例', href: '#cases' },
  { name: '关于', href: '#about' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const activeEl = navRefs.current[activeIndex];
    if (activeEl && indicatorRef.current) {
      const rect = activeEl.getBoundingClientRect();
      const navRect = activeEl.parentElement!.getBoundingClientRect();
      indicatorRef.current.style.left = `${rect.left - navRect.left}px`;
      indicatorRef.current.style.width = `${rect.width}px`;
    }
  }, [activeIndex]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <Shield size={16} className="text-accent" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-semibold tracking-wide text-white">
              权盾
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
              RightsShield
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 relative">
          <div
            ref={indicatorRef}
            className="absolute top-1/2 -translate-y-1/2 h-8 bg-white/[0.06] rounded-full transition-all duration-300 ease-out border border-white/[0.08]"
            style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.1)' }}
          />
          {navItems.map((item, i) => (
            <a
              key={item.name}
              href={item.href}
              ref={(el: HTMLAnchorElement | null) => { navRefs.current[i] = el; }}
              onClick={() => handleClick(i)}
              className={`relative z-10 px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                activeIndex === i ? 'text-white' : 'text-white/50 hover:text-white/70'
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#ai-chat"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary-600 text-white text-sm font-semibold btn-clip-sm transition-all duration-200 glow-blue-sm hover:glow-blue"
          >
            开始咨询
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white/70 hover:text-white"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/[0.06]">
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item, i) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => handleClick(i)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeIndex === i
                    ? 'text-white bg-white/[0.06]'
                    : 'text-white/50 hover:text-white/70 hover:bg-white/[0.03]'
                }`}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#ai-chat"
              className="block mt-3 px-4 py-3 bg-primary text-white text-sm font-semibold text-center btn-clip-sm"
            >
              开始咨询
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
