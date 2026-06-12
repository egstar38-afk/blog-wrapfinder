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
    contentHtml: processed.toString(),
  }
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}
