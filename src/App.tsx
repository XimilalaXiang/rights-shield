import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Cases from './components/Cases'
import Footer from './components/Footer'
import './saas-dark.css'

const ChatPage = lazy(() => import('./pages/ChatPage'))

function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="noise-overlay" />
      <Navbar />
      <main className="pt-0">
        <Hero />
        <Features />
        <Cases />
      </main>
      <Footer />
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
