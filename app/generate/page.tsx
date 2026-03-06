// app/generate/page.tsx

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GenerateClient from './GenerateClient'

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <GenerateClient />
      
      <Footer />
    </div>
  )
}