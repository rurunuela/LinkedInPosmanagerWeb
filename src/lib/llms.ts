import siteConfig from "@config";
import { faqGroups } from "../data/faq";
import { absolute, productFacts } from "./seo";

const siteUrl = siteConfig.url.replace(/\/$/, "");

const stripHtml = (html: string) =>
  html
    .replace(/<a href="([^"]+)">([^<]+)<\/a>/g, (_, href: string, text: string) =>
      `[${text}](${href.startsWith("/") ? absolute(href) : href})`,
    )
    .replace(/<strong>([^<]+)<\/strong>/g, "**$1**")
    .replace(/<[^>]+>/g, "")
    .replace(/&gt;/g, ">");

export function llmsSummary(): string {
  return [
    `# ${productFacts.name}`,
    "",
    `> ${productFacts.summary} Plateforme : ${productFacts.platform}. Statut : ${productFacts.status}. Édité par ${productFacts.publisher} (France).`,
    "",
    "LinkedinPostManager se connecte à LinkedIn uniquement via l’OAuth et l’API officiels, sans automatisation de navigateur ni extraction de pages. Les identifiants sont stockés dans le Trousseau macOS et les publications dans la base iCloud privée de l’utilisateur.",
    "",
    "Un serveur MCP (Model Context Protocol) est intégré : un assistant comme Claude Desktop ou Claude Code peut consulter le calendrier éditorial, créer des brouillons et programmer des posts. La publication reste effectuée par le scheduler de l’application, jamais directement par l’assistant.",
    "",
    "## Pages principales",
    "",
    `- [Accueil](${absolute("/")}) : présentation de l’application`,
    `- [Fonctionnalités](${absolute("/fonctionnalites")}) : description détaillée (édition, agenda, publication automatique, iCloud)`,
    `- [Claude et MCP](${absolute("/mcp")}) : serveur MCP intégré, outils, configuration et garde-fous`,
    `- [FAQ](${absolute("/faq")}) : questions fréquentes (TestFlight, prérequis, API LinkedIn, automatisation)`,
    `- [Rejoindre la bêta](${absolute("/beta")}) : formulaire de demande d’accès TestFlight`,
    `- [Notes de version](${absolute("/journal")}) : nouveautés de chaque build`,
    "",
    "## Fonctionnalités clés",
    "",
    ...productFacts.features.map((feature) => `- ${feature}`),
    "",
    "## Optional",
    "",
    `- [Version complète pour LLM](${siteUrl}/llms-full.txt) : fonctionnalités et FAQ en texte intégral`,
    `- [Confidentialité](${absolute("/confidentialite")})`,
    `- [Mentions légales](${absolute("/mentions-legales")})`,
    `- [Hubo Soft](${siteConfig.publisher.url}) : éditeur`,
    "",
  ].join("\n");
}

export function llmsFaq(): string {
  return faqGroups
    .map((group) =>
      [
        `### ${group.title}`,
        "",
        ...group.items.flatMap((item) => [
          `**${item.question}**`,
          "",
          stripHtml(item.answer),
          "",
        ]),
      ].join("\n"),
    )
    .join("\n");
}
