import { getAllTags } from '@/lib/source';
import { DocsPage, DocsTitle, DocsBody } from 'fumadocs-ui/layouts/notebook/page';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '标签',
  description: '所有文章标签',
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <DocsPage full>
      <DocsTitle>标签</DocsTitle>
      <DocsBody>
        {tags.length === 0 ? (
          <p className="text-fd-muted-foreground">暂无标签</p>
        ) : (
          <div className="flex flex-wrap gap-2 mt-6">
            {tags.map(({ tag, count }) => (
              <Link
                key={tag}
                href={`/notes/tags/${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-fd-border bg-fd-card text-fd-card-foreground hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors no-underline"
              >
                <span className="font-medium"># {tag}</span>
                <span className="text-sm text-fd-muted-foreground">({count})</span>
              </Link>
            ))}
          </div>
        )}
      </DocsBody>
    </DocsPage>
  );
}

