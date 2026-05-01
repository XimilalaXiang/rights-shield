import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white border-b-4 border-black'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-black text-xl md:text-2xl tracking-wider text-black">
          权盾
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 font-sans text-sm md:text-base">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative px-2 py-1 hover:bg-[#ff6b6b] hover:text-white transition-all duration-200 border-2 border-transparent hover:border-black"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#ai-chat"
            className="hidden md:inline-flex px-5 py-2.5 bg-black text-white font-black text-sm border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,107,107,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,107,107,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
          >
            开始咨询
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-black border-2 border-black"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b-4 border-black">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 font-sans text-sm border-2 border-black hover:bg-[#feca57] transition-colors"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#ai-chat"
              className="block mt-4 px-4 py-3 bg-black text-white font-black text-sm text-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,107,107,1)]"
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
