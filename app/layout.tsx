import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'emoji Select Panel',
  description: 'A high-performance, production-ready emoji panel component that supports emojis, GIFs, and animated stickers with virtualized rendering for optimal performance.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
