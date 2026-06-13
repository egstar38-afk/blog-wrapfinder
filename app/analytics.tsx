import Script from 'next/script'

/**
 * Google Analytics 4 — activé uniquement si la variable d'environnement
 * NEXT_PUBLIC_GA_ID est définie (ex. "G-XXXXXXXXXX").
 *
 * Pour l'activer :
 *   1. Crée une propriété GA4 sur https://analytics.google.com et récupère l'ID de mesure (G-...)
 *   2. Sur Vercel → Project Settings → Environment Variables, ajoute NEXT_PUBLIC_GA_ID = G-...
 *   3. Redéploie. Sans cette variable, ce composant ne charge rien.
 *
 * Remarque RGPD : GA4 dépose des cookies. Assure-toi que ton message de consentement
 * (CMP AdSense) couvre aussi la mesure d'audience pour les visiteurs de l'UE.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  if (!gaId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
