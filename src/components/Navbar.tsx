import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenChat?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenChat }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '首页', href: '#hero' },
    { name: '功能', href: '#features' },
    { name: '案例', href: '#cases' },
    { name: '关于', href: '#about' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 ${
        scrolled 
          ? 'bg-white border-b-4 border-black' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#ff006e] border-4 border-black flex items-center justify-center">
              <span className="text-white font-bold text-lg">权</span>
            </div>
            <span className="font-bold text-xl tracking-wider text-black uppercase">
              权盾
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-black hover:text-[#ff006e] transition-colors font-bold tracking-wider text-sm uppercase"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={onOpenChat}
              className="nb-btn nb-btn-primary text-sm px-4 py-2"
            >
              免费咨询
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black p-2 border-2 border-black"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t-4 border-black bg-white">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-3 text-black hover:text-[#ff006e] transition-colors font-bold uppercase"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => {
                onOpenChat?.();
                setMobileOpen(false);
              }}
              className="block mt-4 nb-btn nb-btn-primary text-center text-sm w-full"
            >
              免费咨询
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
