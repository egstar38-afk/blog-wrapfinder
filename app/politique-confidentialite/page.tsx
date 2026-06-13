import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Politique de confidentialité de WrapGuide : données collectées, cookies, publicité Google AdSense, mesure d’audience et vos droits (RGPD).',
  alternates: { canonical: '/politique-confidentialite' },
  robots: { index: false, follow: true },
}

export default function ConfidentialitePage() {
  return (
    <div className="max-w-[780px] mx-auto">
      <nav className="text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-amber-500 transition-colors">Accueil</Link>
        <span className="mx-2">/</span>
        <span>Politique de confidentialité</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight mb-6 text-white">Politique de confidentialité</h1>

      <div className="prose max-w-none">
        <p>
          La présente politique explique quelles données sont collectées lorsque vous consultez{' '}
          <strong>WrapGuide</strong> (blog.wrapfinder.fr), pourquoi, et comment exercer vos droits. Nous
          appliquons le Règlement général sur la protection des données (RGPD).
        </p>

        <h2>Responsable du traitement</h2>
        <p>
          Le responsable du traitement est l&apos;éditeur du site (voir{' '}
          <Link href="/mentions-legales">mentions légales</Link>). Pour toute question relative à vos données,
          contactez-nous via la <Link href="/contact">page contact</Link>.
        </p>

        <h2>Données collectées</h2>
        <p>
          WrapGuide ne demande pas la création de compte et ne collecte pas de données personnelles via un
          formulaire. Des données techniques peuvent toutefois être collectées automatiquement&nbsp;:
        </p>
        <ul>
          <li>données de navigation (pages vues, type d&apos;appareil, provenance) à des fins de statistiques&nbsp;;</li>
          <li>cookies déposés par nos partenaires publicitaires et de mesure d&apos;audience (voir ci-dessous).</li>
        </ul>

        <h2>Publicité — Google AdSense</h2>
        <p>
          Ce site diffuse des annonces via <strong>Google AdSense</strong>. Google et ses partenaires
          utilisent des cookies pour diffuser des annonces en fonction de vos visites sur ce site et
          d&apos;autres sites. Vous pouvez gérer la personnalisation des annonces depuis{' '}
          <a href="https://adssettings.google.com" rel="nofollow noopener" target="_blank">
            les paramètres des annonces Google
          </a>
          . Pour les visiteurs de l&apos;Union européenne, un message de consentement (CMP) recueille votre
          accord avant le dépôt de cookies publicitaires non essentiels.
        </p>

        <h2>Mesure d&apos;audience</h2>
        <p>
          Nous utilisons un outil de mesure d&apos;audience afin de comprendre quels contenus sont les plus
          utiles et améliorer le site. Les données sont agrégées et ne servent pas à vous identifier
          personnellement.
        </p>

        <h2>Liens d&apos;affiliation Amazon</h2>
        <p>
          WrapGuide participe au Programme Partenaires d&apos;Amazon, un programme d&apos;affiliation permettant
          de percevoir une rémunération via des liens vers Amazon.fr. Lorsque vous cliquez sur un lien
          affilié, Amazon peut déposer un cookie afin d&apos;attribuer une éventuelle commission. Cela
          n&apos;entraîne aucun surcoût pour vous.
        </p>

        <h2>Cookies</h2>
        <p>
          Les cookies sont de petits fichiers déposés sur votre appareil. Sur ce site, ils proviennent
          principalement de la publicité (Google AdSense), de la mesure d&apos;audience et de
          l&apos;affiliation. Vous pouvez à tout moment configurer votre navigateur pour bloquer ou supprimer
          les cookies&nbsp;; certaines fonctionnalités publicitaires peuvent alors être limitées.
        </p>

        <h2>Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
          de limitation et d&apos;opposition concernant vos données. Pour exercer ces droits, contactez-nous
          via la <Link href="/contact">page contact</Link>. Vous pouvez également introduire une réclamation
          auprès de la <a href="https://www.cnil.fr" rel="nofollow noopener" target="_blank">CNIL</a>.
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
