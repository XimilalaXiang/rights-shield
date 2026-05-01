import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Cases from './components/Cases'
import Footer from './components/Footer'
import AIChat from './components/AIChat'
import './ukiyo-e-digital.css'

function App() {
  return (
    <div className="min-h-screen bg-[#f5f0e1] text-[#1a3055]">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Cases />
      </main>
      <Footer />
      <AIChat />
    </div>
  )
}

export default App
