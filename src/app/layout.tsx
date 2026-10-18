import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-grotesk',
})

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL at build time to your production domain so that
  // Open Graph / Twitter image URLs resolve correctly. Falls back to a placeholder.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://periperi.dev'),
  title: 'Periperi — Security findings with evidence',
  description: 'Understand what your code contains. See the evidence. Make better security decisions. VS Code extension for contextual security scanning.',
  keywords: ['security', 'scanning', 'VS Code', 'cryptography', 'post-quantum', 'CBOM', 'developer tools'],
  authors: [{ name: 'Periperi Contributors' }],
  creator: 'Periperi',
  publisher: 'Periperi',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://github.com/rabindra789/periperi',
    siteName: 'Periperi',
    title: 'Periperi — Security findings with evidence',
    description: 'Understand what your code contains. See the evidence. Make better security decisions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Periperi — Security scanning with contextual findings',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Periperi — Security findings with evidence',
    description: 'Understand what your code contains. See the evidence. Make better security decisions.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#F3F0E8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <head>
        <Script
          id="scroll-restoration"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: 'if ("scrollRestoration" in history) { history.scrollRestoration = "manual"; } window.scrollTo(0, 0); window.addEventListener("DOMContentLoaded", function() { window.scrollTo(0, 0); }); window.addEventListener("pageshow", function() { window.scrollTo(0, 0); }); window.addEventListener("load", function() { window.scrollTo({ top: 0, behavior: "instant" }); setTimeout(function() { document.documentElement.classList.add("scroll-ready"); }, 100); });',
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}