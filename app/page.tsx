import Link from 'next/link'
import { getAllArticles, CATEGORY_LABELS, type Category } from '@/lib/articles'

const CATEGORIES: Category[] = ['ppf-general', 'ppf-specialise', 'adhesif-general', 'adhesif-specialise']

export default function HomePage() {
  const articles = getAllArticles()

  const byCategory = CATEGORIES.map((cat) => ({
    key: cat,
    label: CATEGORY_LABELS[cat],
    articles: articles.filter((a) => a.category === cat),
  })).filter((g) => g.articles.length > 0)

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Guides PPF &amp; Adhésifs Pro</h1>
        <p className="text-gray-600 max-w-2xl">
          Tout ce que vous devez savoir sur le Paint Protection Film et les adhésifs professionnels : choix, pose,
          entretien et comparatifs produits.
        </p>
      </section>

      {/* AdSense placeholder — en-tête */}
      <div className="mb-10 flex items-center justify-center bg-gray-100 rounded h-24 text-xs text-gray-400 uppercase tracking-widest">
        Espace publicitaire Google AdSense
      </div>

      {byCategory.map((group) => (
        <section key={group.key} className="mb-12">
          <h2 className="text-lg font-semibold uppercase tracking-widest text-gray-400 mb-5 pb-2 border-b border-gray-100">
            {group.label}
          </h2>
          <ul className="divide-y divide-gray-100">
            {group.articles.map((article) => (
              <li key={article.slug} className="py-5">
                <Link href={`/${article.slug}`} className="group block">
                  <time className="text-xs text-gray-400 mb-1 block">
                    {new Date(article.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <h3 className="text-lg font-medium group-hover:text-gray-500 transition-colors mb-1">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{article.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
