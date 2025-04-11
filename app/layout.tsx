// layout.tsx or _app.tsx depending on your Next.js version
import type { Metadata } from 'next'
import Header from '@/components/Header' // Import the Header component
import './globals.css'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Emoji Select Panel',
  description: 'A high-performance, production-ready emoji panel component that supports emojis, GIFs, and animated stickers with virtualized rendering for optimal performance.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script defer src="https://platform.analytick.ir/script.js" data-website-id="a47388c9-93c5-4971-bbd3-2b7d33ce3d51"></script>
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
