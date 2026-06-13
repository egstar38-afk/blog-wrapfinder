import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez WrapGuide pour toute question sur le PPF, le covering ou les adhésifs automobiles, une suggestion d’article ou une demande professionnelle.',
  alternates: { canonical: '/contact' },
}

// TODO: remplacez par votre adresse de contact définitive si besoin
const CONTACT_EMAIL = 'easypeasycompagnie@gmail.com'

export default function ContactPage() {
  return (
    <div className="max-w-[780px] mx-auto">
      <nav className="text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-amber-500 transition-colors">Accueil</Link>
        <span className="mx-2">/</span>
        <span>Contact</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight mb-6 text-white">Contact</h1>

      <div className="prose max-w-none">
        <p>
          Une question sur le PPF, le covering ou les adhésifs ? Une suggestion d&apos;article, une erreur à
          signaler, ou une demande professionnelle (partenariat, contenu) ? Écrivez-nous, nous répondons à
          tous les messages.
        </p>
      </div>

      <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
        <p className="text-zinc-400 text-sm mb-2">Par e-mail :</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-amber-500 text-lg font-medium hover:underline break-all"
        >
          {CONTACT_EMAIL}
        </a>
      </div>

      <div className="prose max-w-none mt-8">
        <p className="text-sm text-zinc-500">
          WrapGuide est un blog éditorial. Nous ne réalisons pas de pose : pour faire poser un PPF ou un
          covering, rapprochez-vous d&apos;un poseur professionnel près de chez vous.
        </p>
      </div>

      <div className="mt-10">
        <Link href="/" className="text-sm text-zinc-400 hover:text-amber-500 transition-colors">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
