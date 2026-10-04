# LinkedinPostManager — site web

Site vitrine de **LinkedinPostManager** (app macOS de programmation de posts LinkedIn) avec une page de demande d'accès à la bêta TestFlight. Basé sur le thème Astro [Mare Blog](https://github.com/Niceeepoiu/mare-blog), édité par Hubo Soft.

## Pages

| URL | Contenu |
| --- | --- |
| `/` | Landing produit (`src/pages/index.astro`) |
| `/fonctionnalites` | Tour complet (`src/content/page/fonctionnalites.mdx`) |
| `/beta` | Formulaire de demande TestFlight (`src/pages/beta.astro` + `src/components/BetaForm.astro`) |
| `/faq` | Questions fréquentes (`src/data/faq.ts` → `src/pages/faq.astro`, avec données structurées FAQPage) |
| `/journal` | Notes de version (`src/content/journal/`) — un fichier `.md` par build TestFlight |
| `/confidentialite`, `/mentions-legales` | Pages légales (`src/content/page/`) |

La configuration générale (titre, menu, email, URL) est dans `site.config.ts`.

## Captures d'écran

Les captures sont dans `src/assets/screenshots/` (copiées depuis la doc de l'app) et s'affichent via `src/components/Screenshot.astro` (cadre dégradé, largeur maîtrisée, zoom au clic). `vue-liste-recadree.png` est un recadrage de `vue-principale-publications.png` qui retire la colonne de détail vide et le titre de la fenêtre.

## SEO et GEO

- **Meta** (`src/layouts/BaseLayout.astro`) : canonical, robots (`noindex` sur 404 et pages légales), Open Graph / Twitter avec `public/og-image.png`.
- **Données structurées** (`src/lib/seo.ts`) : Organization + WebSite sur toutes les pages, SoftwareApplication sur l'accueil, BreadcrumbList sur les pages internes, FAQPage sur `/faq`.
- **Sitemap** : pages légales exclues. **robots.txt** : crawlers IA explicitement autorisés (GPTBot, ClaudeBot, PerplexityBot…).
- **GEO** : `/llms.txt` (résumé) et `/llms-full.txt` (fonctionnalités + FAQ en texte intégral), générés à partir de `src/lib/seo.ts`, `src/data/faq.ts` et de la page Fonctionnalités : ils restent à jour automatiquement. Bloc « LinkedinPostManager en bref » sur l'accueil (faits clés citables).
- **Image de partage** : régénérer avec `node scripts/generate-og-image.mjs` après un changement de capture.

## Captures : mise à jour

Copier les PNG de `Tools/LinkedinPostManager/documentation/screenshots/` dans `src/assets/screenshots/`, puis refaire les recadrages : `vue-liste-recadree.png` (996 px de large depuis la gauche, sans la colonne de détail vide), bas de page vide retiré sur `reglages-integration-macos.png` et `apercu-publication-avec-image.png`.

## Développement

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # build + index de recherche Pagefind
npm run preview
```

## Formulaire bêta

Même architecture que le formulaire de contact Hubo Soft :

1. le formulaire (nom, email Apple ID, message facultatif, consentement) poste un `FormData` vers un Worker Cloudflare ;
2. le Worker (`workers/beta-mailer`) vérifie les champs, le honeypot et le token Turnstile ;
3. il envoie un email à `BETA_RECIPIENT` via Email Routing ;
4. tu ajoutes le testeur dans App Store Connect > TestFlight (validation manuelle).

### Mise en place

```bash
cd workers/beta-mailer
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler deploy
```

Puis côté site (Cloudflare Pages ou `.env`, voir `.env.example`) :

```env
PUBLIC_BETA_FORM_ENDPOINT=https://linkedinpostmanager-beta-mailer.<compte>.workers.dev
PUBLIC_TURNSTILE_SITE_KEY=0x4AAAA...
```

Penser à ajouter le domaine du site dans `ALLOWED_ORIGINS` (`workers/beta-mailer/wrangler.toml`) et dans les domaines autorisés du widget Turnstile. Tant que `PUBLIC_BETA_FORM_ENDPOINT` est vide, le formulaire affiche un message invitant à écrire à l'adresse de contact.
