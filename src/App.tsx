import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Cases from './components/Cases'
import Footer from './components/Footer'
import AIChat from './components/AIChat'
import './saas-dark.css'

function App() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      <Navbar onOpenChat={() => setChatOpen(true)} />
      <main className="pt-0">
        <Hero onOpenChat={() => setChatOpen(true)} />
        <Features />
        <Cases onOpenChat={() => setChatOpen(true)} />
      </main>
      <Footer />
      <AIChat
        isOpen={chatOpen}
        onToggle={() => setChatOpen(!chatOpen)}
        onClose={() => setChatOpen(false)}
      />
    </div>
  )
}

export default App
