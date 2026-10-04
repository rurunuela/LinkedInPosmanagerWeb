import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { llmsFaq, llmsSummary } from "../lib/llms";

// Strips MDX imports/components and keeps the Markdown prose.
const toPlainMarkdown = (source: string) =>
  source
    .replace(/^import .*$/gm, "")
    .replace(/<(Screenshot|McpDemo)[^>]*\/>/g, "")
    .replace(/<\/?small>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

export const GET: APIRoute = async () => {
  const features = await getEntry("page", "fonctionnalites");
  const mcp = await getEntry("page", "mcp");

  const content = [
    llmsSummary(),
    "## Fonctionnalités détaillées",
    "",
    toPlainMarkdown(features?.body ?? ""),
    "",
    "## Serveur MCP (Claude)",
    "",
    toPlainMarkdown(mcp?.body ?? ""),
    "",
    "## FAQ",
    "",
    llmsFaq(),
  ].join("\n");

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
