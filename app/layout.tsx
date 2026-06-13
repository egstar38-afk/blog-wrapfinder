import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Analytics from './analytics'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

const SITE_URL = 'https://blog.wrapfinder.fr'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'WrapGuide — PPF, Covering & Adhésifs Auto',
    template: '%s | WrapGuide',
  },
  description:
    'Guides et conseils sur le PPF (Paint Protection Film), le covering automobile et les adhésifs professionnels pour protéger et valoriser votre véhicule.',
  applicationName: 'WrapGuide',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: 'WrapGuide',
    title: 'WrapGuide — PPF, Covering & Adhésifs Auto',
    description:
      'Guides et conseils sur le PPF (Paint Protection Film), le covering automobile et les adhésifs professionnels pour protéger et valoriser votre véhicule.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WrapGuide — PPF, Covering & Adhésifs Auto',
    description:
      'Guides et conseils sur le PPF, le covering automobile et les adhésifs professionnels.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#141414',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={geist.variable}>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7256648363836885"
          crossOrigin="anonymous"
        />
        <meta name="google-site-verification" content="6ultDEjPgN8o2Q2qJoAgjXoHujz7v56-1ek5xzzprjM" />
        <Analytics />
      </head>
      <body className="min-h-screen flex flex-col bg-[#141414] text-zinc-200 font-sans antialiased">
        <header className="border-b border-zinc-800 bg-black sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center font-black text-black text-sm">
                W
              </div>
              <div>
                <span className="text-white font-bold text-lg tracking-tight">Wrap</span>
                <span className="text-amber-500 font-bold text-lg tracking-tight">Guide</span>
                <span className="text-zinc-500 text-xs ml-2 hidden sm:inline">PPF · Covering · Adhésifs</span>
              </div>
            </a>
            <nav className="flex gap-6 text-sm">
              <a href="/" className="text-zinc-400 hover:text-amber-500 transition-colors">Accueil</a>
              <a href="/#ppf" className="text-zinc-400 hover:text-amber-500 transition-colors">PPF</a>
              <a href="/#covering" className="text-zinc-400 hover:text-amber-500 transition-colors">Covering</a>
              <a href="/#adhesifs" className="text-zinc-400 hover:text-amber-500 transition-colors">Adhésifs</a>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">{children}</main>

        <footer className="border-t border-zinc-800 mt-auto">
          <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-zinc-500">
            <nav className="flex flex-wrap gap-x-5 gap-y-2 mb-4">
              <a href="/a-propos" className="hover:text-amber-500 transition-colors">À propos</a>
              <a href="/contact" className="hover:text-amber-500 transition-colors">Contact</a>
              <a href="/mentions-legales" className="hover:text-amber-500 transition-colors">Mentions légales</a>
              <a href="/politique-confidentialite" className="hover:text-amber-500 transition-colors">
                Politique de confidentialité
              </a>
            </nav>
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <p>© {new Date().getFullYear()} WrapGuide — PPF · Covering · Adhésifs</p>
              <p className="sm:text-right sm:max-w-md">
                Certains liens sont des liens affiliés Amazon. En achetant via ces liens vous soutenez le blog
                sans surcoût.
              </p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  )
}
