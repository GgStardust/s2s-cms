import type { Metadata } from 'next'
import { Montserrat, Lora } from 'next/font/google'
import './globals.css'
import PublicNav from '@/components/navigation/PublicNav'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  preload: true,
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  preload: true,
})

export const metadata: Metadata = {
  title: 'Stardust to Sovereignty Dashboard',
  description: 'A comprehensive framework for understanding and developing sovereign consciousness through 13 fundamental Orbs.',
  keywords: ['consciousness', 'sovereignty', 'orbs', 'spiritual development', 'quantum intelligence'],
  authors: [{ name: 'Gigi Stardust' }],
  openGraph: {
    title: 'Stardust to Sovereignty Dashboard',
    description: 'A comprehensive framework for understanding and developing sovereign consciousness through 13 fundamental Orbs.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stardust to Sovereignty Dashboard',
    description: 'A comprehensive framework for understanding and developing sovereign consciousness through 13 fundamental Orbs.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lora.variable}`}>
      <body className="bg-deep-navy text-creamy-white min-h-screen">
        <PublicNav />
        {children}
      </body>
    </html>
  )
}
