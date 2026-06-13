import { getAllArticles, CATEGORY_LABELS } from '@/lib/articles'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()

  const categoryUrls = Object.keys(CATEGORY_LABELS).map((category) => ({
    url: `https://blog.wrapfinder.fr/categorie/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const now = new Date()
  const articleUrls = articles.map((article) => {
    const date = new Date(article.date)
    return {
      url: `https://blog.wrapfinder.fr/${article.slug}`,
      // une date future dans le sitemap est invalide pour Google
      lastModified: date > now ? now : date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  })

  return [
    {
      url: 'https://blog.wrapfinder.fr',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: 'https://blog.wrapfinder.fr/a-propos',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: 'https://blog.wrapfinder.fr/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
    ...categoryUrls,
    ...articleUrls,
  ]
}
