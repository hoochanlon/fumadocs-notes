import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Hoochanlon's Notes
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          个人笔记与文档集合
        </p>
        <div className="pt-4">
          <Link
            href="/docs/essay"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            进入文档
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
