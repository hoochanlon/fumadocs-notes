import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { remarkImage } from 'fumadocs-core/mdx-plugins';

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true,
      extractLinkReferences: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [
      remarkMath,
      [
        remarkImage,
        {
          // 禁用远程图片尺寸获取，允许无限制使用 ![](url) 语法
          external: false,
          // 如果获取图片尺寸失败，忽略错误而不是抛出异常
          onError: 'ignore',
        },
      ],
    ],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});
