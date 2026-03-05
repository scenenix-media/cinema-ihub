// app/contact/page.tsx

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactClient from './ContactClient'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <ContactClient />
      <Footer />
    </div>
  )
}