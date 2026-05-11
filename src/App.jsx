import ProNavbar from './components/ProNavbar'
import ProHero from './components/ProHero'
import ProfessionalExperience from './components/ProfessionalExperience'
import BentoScale from './components/BentoScale'
import ProCertificationsWithUpload from './components/ProCertificationsWithUpload'
import InfrastructureStack from './components/InfrastructureStack'
import ProResumeManager from './components/ProResumeManager'
import ProFooter from './components/ProFooter'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground smooth-scroll overflow-x-hidden">
      <ProNavbar />
      <main className="w-full max-w-full overflow-x-hidden">
        <ProHero />
        <section id="experience" className="w-full max-w-full overflow-x-hidden">
          <ProfessionalExperience />
        </section>
        <section id="scale-security" className="w-full max-w-full overflow-x-hidden">
          <BentoScale />
        </section>
        <section id="certifications" className="w-full max-w-full overflow-x-hidden">
          <ProCertificationsWithUpload />
        </section>
        <section id="infrastructure" className="w-full max-w-full overflow-x-hidden">
          <InfrastructureStack />
        </section>
        <section id="resume" className="w-full max-w-full overflow-x-hidden">
          <ProResumeManager />
        </section>
        <section id="contact">
          <ProFooter />
        </section>
      </main>
    </div>
  )
}

export default App
