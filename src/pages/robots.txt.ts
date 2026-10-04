import type { APIRoute } from "astro";

// AI and answer-engine crawlers explicitly welcomed (GEO).
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "MistralAI-User",
];

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = site ? new URL("sitemap-index.xml", site).href : null;

  const content = [
    "User-agent: *",
    "Allow: /",
    "",
    ...aiCrawlers.flatMap((agent) => [`User-agent: ${agent}`, "Allow: /", ""]),
    ...(sitemapURL ? [`Sitemap: ${sitemapURL}`] : []),
  ].join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
};
