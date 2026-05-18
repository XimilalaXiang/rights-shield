import { useState, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Cases from './components/Cases'
import Footer from './components/Footer'
import AIChat from './components/AIChat'
import './saas-dark.css'

const ChatPage = lazy(() => import('./pages/ChatPage'))

function HomePage() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
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

function App() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
