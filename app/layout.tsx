import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'Project Sahaj - Public Transportation Management System',
  description: 'Making public transportation easily accessible, fast, reliable, predictable and safe for the general public in Nepal.',
  keywords: ['transportation', 'Nepal', 'Kathmandu', 'bus', 'public transit', 'RFID'],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#1a2e1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
