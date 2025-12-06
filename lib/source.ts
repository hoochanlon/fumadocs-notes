import { docs } from 'fumadocs-mdx:collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';

// GitHub Pages 子路径配置（仅在构建时使用）
const basePath = process.env.NODE_ENV === 'production' ? '/fumadocs-notes' : '';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: `${basePath}/docs`,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];
  const basePath = process.env.NODE_ENV === 'production' ? '/fumadocs-notes' : '';

  return {
    segments,
    url: `${basePath}/og/docs/${segments.join('/')}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title}

${processed}`;
}
