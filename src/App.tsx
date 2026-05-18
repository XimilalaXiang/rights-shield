import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import CaseCTA from './components/CaseCTA'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import './saas-dark.css'

const ChatPage = lazy(() => import('./pages/ChatPage'))
const CaseLibrary = lazy(() => import('./pages/CaseLibrary'))

function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="noise-overlay" />
      <Navbar />
      <main className="pt-0">
        <Hero />
        <Features />
        <Testimonials />
        <CaseCTA />
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
        <Route path="/cases" element={<CaseLibrary />} />
      </Routes>
    </Suspense>
  )
}

export default App
