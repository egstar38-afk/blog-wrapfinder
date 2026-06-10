import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Script from 'next/script'
import Link from 'next/link'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: {
    default: 'Blog PPF & Adhésifs Pro',
    template: '%s | Blog PPF & Adhésifs Pro',
  },
  description:
    'Guides et conseils sur le PPF (Paint Protection Film) et les adhésifs professionnels pour protéger et valoriser votre véhicule.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={geist.variable}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 font-sans antialiased">
        <header className="border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-5 flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold tracking-tight hover:text-gray-600 transition-colors">
              Blog PPF &amp; Adhésifs Pro
            </Link>
            <nav className="flex gap-6 text-sm text-gray-600">
              <Link href="/?cat=ppf-general" className="hover:text-gray-900 transition-colors">
                PPF
              </Link>
              <Link href="/?cat=adhesif-general" className="hover:text-gray-900 transition-colors">
                Adhésifs
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">{children}</main>

        <footer className="border-t border-gray-200 mt-auto">
          <div className="max-w-4xl mx-auto px-4 py-6 text-sm text-gray-500 flex flex-col sm:flex-row justify-between gap-2">
            <p>© {new Date().getFullYear()} Blog PPF &amp; Adhésifs Pro</p>
            <p>
              Certains liens sont des liens affiliés Amazon. En achetant via ces liens vous soutenez le blog sans
              surcoût.
            </p>
          </div>
        </footer>

        {/* Google AdSense — remplacer data-ad-client par votre ID éditeur */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  )
}
