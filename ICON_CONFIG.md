# 网站图标配置说明

## 概述

本文档说明如何在 Next.js 静态导出模式下配置网站图标（Favicon），特别是针对部署在 GitHub Pages 子路径下的情况。

## 配置原理

### 为什么需要特殊配置？

1. **静态导出模式限制**：在 `output: 'export'` 模式下，Next.js 不会自动处理 `app/icon.svg` 文件
2. **GitHub Pages 子路径**：网站部署在 `/fumadocs-notes` 子路径下，所有资源路径都需要包含 `basePath`
3. **环境差异**：开发环境和生产环境的路径不同

## 配置步骤

### 1. 准备图标文件

将 SVG 图标文件放在 `public` 目录下：

```
public/
  └── icon.svg
```

**注意**：虽然 `app/icon.svg` 在 Next.js 中会被自动识别，但在静态导出模式下不会自动处理，所以需要手动复制到 `public` 目录。

### 2. 配置 Next.js (next.config.mjs)

在 `next.config.mjs` 中配置 `basePath` 和环境变量：

```javascript
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
  basePath,
  // 添加尾部斜杠，有助于静态文件生成
  trailingSlash: true,
  // 设置环境变量，供客户端使用
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // ... 其他配置
};

export default withMDX(config);
```

**关键点**：
- `basePath` 在生产环境为 `/fumadocs-notes`，开发环境为空字符串
- `NEXT_PUBLIC_BASE_PATH` 环境变量用于在客户端代码中访问 `basePath`

### 3. 配置 Metadata (app/layout.tsx)

在根布局文件中配置图标 metadata：

```typescript
import type { Metadata } from 'next';

// 获取 basePath，确保图标路径正确
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const metadataBase = process.env.NODE_ENV === 'production' 
  ? new URL(`https://blog.hoochanlon.moe${basePath}`)
  : new URL('http://localhost:3000');

export const metadata: Metadata = {
  metadataBase,
  // 在静态导出模式下，使用 public 目录中的图标
  icons: {
    icon: `${basePath}/icon.svg`,
    shortcut: `${basePath}/icon.svg`,
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        {/* ... */}
      </body>
    </html>
  );
}
```

**关键点**：
- 使用 `${basePath}/icon.svg` 确保路径包含子路径前缀
- `metadataBase` 用于解析绝对 URL（如 Open Graph 图片）

## basePath 详解

### basePath 的值

| 环境 | basePath 值 | 图标路径 | 完整 URL |
|------|------------|---------|----------|
| 开发环境 (`pnpm dev`) | `''` (空字符串) | `/icon.svg` | `http://localhost:3000/icon.svg` |
| 生产环境 (`pnpm build`) | `'/fumadocs-notes'` | `/fumadocs-notes/icon.svg` | `https://blog.hoochanlon.moe/fumadocs-notes/icon.svg` |

### 为什么需要 basePath？

GitHub Pages 部署在子路径下：
- 仓库名：`fumadocs-notes`
- 完整 URL：`https://blog.hoochanlon.moe/fumadocs-notes/`
- 所有资源路径都需要加上 `/fumadocs-notes` 前缀

## 文件结构

```
fumadocs-notes/
├── app/
│   ├── icon.svg          # 原始图标文件（可选，保留作为备份）
│   └── layout.tsx        # 根布局，配置 metadata
├── public/
│   └── icon.svg          # 实际使用的图标文件（静态导出模式）
└── next.config.mjs       # Next.js 配置，包含 basePath
```

## 验证配置

### 开发环境

1. 运行 `pnpm dev`
2. 访问 `http://localhost:3000/icon.svg` 应该能看到图标
3. 检查浏览器标签页是否显示图标

### 生产环境

1. 运行 `pnpm build`
2. 检查 `out/` 目录中是否有 `icon.svg` 文件
3. 部署后访问 `https://blog.hoochanlon.moe/fumadocs-notes/icon.svg` 应该能看到图标

## 常见问题

### Q: 为什么图标不显示？

**A:** 可能的原因：
1. `public/icon.svg` 文件不存在
2. `basePath` 配置不正确
3. 浏览器缓存，尝试硬刷新（Ctrl+F5）

### Q: 开发环境正常，生产环境不显示？

**A:** 检查：
1. `NEXT_PUBLIC_BASE_PATH` 环境变量是否正确设置
2. 构建后的 `out/` 目录中是否有 `icon.svg`
3. 部署后的路径是否正确（应该包含 `/fumadocs-notes` 前缀）

### Q: 可以使用其他格式的图标吗？

**A:** 可以，支持以下格式：
- SVG: `icon.svg`（推荐，矢量图，支持任意缩放）
- PNG: `icon.png`（需要指定尺寸，如 `icon-32x32.png`）
- ICO: `favicon.ico`（传统格式）

只需在 `public` 目录放置对应文件，并在 metadata 中配置相应路径即可。

## 参考链接

- [Next.js Metadata Icons](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons)
- [Next.js basePath](https://nextjs.org/docs/app/api-reference/next-config-js/basePath)
- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

