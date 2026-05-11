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
    <div className="min-h-screen bg-background text-foreground smooth-scroll">
      <ProNavbar />
      <main>
        <ProHero />
        <section id="experience">
          <ProfessionalExperience />
        </section>
        <section id="scale-security">
          <BentoScale />
        </section>
        <section id="certifications">
          <ProCertificationsWithUpload />
        </section>
        <section id="infrastructure">
          <InfrastructureStack />
        </section>
        <section id="resume">
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
