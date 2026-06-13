import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du blog WrapGuide : éditeur, hébergeur et propriété intellectuelle.',
  alternates: { canonical: '/mentions-legales' },
  robots: { index: false, follow: true },
}

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-[780px] mx-auto">
      <nav className="text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-amber-500 transition-colors">Accueil</Link>
        <span className="mx-2">/</span>
        <span>Mentions légales</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight mb-6 text-white">Mentions légales</h1>

      <div className="prose max-w-none">
        <h2>Éditeur du site</h2>
        <p>
          Le site <strong>WrapGuide</strong> (blog.wrapfinder.fr) est édité par&nbsp;:
        </p>
        <ul>
          <li><strong>Éditeur</strong> : Benjamin Philibert</li>
          <li><strong>Statut</strong> : Entrepreneur individuel (auto-entrepreneur)</li>
          <li><strong>SIREN</strong> : 978 717 338</li>
          <li><strong>Adresse</strong> : 4 passage de la Poterie, 39570 Goncelin</li>
          <li>
            <strong>Contact</strong> : voir la <Link href="/contact">page contact</Link>
          </li>
          <li><strong>Directeur de la publication</strong> : Benjamin Philibert</li>
          <li><strong>TVA</strong> : non applicable, article 293 B du CGI (franchise en base)</li>
        </ul>

        <h2>Hébergeur</h2>
        <p>
          Le site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789,
          États-Unis — <a href="https://vercel.com" rel="nofollow noopener" target="_blank">vercel.com</a>.
          La zone DNS est gérée via Cloudflare, Inc.
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus présents sur ce site (textes, photographies, mise en page) est, sauf
          mention contraire, la propriété de l&apos;éditeur ou de ses partenaires. Toute reproduction,
          représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.
          Les marques et logos cités (XPEL, 3M, Avery Dennison, Hexis, etc.) appartiennent à leurs
          propriétaires respectifs et ne sont mentionnés qu&apos;à titre informatif.
        </p>

        <h2>Liens d&apos;affiliation et publicité</h2>
        <p>
          Ce site contient des liens d&apos;affiliation (notamment Amazon) et diffuse de la publicité. Pour en
          savoir plus sur la gestion des données et des cookies, consultez notre{' '}
          <Link href="/politique-confidentialite">politique de confidentialité</Link>.
        </p>

        <h2>Responsabilité</h2>
        <p>
          Les informations publiées sur WrapGuide sont fournies à titre indicatif et ne sauraient se
          substituer à l&apos;avis d&apos;un professionnel. L&apos;éditeur ne peut être tenu responsable des
          conséquences d&apos;une mauvaise interprétation ou utilisation des contenus.
        </p>

        <p className="text-sm text-zinc-500">Dernière mise à jour : juin 2026.</p>
      </div>

      <div className="mt-10">
        <Link href="/" className="text-sm text-zinc-400 hover:text-amber-500 transition-colors">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
