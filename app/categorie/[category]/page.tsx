import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticlesByCategory, CATEGORY_LABELS, type Category } from '@/lib/articles'

const SITE_URL = 'https://blog.wrapfinder.fr'

const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  'ppf-general':
    'Tous nos guides PPF pour débutants : comprendre le film de protection peinture, choisir son film, les prix et l’entretien au quotidien.',
  'ppf-specialise':
    'Guides PPF techniques et avancés : pose par zone, types de peinture, conditions extrêmes et cas particuliers.',
  'covering-general':
    'Tous nos guides covering pour débutants : choisir son film vinyle, les prix, la pose et l’entretien.',
  'covering-specialise':
    'Guides covering techniques : finitions spéciales, pose par zone, véhicules atypiques et cas avancés.',
  'adhesif-general':
    'Guides sur les adhésifs automobiles : choisir le bon adhésif, préparer les surfaces et réussir ses collages.',
  'adhesif-specialise':
    'Guides adhésifs techniques : colles structurelles, rubans VHB, primers et applications professionnelles.',
  'ppf-covering-compare':
    'Comparatifs PPF vs covering, comparatifs de marques et guides transverses pour faire le bon choix.',
}

type Props = {
  params: Promise<{ category: string }>
}

export function generateStaticParams() {
  return (Object.keys(CATEGORY_LABELS) as Category[]).map((category) => ({ category }))
}

function isCategory(value: string): value is Category {
  return value in CATEGORY_LABELS
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  if (!isCategory(category)) return {}
  const label = CATEGORY_LABELS[category]
  const description = CATEGORY_DESCRIPTIONS[category]
  return {
    title: `${label} — tous les guides`,
    description,
    alternates: {
      canonical: `/categorie/${category}`,
    },
    openGraph: {
      title: `${label} — tous les guides | WrapGuide`,
      description,
      type: 'website',
      url: `${SITE_URL}/categorie/${category}`,
      siteName: 'WrapGuide',
      locale: 'fr_FR',
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  if (!isCategory(category)) notFound()

  const articles = getArticlesByCategory(category)
  if (articles.length === 0) notFound()

  const label = CATEGORY_LABELS[category]

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${label} — WrapGuide`,
    url: `${SITE_URL}/categorie/${category}`,
    description: CATEGORY_DESCRIPTIONS[category],
    inLanguage: 'fr-FR',
    hasPart: articles.slice(0, 30).map((a) => ({
      '@type': 'Article',
      headline: a.title,
      url: `${SITE_URL}/${a.slug}`,
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: label, item: `${SITE_URL}/categorie/${category}` },
    ],
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-amber-500 transition-colors">
          Accueil
        </Link>
        <span className="mx-2">/</span>
        <span>{label}</span>
      </nav>

      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3 text-white">{label}</h1>
        <p className="text-zinc-400 max-w-2xl">{CATEGORY_DESCRIPTIONS[category]}</p>
        <p className="text-zinc-500 text-sm mt-2">{articles.length} guides</p>
      </section>

      <ul className="divide-y divide-zinc-800/60">
        {articles.map((article) => (
          <li key={article.slug} className="py-4">
            <Link href={`/${article.slug}`} className="group block">
              <time className="article-date text-xs mb-1 block">
                {new Date(article.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h2 className="article-title text-base font-medium transition-colors mb-1">
                {article.title}
              </h2>
              <p className="article-description text-sm leading-relaxed">{article.description}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Link href="/" className="text-sm text-zinc-400 hover:text-amber-500 transition-colors">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
