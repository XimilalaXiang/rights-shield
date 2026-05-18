import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Shield, Menu, X } from 'lucide-react'

interface NavLink {
  label: string
  path: string
}

const navLinks: NavLink[] = [
  { label: '首页', path: '/' },
  { label: '案例库', path: '/cases' },
  { label: '维权指南', path: '/guide' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const location = useLocation()

  const activeIndex = navLinks.findIndex(link => link.path === location.pathname)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const updateIndicator = useCallback((index: number | null) => {
    const targetIndex = index ?? (activeIndex >= 0 ? activeIndex : null)
    if (targetIndex === null || !linkRefs.current[targetIndex]) {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }))
      return
    }
    const el = linkRefs.current[targetIndex]
    if (el) {
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1,
      })
    }
  }, [activeIndex])

  useEffect(() => {
    updateIndicator(hoveredIndex)
  }, [hoveredIndex, activeIndex, updateIndicator])

  useEffect(() => {
    const handleResize = () => updateIndicator(hoveredIndex)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [hoveredIndex, updateIndicator])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-lg scale-150 group-hover:scale-[1.75] transition-all duration-500 blur-xl opacity-0 group-hover:opacity-100" />
              <Shield className="w-7 h-7 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight group-hover:text-neutral-300 transition-colors duration-300">
              权盾
            </span>
          </Link>

          {/* Desktop nav - pill style */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative flex items-center bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10">
              {/* Sliding indicator */}
              <div
                className="absolute top-1 bottom-1 bg-white/10 rounded-full transition-all duration-300 ease-out pointer-events-none"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  opacity: indicatorStyle.opacity,
                  boxShadow: hoveredIndex !== null || activeIndex >= 0
                    ? '0 0 20px rgba(255,255,255,0.1), inset 0 0 0 1px rgba(255,255,255,0.1)'
                    : 'none',
                }}
              />

              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  ref={(el) => { linkRefs.current[index] = el }}
                  to={link.path}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative z-10 px-5 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                    activeIndex === index ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span className="relative">
                    {link.label}
                    {activeIndex === index && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_6px_white]" />
                    )}
                  </span>
                </Link>
              ))}
            </div>

            <Link
              to="/chat"
              className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-200 hover:shadow-[0_4px_15px_rgba(255,255,255,0.15)] transition-all duration-200"
            >
              AI 咨询
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden relative p-2 text-white/80 hover:text-white transition-colors group"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="relative">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 top-16 z-40 transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
        <div className={`relative z-10 py-8 px-6 transition-all duration-500 ${
          mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
        }`}>
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-lg py-4 px-4 rounded-xl transition-all duration-300 ${
                  activeIndex === index
                    ? 'text-white bg-white/10 border border-white/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                style={{ transitionDelay: mobileOpen ? `${index * 50}ms` : '0ms' }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/chat"
              onClick={() => setMobileOpen(false)}
              className="mt-4 block w-full px-5 py-3.5 bg-white text-black text-sm font-semibold rounded-xl text-center"
              style={{ transitionDelay: mobileOpen ? `${navLinks.length * 50}ms` : '0ms' }}
            >
              AI 咨询
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  )
}
