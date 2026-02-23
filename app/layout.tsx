import type { Metadata } from 'next'
import { AuthProvider } from '../components/Providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cinema iHub',
  description: 'Professional AI Video Studio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}