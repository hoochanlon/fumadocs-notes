import { getPagesByTag, source } from '@/lib/source';
import { DocsPage, DocsTitle, DocsBody } from 'fumadocs-ui/layouts/notebook/page';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type PageProps = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  
  return {
    title: `标签: ${decodedTag}`,
    description: `包含标签 "${decodedTag}" 的所有文章`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const pages = getPagesByTag(decodedTag);

  if (pages.length === 0) {
    notFound();
  }

  return (
    <DocsPage full>
      <DocsTitle>标签: {decodedTag}</DocsTitle>
      <DocsBody>
        <div className="mt-6 space-y-4">
          {pages.map((page) => {
            const publishedAt = page.data.publishedAt instanceof Date
              ? page.data.publishedAt
              : page.data.publishedAt
                ? new Date(page.data.publishedAt)
                : undefined;
            
            return (
              <article
                key={page.url}
                className="p-4 rounded-lg border border-fd-border bg-fd-card hover:bg-fd-accent transition-colors"
              >
                <Link href={page.url} className="block">
                  <h3 className="text-lg font-semibold mb-2 hover:text-fd-primary transition-colors">
                    {page.data.title}
                  </h3>
                  {page.data.description && (
                    <p className="text-sm text-fd-muted-foreground mb-2">
                      {page.data.description}
                    </p>
                  )}
                  {publishedAt && (
                    <p className="text-xs text-fd-muted-foreground">
                      {publishedAt.toLocaleDateString('zh-CN')}
                    </p>
                  )}
                </Link>
              </article>
            );
          })}
        </div>
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  const tags = new Set<string>();
  
  // 收集所有标签
  const pages = source.getPages();
  for (const page of pages) {
    const pageTags = (page.data as { tags?: string[] }).tags;
    if (pageTags && Array.isArray(pageTags)) {
      for (const tag of pageTags) {
        tags.add(tag);
      }
    }
  }
  
  return Array.from(tags).map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

