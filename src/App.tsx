import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import './saas-dark.css'

const ChatPage = lazy(() => import('./pages/ChatPage'))
const CaseLibrary = lazy(() => import('./pages/CaseLibrary'))
const RightsGuide = lazy(() => import('./pages/RightsGuide'))
const Quiz = lazy(() => import('./pages/Quiz'))

function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="noise-overlay" />
      <Navbar />
      <main className="pt-0">
        <Hero />
        <Features />
        <Testimonials />
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
        <Route path="/guide" element={<RightsGuide />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Suspense>
  )
}

export default App
