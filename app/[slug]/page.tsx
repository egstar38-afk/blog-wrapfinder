import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllSlugs, getRelatedArticles, getFaqItems, CATEGORY_LABELS } from '@/lib/articles'

const SITE_URL = 'https://blog.wrapfinder.fr'

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
      alternates: {
        canonical: `/${slug}`,
      },
      openGraph: {
        title: article.title,
        description: article.description,
        type: 'article',
        url: `${SITE_URL}/${slug}`,
        siteName: 'WrapGuide',
        locale: 'fr_FR',
        publishedTime: article.date,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.description,
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

  const related = getRelatedArticles(article.slug, article.category)
  const faqItems = getFaqItems(article.slug)

  const faqJsonLd =
    faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((it) => ({
            '@type': 'Question',
            name: it.question,
            acceptedAnswer: { '@type': 'Answer', text: it.answer },
          })),
        }
      : null

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: 'fr-FR',
    mainEntityOfPage: `${SITE_URL}/${article.slug}`,
    author: {
      '@type': 'Organization',
      name: 'WrapGuide',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'WrapGuide',
      url: SITE_URL,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: CATEGORY_LABELS[article.category],
        item: `${SITE_URL}/categorie/${article.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `${SITE_URL}/${article.slug}`,
      },
    ],
  }

  return (
    <div className="max-w-[780px] mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Breadcrumb */}
      <nav className="text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-amber-500 transition-colors">
          Accueil
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/categorie/${article.category}`}
          className="hover:text-amber-500 transition-colors"
        >
          {CATEGORY_LABELS[article.category]}
        </Link>
      </nav>

      {/* Article header */}
      <header className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
          {CATEGORY_LABELS[article.category]}
        </span>
        <h1 className="text-3xl font-bold tracking-tight mt-2 mb-3 text-white">{article.title}</h1>
        <p className="text-zinc-400 text-lg leading-relaxed mb-4">{article.description}</p>
        <time dateTime={article.date} className="text-sm text-zinc-500">
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

      {/* Maillage interne — articles liés */}
      {related.length > 0 && (
        <section className="mt-12 border-t border-zinc-800 pt-8">
          <h2 className="text-xl font-bold text-white mb-6 border-l-4 border-amber-500 pl-4">
            À lire aussi
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {related.map((rel) => (
              <li key={rel.slug} className="rounded border border-zinc-800 bg-zinc-900/50 p-4 hover:border-amber-500/50 transition-colors">
                <Link href={`/${rel.slug}`} className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-amber-500/80 block mb-1">
                    {CATEGORY_LABELS[rel.category]}
                  </span>
                  <span className="text-sm font-medium text-zinc-200 hover:text-amber-500 transition-colors">
                    {rel.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-8">
        <Link href="/" className="text-sm text-zinc-400 hover:text-amber-500 transition-colors">
          ← Retour aux articles
        </Link>
      </div>
    </div>
  )
}
