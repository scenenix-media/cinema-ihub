// app/pricing/page.tsx

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PricingClient from './PricingClient'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <PricingClient />
      <Footer />
    </div>
  )
}