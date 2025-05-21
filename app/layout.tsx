import type { Metadata } from "next";
import "./globals.css";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: "Hi! I'm Faith Kajuju",
  description: "Zoho Solutions Expert",
  icons: {
    icon: '/favicon.ico',
  },
};

import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  // Optional: Define specific weights you'll use
  weight: ['300', '400', '500', '600', '700'],
  // Optional: Define styles
  style: ['normal', 'italic'],
  // Optional: Enable variable font optimization
  variable: '--font-montserrat'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">      <body className={`${montserrat.className} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
