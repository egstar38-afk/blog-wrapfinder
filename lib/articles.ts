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
  updated?: string
  slug: string
}

export interface TocItem {
  id: string
  text: string
}

export interface ArticleWithContent extends ArticleMeta {
  contentHtml: string
  toc: TocItem[]
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
        updated: (data.updated as string) || undefined,
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
 * Les liens vers la plateforme www.wrapfinder.fr restent en dofollow (maillage
 * blog → marketplace) mais s'ouvrent aussi dans un nouvel onglet.
 */
function decorateExternalLinks(html: string): string {
  return html.replace(/<a href="(https?:\/\/[^"]+)"/g, (match, url: string) => {
    if (url.includes('blog.wrapfinder.fr')) return match
    if (url.includes('wrapfinder.fr')) return `<a href="${url}" rel="noopener" target="_blank"`
    const rel = url.includes('amazon.') ? 'sponsored nofollow noopener' : 'nofollow noopener'
    return `<a href="${url}" rel="${rel}" target="_blank"`
  })
}

/** Ajoute le lazy-loading et le décodage asynchrone aux images du contenu (perf / SEO). */
function decorateImages(html: string): string {
  return html.replace(/<img /g, '<img loading="lazy" decoding="async" ')
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/** Ajoute un id à chaque <h2> et retourne le sommaire (texte + ancre) pour la table des matières. */
function addHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = []
  const used = new Set<string>()
  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_m, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').trim()
    let id = slugifyHeading(text) || 'section'
    let n = 2
    while (used.has(id)) id = `${slugifyHeading(text)}-${n++}`
    used.add(id)
    toc.push({ id, text })
    return `<h2 id="${id}">${inner}</h2>`
  })
  return { html: out, toc }
}

export async function getArticleBySlug(slug: string): Promise<ArticleWithContent> {
  const fullPath = path.join(articlesDir, `${slug}.md`)
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content)
  const { html, toc } = addHeadingIds(decorateImages(decorateExternalLinks(processed.toString())))
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    category: data.category as Category,
    date: data.date as string,
    updated: (data.updated as string) || undefined,
    toc,
    contentHtml: html,
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

export interface FaqItem {
  question: string
  answer: string
}

/**
 * Extrait les paires question/réponse d'un article marqué `faq: true` en frontmatter.
 * Format attendu : une ligne `**Question ?**` suivie de la réponse (lignes jusqu'au saut).
 * Retourne [] pour les articles non-FAQ (aucun balisage généré).
 */
export function getFaqItems(slug: string): FaqItem[] {
  const fullPath = path.join(articlesDir, `${slug}.md`)
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)
  if (data.faq !== true) return []

  const items: FaqItem[] = []
  const lines = content.split(/\r?\n/)
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\*\*(.+\?)\*\*\s*$/)
    if (!m) continue
    const answerLines: string[] = []
    for (let j = i + 1; j < lines.length; j++) {
      const l = lines[j].trim()
      if (l === '' || l.startsWith('#') || /^\*\*.+\?\*\*$/.test(l)) break
      answerLines.push(l)
    }
    const answer = answerLines.join(' ').trim()
    if (answer) items.push({ question: m[1].trim(), answer })
  }
  return items
}

export const WRAPFINDER_URL = 'https://www.wrapfinder.fr'

/** Fragment de CTA : texte brut ou lien vers un hub prestation de la plateforme. */
export type CtaPart = string | { href: string; anchor: string }

const hub = (path: string, anchor: string): CtaPart => ({
  href: `${WRAPFINDER_URL}${path}`,
  anchor,
})

/** Articles dont le sujet correspond à un hub plus précis que leur catégorie. */
const SLUG_CTA_OVERRIDES: Record<string, CtaPart[]> = {
  'ppf-pour-moto': [
    'Comparez les ',
    hub('/covering-moto', 'poseurs spécialisés covering et PPF moto'),
    ' près de chez vous sur WrapFinder et recevez gratuitement plusieurs devis.',
  ],
  'covering-moto': [
    'Comparez les ',
    hub('/covering-moto', 'poseurs spécialisés covering moto'),
    ' près de chez vous sur WrapFinder et recevez gratuitement plusieurs devis.',
  ],
  'difference-ppf-film-solaire': [
    'Comparez les ',
    hub('/ppf', 'poseurs de PPF'),
    ' et les ',
    hub('/film-solaire', 'poseurs de film solaire auto'),
    ' près de chez vous sur WrapFinder et recevez gratuitement plusieurs devis.',
  ],
  'covering-camion-utilitaire-commercial': [
    'Comparez les ',
    hub('/marquage-vehicule', 'spécialistes du marquage et covering utilitaire'),
    ' près de chez vous sur WrapFinder et recevez gratuitement plusieurs devis.',
  ],
}

/**
 * CTA de fin d'article vers le hub prestation WrapFinder correspondant au sujet
 * (maillage blog → marketplace avec ancres optimisées). Null pour les articles
 * adhésifs purs (pas de prestation associée sur la plateforme).
 */
export function getWrapfinderCta(slug: string, category: Category): CtaPart[] | null {
  if (category.startsWith('adhesif')) return null
  const override = SLUG_CTA_OVERRIDES[slug]
  if (override) return override
  if (category === 'ppf-covering-compare') {
    return [
      'Comparez les ',
      hub('/ppf', 'poseurs de PPF'),
      ' et les ',
      hub('/covering', 'poseurs de covering'),
      ' certifiés près de chez vous sur WrapFinder et recevez gratuitement plusieurs devis.',
    ]
  }
  if (category.startsWith('ppf')) {
    return [
      'Comparez les ',
      hub('/ppf', 'poseurs de PPF certifiés près de chez vous'),
      ' sur WrapFinder et recevez gratuitement plusieurs devis pour protéger votre véhicule.',
    ]
  }
  return [
    'Comparez les ',
    hub('/covering', 'poseurs de covering certifiés près de chez vous'),
    ' sur WrapFinder et recevez gratuitement plusieurs devis pour votre projet.',
  ]
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}
