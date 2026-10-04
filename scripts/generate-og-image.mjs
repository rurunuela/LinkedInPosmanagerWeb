// Generates public/og-image.png (1200x630) used for social sharing previews.
// Run: node scripts/generate-og-image.mjs
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;

const background = Buffer.from(`
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1e3a8a"/>
      <stop offset="1" stop-color="#2563eb"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif" fill="#ffffff">
    <rect x="64" y="72" rx="16" width="250" height="36" fill="#ffffff" fill-opacity="0.15"/>
    <text x="84" y="97" font-size="18" font-weight="700" letter-spacing="1.5">BÊTA TESTFLIGHT</text>
    <text x="64" y="190" font-size="52" font-weight="800">LinkedinPostManager</text>
    <text x="64" y="258" font-size="30" font-weight="500" fill-opacity="0.92">Préparez, programmez et publiez</text>
    <text x="64" y="300" font-size="30" font-weight="500" fill-opacity="0.92">vos posts LinkedIn depuis votre Mac.</text>
    <text x="64" y="560" font-size="20" fill-opacity="0.75">App macOS native · Serveur MCP pour Claude · par Hubo Soft</text>
  </g>
</svg>`);

const screenshot = await sharp("src/assets/screenshots/agenda-publications-mock.png")
  .resize({ width: 560 })
  .toBuffer();

await sharp(background)
  .composite([{ input: screenshot, left: 600, top: 300 }])
  .png({ compressionLevel: 9 })
  .toFile("public/og-image.png");

console.log("public/og-image.png generated");
