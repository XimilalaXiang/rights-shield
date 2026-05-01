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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#F9F8F6]/90 backdrop-blur border-b border-[#1C1C1C]/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-serif text-xl md:text-2xl tracking-tight text-[#1C1C1C]">
          权盾
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover-underline text-sm tracking-wide text-[#1C1C1C]/60 hover:text-[#1C1C1C] transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#ai-chat"
            className="hidden md:inline-flex px-6 py-3 text-sm tracking-wide border border-[#1C1C1C] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#F9F8F6] transition-colors duration-200"
          >
            开始咨询
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-[#1C1C1C]"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#F9F8F6] border-b border-[#1C1C1C]/10">
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm tracking-wide text-[#1C1C1C]/60 hover:text-[#1C1C1C] transition-colors"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#ai-chat"
              className="block mt-4 px-6 py-3 text-sm tracking-wide border border-[#1C1C1C] text-[#1C1C1C] text-center"
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
