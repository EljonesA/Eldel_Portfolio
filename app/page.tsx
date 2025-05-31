import Hero from './components/Hero'
import About from './components/About'
import Contact from './components/Contact'
import Assessments from './components/Assessment'

export default function Home() {
  return (
    <main className="bg-black">
      <Hero />
      <About />
      <Assessments />
      <Contact />
    </main>
  )
}
