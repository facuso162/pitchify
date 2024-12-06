import type { Metadata } from 'next'
import './globals.css'
import { workSans } from './fonts/fonts'

export const metadata: Metadata = {
  title: 'Pitchify',
  description: 'Pitch, Vote and Grow',
}

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${workSans.variable} antialiased bg-white`}>{children}</body>
    </html>
  )
}

export default RootLayout
