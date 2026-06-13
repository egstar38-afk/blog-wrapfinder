# Guide WrapGuide — Indexation & Analytics

Mémo des actions à faire côté Google. Tout le reste (SEO technique, pages légales, photos, maillage interne) est déjà en place dans le code.

---

## 1. Articles à demander en indexation (Search Console)

Dans **Google Search Console** → barre **« Inspection d'URL »** en haut → colle l'URL → **« Demander l'indexation »**.
Limite ~10 demandes/jour, donc étale sur 2 jours.

### Jour 1 — piliers + pages « prix »
| URL | Pourquoi |
|---|---|
| https://blog.wrapfinder.fr/prix-ppf-2024-guide-complet | « prix PPF » — gros volume + intention d'achat |
| https://blog.wrapfinder.fr/prix-covering-2024-guide-complet | « prix covering » — très recherché |
| https://blog.wrapfinder.fr/ppf-vs-covering-lequel-choisir | « PPF ou covering » — requête phare, page pilier |
| https://blog.wrapfinder.fr/introduction-ppf | « c'est quoi le PPF » — gros volume informationnel |
| https://blog.wrapfinder.fr/introduction-covering-vehicule | « covering voiture » — entrée de funnel, illustrée |
| https://blog.wrapfinder.fr/meilleure-marque-ppf-comparatif | « meilleur PPF » — comparatif, intention d'achat |

### Jour 2 — comparatifs, FAQ, fortes requêtes
| URL | Pourquoi |
|---|---|
| https://blog.wrapfinder.fr/duree-de-vie-ppf | « durée de vie PPF » — très recherché |
| https://blog.wrapfinder.fr/combien-coute-covering-complet | « covering complet prix » — intention forte |
| https://blog.wrapfinder.fr/ppf-vs-protection-ceramique | comparatif populaire, peu de bons résultats FR |
| https://blog.wrapfinder.fr/faq-ppf-covering-100-questions | balisage FAQ — potentiel rich result |
| https://blog.wrapfinder.fr/peut-on-poser-ppf-soi-meme | « poser PPF soi-même » — requête DIY massive |
| https://blog.wrapfinder.fr/covering-legal-en-france | « covering légal » — peu concurrencé |

### À soumettre aussi
- https://blog.wrapfinder.fr (accueil)
- https://blog.wrapfinder.fr/categorie/ppf-general
- https://blog.wrapfinder.fr/categorie/covering-general

> Ces pages contiennent des liens internes : une fois indexées, Google suivra ces liens
> et découvrira le reste des ~190 articles tout seul. Pas besoin de tout soumettre à la main.

---

## 2. Google Analytics 4 (GA4) — DÉJÀ ACTIVÉ

Propriété GA4 créée, ID de mesure **`G-C9KMK8PY3W`** branché directement dans le code
(`app/analytics.tsx`). Rien d'autre à faire côté technique.

### Vérifier que ça marche
1. Ouvrir https://blog.wrapfinder.fr
2. GA4 → **Rapports → Temps réel** : tu dois te voir comme 1 utilisateur actif.

> Si un jour tu veux changer d'ID, soit modifier `DEFAULT_GA_ID` dans `app/analytics.tsx`,
> soit définir la variable d'environnement `NEXT_PUBLIC_GA_ID` sur Vercel (elle a la priorité).

### Bonus — votes du widget « article utile ? »
- Les clics 👍/👎 remontent comme événement **`article_feedback`**
  (paramètres : `article_slug`, `feedback` = up/down).
- Visible dans GA4 → **Rapports → Engagement → Événements** (après quelques heures de trafic).

---

## 3. Rappels conformité / AdSense
- Pages légales en place : `/mentions-legales`, `/politique-confidentialite`, `/a-propos`, `/contact`.
- GA4 dépose des cookies → le bandeau de consentement AdSense (CMP) doit être actif pour les visiteurs UE.
- Une fois les pages légales + le contenu en ligne, l'approbation AdSense a de meilleures chances d'aboutir.

---

## 4. En suspens (optionnel)
- Photo **Skoda Enyaq** (semi-covering pub) : pas encore d'article attitré.
- Continuer à illustrer les articles qui rankent (≈130 photos perso encore disponibles).
- Remplacer les liens Amazon génériques par de vrais ASINs sur les articles qui rankent (voir Search Console).
