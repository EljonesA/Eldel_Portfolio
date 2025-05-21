import Hero from './components/Hero'
import About from './components/About'
import Navbar from './components/Navbar'
import Contact from './components/Contact'
import Assessments from './components/Assessment'
export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <About />
      <Assessments />
      <Contact />
    </main>
  )
}
