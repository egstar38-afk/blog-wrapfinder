import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

const articlesDir = path.join(process.cwd(), 'content/articles')

export type Category =
  | 'ppf-general'
  | 'ppf-specialise'
  | 'adhesif-general'
  | 'adhesif-specialise'
  | 'covering-general'
  | 'covering-specialise'
  | 'ppf-covering-compare'

export const CATEGORY_LABELS: Record<Category, string> = {
  'ppf-general': 'PPF Général',
  'ppf-specialise': 'PPF Spécialisé',
  'adhesif-general': 'Adhésif Général',
  'adhesif-specialise': 'Adhésif Spécialisé',
  'covering-general': 'Covering Général',
  'covering-specialise': 'Covering Spécialisé',
  'ppf-covering-compare': 'PPF vs Covering',
}

export interface ArticleMeta {
  title: string
  description: string
  category: Category
  date: string
  slug: string
}

export interface ArticleWithContent extends ArticleMeta {
  contentHtml: string
}

export function getAllArticles(): ArticleMeta[] {
  const filenames = fs.readdirSync(articlesDir)
  return filenames
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '')
      const fullPath = path.join(articlesDir, filename)
      const raw = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        category: data.category as Category,
        date: data.date as string,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getArticlesByCategory(category: Category): ArticleMeta[] {
  return getAllArticles().filter((a) => a.category === category)
}

/**
 * Les liens affiliés Amazon doivent porter rel="sponsored" (consigne Google),
 * les autres liens externes rel="noopener". Tous s'ouvrent dans un nouvel onglet.
 */
function decorateExternalLinks(html: string): string {
  return html.replace(/<a href="(https?:\/\/[^"]+)"/g, (match, url: string) => {
    if (url.includes('blog.wrapfinder.fr')) return match
    const rel = url.includes('amazon.') ? 'sponsored nofollow noopener' : 'nofollow noopener'
    return `<a href="${url}" rel="${rel}" target="_blank"`
  })
}

export async function getArticleBySlug(slug: string): Promise<ArticleWithContent> {
  const fullPath = path.join(articlesDir, `${slug}.md`)
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content)
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    category: data.category as Category,
    date: data.date as string,
    contentHtml: decorateExternalLinks(processed.toString()),
  }
}

/**
 * Articles liés pour le maillage interne : même catégorie d'abord,
 * complétés par la catégorie "sœur" (général <-> spécialisé) puis le reste.
 */
export function getRelatedArticles(slug: string, category: Category, count = 6): ArticleMeta[] {
  const all = getAllArticles().filter((a) => a.slug !== slug)
  const family = category.split('-')[0]
  const sameCategory = all.filter((a) => a.category === category)
  const sameFamily = all.filter((a) => a.category !== category && a.category.startsWith(family))
  const others = all.filter((a) => !a.category.startsWith(family))

  // Sélection déterministe mais variée d'un article à l'autre : fenêtre
  // glissante dont le point de départ dépend du slug
  const seed = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const pick = (pool: ArticleMeta[], n: number) => {
    if (pool.length === 0 || n <= 0) return []
    const start = seed % pool.length
    const result: ArticleMeta[] = []
    for (let k = 0; k < Math.min(n, pool.length); k++) {
      result.push(pool[(start + k) % pool.length])
    }
    return result
  }

  const related = pick(sameCategory, count)
  if (related.length < count) related.push(...pick(sameFamily, count - related.length))
  if (related.length < count) related.push(...pick(others, count - related.length))
  return related
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}
