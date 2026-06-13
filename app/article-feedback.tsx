'use client'

import { useState } from 'react'

type GtagWindow = Window & {
  gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void
}

export default function ArticleFeedback({ slug }: { slug: string }) {
  const [voted, setVoted] = useState<null | 'up' | 'down'>(null)

  function vote(value: 'up' | 'down') {
    if (voted) return
    setVoted(value)
    if (typeof window !== 'undefined') {
      const w = window as GtagWindow
      if (typeof w.gtag === 'function') {
        w.gtag('event', 'article_feedback', {
          article_slug: slug,
          feedback: value,
          value: value === 'up' ? 1 : 0,
        })
      }
    }
  }

  return (
    <section className="mt-12 border-t border-zinc-800 pt-8">
      {voted ? (
        <p className="text-zinc-300 text-center">
          Merci pour votre retour&nbsp;!{' '}
          {voted === 'down' && (
            <span className="text-zinc-500">
              N&apos;hésitez pas à nous écrire via la page contact pour nous dire ce qui manque.
            </span>
          )}
        </p>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-zinc-300 font-medium">Cet article vous a-t-il été utile&nbsp;?</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => vote('up')}
              aria-label="Oui, cet article m'a été utile"
              className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm text-zinc-200 transition-colors hover:border-amber-500 hover:text-amber-500"
            >
              <span aria-hidden>👍</span> Oui
            </button>
            <button
              type="button"
              onClick={() => vote('down')}
              aria-label="Non, cet article ne m'a pas été utile"
              className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm text-zinc-200 transition-colors hover:border-amber-500 hover:text-amber-500"
            >
              <span aria-hidden>👎</span> Non
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
