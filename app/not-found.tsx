import Link from 'next/link'

export default function NotFound() {
  const cats = [
    { href: '/categorie/ppf-general', label: 'Guides PPF' },
    { href: '/categorie/covering-general', label: 'Guides Covering' },
    { href: '/categorie/adhesif-general', label: 'Guides Adhésifs' },
    { href: '/categorie/ppf-covering-compare', label: 'Comparatifs' },
  ]
  return (
    <div className="max-w-[640px] mx-auto text-center py-16">
      <p className="text-6xl font-black text-amber-500 mb-4">404</p>
      <h1 className="text-2xl font-bold text-white mb-3">Page introuvable</h1>
      <p className="text-zinc-400 mb-8">
        Cette page n&apos;existe pas ou a été déplacée. Voici par où continuer :
      </p>
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {cats.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 hover:border-amber-500 hover:text-amber-500 transition-colors"
          >
            {c.label}
          </Link>
        ))}
      </div>
      <Link href="/" className="text-amber-500 font-semibold hover:underline">
        ← Retour à l&apos;accueil
      </Link>
    </div>
  )
}
