import { ImageResponse } from 'next/og'
import { getArticleBySlug, getAllSlugs, CATEGORY_LABELS } from '@/lib/articles'

export const alt = 'WrapGuide'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let title = 'WrapGuide — PPF, Covering & Adhésifs Auto'
  let category = ''
  try {
    const article = await getArticleBySlug(slug)
    title = article.title
    category = CATEGORY_LABELS[article.category]
  } catch {
    // image générique si l'article n'existe pas
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#141414',
          padding: 72,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              backgroundColor: '#f59e0b',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              fontWeight: 900,
              color: '#000000',
            }}
          >
            W
          </div>
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 700 }}>
            <span style={{ color: '#ffffff' }}>Wrap</span>
            <span style={{ color: '#f59e0b' }}>Guide</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {category && (
            <div
              style={{
                fontSize: 24,
                color: '#f59e0b',
                textTransform: 'uppercase',
                letterSpacing: 4,
                marginBottom: 20,
              }}
            >
              {category}
            </div>
          )}
          <div
            style={{
              fontSize: title.length > 70 ? 44 : 54,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.25,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ fontSize: 24, color: '#737373' }}>blog.wrapfinder.fr</div>
      </div>
    ),
    { ...size }
  )
}
