import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Cases from './components/Cases'
import Footer from './components/Footer'
import AIAssistant from './components/AIAssistant'

function App() {
  return (
    <div className="min-h-screen bg-[#fef9ef] text-black">
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
