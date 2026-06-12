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
    <div className="-mx-6 -my-10 px-6 py-10 bg-[#1a1a1a] min-h-screen">
      <div className="max-w-[780px] mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-amber-500 transition-colors">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span>{CATEGORY_LABELS[article.category]}</span>
        </nav>

        {/* Article header */}
        <header className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            {CATEGORY_LABELS[article.category]}
          </span>
          <h1 className="text-3xl font-bold tracking-tight mt-2 mb-3 text-white">{article.title}</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-4">{article.description}</p>
          <time className="text-sm text-zinc-500">
            {new Date(article.date).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </header>

        {/* AdSense placeholder — avant le contenu */}
        <div className="mb-8 flex items-center justify-center bg-zinc-900 rounded h-24 text-xs text-zinc-600 uppercase tracking-widest border border-zinc-800">
          Espace publicitaire Google AdSense
        </div>

        {/* Article content */}
        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        {/* AdSense placeholder — après le contenu */}
        <div className="mt-10 flex items-center justify-center bg-zinc-900 rounded h-24 text-xs text-zinc-600 uppercase tracking-widest border border-zinc-800">
          Espace publicitaire Google AdSense
        </div>

        <div className="mt-8">
          <Link href="/" className="text-sm text-zinc-400 hover:text-amber-500 transition-colors">
            ← Retour aux articles
          </Link>
        </div>
      </div>
    </div>
  )
}
