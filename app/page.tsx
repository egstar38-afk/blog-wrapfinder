import Link from 'next/link'
import { getAllArticles, CATEGORY_LABELS, type Category } from '@/lib/articles'

const SECTION_GROUPS = [
  {
    id: 'ppf',
    title: 'PPF — Paint Protection Film',
    categories: ['ppf-general', 'ppf-specialise'] as Category[],
  },
  {
    id: 'covering',
    title: 'Covering',
    categories: ['covering-general', 'covering-specialise'] as Category[],
  },
  {
    id: 'adhesifs',
    title: 'Adhésifs',
    categories: ['adhesif-general', 'adhesif-specialise'] as Category[],
  },
  {
    id: 'comparatifs',
    title: 'Comparatifs & Guides',
    categories: ['ppf-covering-compare'] as Category[],
  },
]

export default function HomePage() {
  const articles = getAllArticles()

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3 text-white">
          Guides PPF, Covering &amp; Adhésifs
        </h1>
        <p className="text-zinc-400 max-w-2xl">
          Tout ce que vous devez savoir sur le Paint Protection Film, le covering automobile et les adhésifs
          professionnels : choix, pose, entretien et comparatifs produits.
        </p>
      </section>

      {/* AdSense placeholder */}
      <div className="mb-10 flex items-center justify-center bg-zinc-900 rounded h-24 text-xs text-zinc-600 uppercase tracking-widest border border-zinc-800">
        Espace publicitaire Google AdSense
      </div>

      {SECTION_GROUPS.map((section) => {
        const sectionArticles = section.categories.flatMap((cat) =>
          articles.filter((a) => a.category === cat)
        )
        if (sectionArticles.length === 0) return null

        const byCategory = section.categories
          .map((cat) => ({
            key: cat,
            label: CATEGORY_LABELS[cat],
            articles: articles.filter((a) => a.category === cat),
          }))
          .filter((g) => g.articles.length > 0)

        return (
          <section key={section.id} id={section.id} className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-7 bg-amber-500 rounded-full" />
              <h2 className="text-xl font-bold text-white tracking-tight">{section.title}</h2>
            </div>

            {byCategory.map((group) => (
              <div key={group.key} className="mb-8">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4 pb-2 border-b border-zinc-800">
                  {group.label}
                </h3>
                <ul className="divide-y divide-zinc-800">
                  {group.articles.map((article) => (
                    <li key={article.slug} className="py-4">
                      <Link href={`/${article.slug}`} className="group block">
                        <time className="text-xs text-zinc-600 mb-1 block">
                          {new Date(article.date).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                        <h4 className="text-base font-medium text-zinc-100 group-hover:text-amber-400 transition-colors mb-1">
                          {article.title}
                        </h4>
                        <p className="text-zinc-500 text-sm leading-relaxed">{article.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )
      })}
    </div>
  )
}
