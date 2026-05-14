import { useState, useEffect } from 'react'
import { Shield, Menu, X } from 'lucide-react'

interface NavbarProps {
  onOpenChat: () => void
}

export default function Navbar({ onOpenChat }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: '功能', href: '#features' },
    { label: '案例', href: '#cases' },
    { label: '关于', href: '#about' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-neutral-800'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <Shield className="w-6 h-6 text-white" />
            <span className="text-lg font-bold text-white tracking-tight">权盾</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onOpenChat}
              className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-neutral-200 transition-colors"
            >
              免费咨询
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-neutral-800 mt-2 pt-4">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="block py-2 text-neutral-400 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { onOpenChat(); setMobileOpen(false) }}
              className="mt-3 w-full px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-lg"
            >
              免费咨询
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
