import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cinema iHub — Professional AI Video Studio',
  description: 'Generate cinematic-grade video with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-black antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}