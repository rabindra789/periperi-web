import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import ScrollManifesto from '@/components/ScrollManifesto'
import ProductStory from '@/components/ProductStory'
import EvidenceInContext from '@/components/EvidenceInContext'
import HowDevelopersUse from '@/components/HowDevelopersUse'
import Capabilities from '@/components/Capabilities'
import Availability from '@/components/Availability'
import CTASection from '@/components/CTASection'

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main">
        <Hero />
        <ScrollManifesto />
        <ProductStory />
        <EvidenceInContext />
        <HowDevelopersUse />
        <Capabilities />
        <Availability />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
