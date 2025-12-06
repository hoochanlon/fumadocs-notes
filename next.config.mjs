import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

// GitHub Pages 子路径配置（仅在构建时使用）
const basePath = process.env.NODE_ENV === 'production' ? '/fumadocs-notes' : '';

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
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default withMDX(config);
