import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import SearchDialog from '@/components/search';
import type { Metadata } from 'next';
import 'katex/dist/katex.css';

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
        <RootProvider
          search={{
            SearchDialog,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
