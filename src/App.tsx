import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Cases from './components/Cases'
import Footer from './components/Footer'
import AIAssistant from './components/AIAssistant'

function App() {
  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1C1C1C]">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Cases />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  )
}

export default App
