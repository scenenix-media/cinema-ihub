// app/faq/page.tsx

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQClient from './FAQClient'

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <FAQClient />
      <Footer />
    </div>
  )
}