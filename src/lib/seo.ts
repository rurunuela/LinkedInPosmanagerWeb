import siteConfig from "@config";

export interface Breadcrumb {
  name: string;
  href: string;
}

const siteUrl = siteConfig.url.replace(/\/$/, "");
/** Absolute URL with a trailing slash for pages (matches canonical URLs). */
export const absolute = (path: string) => {
  const url = new URL(path, `${siteUrl}/`);
  if (!/\.[a-z0-9]+$/i.test(url.pathname) && !url.pathname.endsWith("/")) {
    url.pathname += "/";
  }
  return url.href;
};

export const organizationId = `${siteConfig.publisher.url}/#organization`;
export const websiteId = `${siteUrl}/#website`;
export const softwareId = `${siteUrl}/#software`;

/** Key product facts, shared by JSON-LD, llms.txt and the home page. */
export const productFacts = {
  name: siteConfig.title,
  summary:
    "Application macOS native pour préparer, organiser, programmer et publier des contenus sur LinkedIn, avec un serveur MCP intégré pour la piloter depuis Claude.",
  platform: "macOS 14.6 ou ultérieur",
  status: "Bêta publique sur invitation via TestFlight",
  publisher: siteConfig.publisher.name,
  features: [
    "Éditeur de publications LinkedIn (3 000 caractères max, compteur, aperçu)",
    "Brouillon, programmation à la minute ou publication immédiate",
    "Image ou document PDF joint (un média par publication)",
    "Tags et filtres par statut : brouillon, planifié, publié, échec",
    "Vue Liste et vue Agenda mensuel avec chronologie horaire",
    "Publication automatique (mode serveur) avec espacement, tolérance de retard et rattrapage",
    "Synchronisation iCloud (CloudKit) des publications, tags et médias",
    "Accès depuis le Dock et la barre des menus de macOS",
    "Connexion via l’OAuth et l’API officiels de LinkedIn, identifiants dans le Trousseau macOS",
    "Serveur MCP (Model Context Protocol) intégré : Claude Desktop, Claude Code ou tout client MCP stdio peut consulter, créer, modifier et programmer les publications",
  ],
} as const;

export function baseGraph() {
  return [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.publisher.name,
      url: siteConfig.publisher.url,
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "La Chapelle-sur-Erdre",
        addressCountry: "FR",
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${siteUrl}/`,
      name: siteConfig.title,
      description: siteConfig.description,
      inLanguage: "fr-FR",
      publisher: { "@id": organizationId },
    },
  ];
}

export function softwareApplication() {
  return {
    "@type": "SoftwareApplication",
    "@id": softwareId,
    name: productFacts.name,
    description: productFacts.summary,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Gestion des réseaux sociaux",
    keywords:
      "LinkedIn, programmation de posts, calendrier éditorial, macOS, MCP, Model Context Protocol, Claude",
    operatingSystem: "macOS 14.6 ou ultérieur",
    softwareVersion: "Bêta",
    inLanguage: "fr-FR",
    url: `${siteUrl}/`,
    image: absolute("/og-image.png"),
    screenshot: absolute("/og-image.png"),
    featureList: productFacts.features.join(" ; "),
    installUrl: absolute("/beta"),
    publisher: { "@id": organizationId },
    author: { "@id": organizationId },
  };
}

export function breadcrumbList(items: Breadcrumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Accueil", href: "/" }, ...items].map(
      (item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absolute(item.href),
      }),
    ),
  };
}
