import { fileURLToPath } from 'node:url';
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

// basePath 置空，使用根路径部署
const basePath = '';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // 启用静态导出模式
  output: 'export',
  // GitHub Pages 子路径配置
  // 在静态导出模式下，basePath 会自动处理所有资源路径
  basePath,
  // 添加尾部斜杠，有助于静态文件生成
  trailingSlash: true,
  // 设置环境变量，供客户端使用
  // 若有需要，可恢复 basePath 并同步 env
  images: {
    // 静态导出模式下必须禁用图片优化
    unoptimized: true,
    // 正确写法（Next.js 15 最新要求）
    remotePatterns: [
      // 放开所有 https 图片（开发/文档站最方便）
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  turbopack: {
    // 显式设置项目根目录，避免因上级锁文件导致的根推断警告
    root: __dirname,
  },
};

export default withMDX(config);
