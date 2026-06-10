import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllSlugs, CATEGORY_LABELS } from '@/lib/articles'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const article = await getArticleBySlug(slug)
    return {
      title: article.title,
      description: article.description,
      openGraph: {
        title: article.title,
        description: article.description,
        type: 'article',
        publishedTime: article.date,
      },
    }
  } catch {
    return {}
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params

  let article
  try {
    article = await getArticleBySlug(slug)
  } catch {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">
          Accueil
        </Link>
        <span className="mx-2">/</span>
        <span>{CATEGORY_LABELS[article.category]}</span>
      </nav>

      {/* Article header */}
      <header className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          {CATEGORY_LABELS[article.category]}
        </span>
        <h1 className="text-3xl font-bold tracking-tight mt-2 mb-3">{article.title}</h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-4">{article.description}</p>
        <time className="text-sm text-gray-400">
          {new Date(article.date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </header>

      {/* AdSense placeholder — avant le contenu */}
      <div className="mb-8 flex items-center justify-center bg-gray-100 rounded h-24 text-xs text-gray-400 uppercase tracking-widest">
        Espace publicitaire Google AdSense
      </div>

      {/* Article content */}
      <article
        className="prose prose-gray max-w-none prose-headings:font-semibold prose-a:text-gray-900 prose-a:underline"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      {/* Amazon affiliate placeholder */}
      <aside className="mt-12 p-6 border border-gray-200 rounded-lg">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Produit recommandé</p>
        <p className="font-medium mb-4">Découvrez les meilleurs produits PPF &amp; adhésifs sur Amazon</p>
        <a
          href="https://www.amazon.fr/s?k=ppf+paint+protection+film&tag=VOTRE-TAG-21"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-block bg-gray-900 text-white text-sm px-5 py-2.5 rounded hover:bg-gray-700 transition-colors"
        >
          Voir sur Amazon →
        </a>
        <p className="text-xs text-gray-400 mt-3">
          Lien affilié — en achetant via ce lien vous soutenez le blog sans surcoût.
        </p>
      </aside>

      {/* AdSense placeholder — après le contenu */}
      <div className="mt-10 flex items-center justify-center bg-gray-100 rounded h-24 text-xs text-gray-400 uppercase tracking-widest">
        Espace publicitaire Google AdSense
      </div>

      <div className="mt-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          ← Retour aux articles
        </Link>
      </div>
    </div>
  )
}
