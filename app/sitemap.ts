import { getAllArticles } from '@/lib/articles'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()

  const articleUrls = articles.map((article) => ({
    url: `https://blog.wrapfinder.fr/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://blog.wrapfinder.fr',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...articleUrls,
  ]
}
