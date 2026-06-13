import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos de WrapGuide',
  description:
    'WrapGuide est un blog de référence sur le PPF, le covering automobile et les adhésifs : guides pratiques, comparatifs et conseils de pose rédigés avec des poseurs professionnels.',
  alternates: { canonical: '/a-propos' },
}

export default function AProposPage() {
  return (
    <div className="max-w-[780px] mx-auto">
      <nav className="text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-amber-500 transition-colors">Accueil</Link>
        <span className="mx-2">/</span>
        <span>À propos</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight mb-6 text-white">À propos de WrapGuide</h1>

      <div className="prose max-w-none">
        <p>
          <strong>WrapGuide</strong> est un blog indépendant dédié à la protection et à la personnalisation
          automobile : <strong>PPF</strong> (Paint Protection Film), <strong>covering</strong> (film vinyle) et{' '}
          <strong>adhésifs professionnels</strong>. Notre objectif est simple : vous donner une information
          claire, honnête et concrète avant de protéger ou de transformer votre véhicule.

        </p>

        <h2>Notre mission</h2>
        <p>
          Le marché du PPF et du covering est plein de promesses marketing et de prix difficiles à comparer.
          Nous publions des guides pratiques, des comparatifs de marques, des fourchettes de prix réelles et
          des conseils de pose pour vous aider à faire le bon choix — que vous soyez automobiliste,
          passionné ou futur poseur.
        </p>

        <h2>Notre expertise</h2>
        <p>
          Nos contenus sont rédigés à partir de l'expérience d'ateliers et de poseurs professionnels. Les
          photos qui illustrent nos articles proviennent de poses réelles réalisées en atelier (PPF, covering
          imprimé, chrome delete, covering publicitaire), ce qui nous permet de montrer des résultats concrets
          plutôt que des images de catalogue.
        </p>

        <h2>Indépendance et transparence</h2>
        <p>
          WrapGuide est financé par la publicité et par des liens d'affiliation (notamment Amazon). Lorsque
          vous achetez un produit via l'un de nos liens, nous percevons une petite commission, sans surcoût
          pour vous. Cela ne change jamais nos recommandations : nous conseillons ce qui nous paraît le plus
          pertinent. Pour en savoir plus, consultez notre{' '}
          <Link href="/politique-confidentialite">politique de confidentialité</Link>.
        </p>

        <h2>Une question ?</h2>
        <p>
          Nous sommes joignables via notre <Link href="/contact">page contact</Link>. Bonne lecture et bonne
          route !
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
