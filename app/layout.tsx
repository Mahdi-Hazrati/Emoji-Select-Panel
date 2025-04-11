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
      <script defer src="https://platform.analytick.ir/script.js" data-website-id="a47388c9-93c5-4971-bbd3-2b7d33ce3d51"></script>
      <body>{children}</body>
    </html>
  )
}
