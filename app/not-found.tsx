import Link from 'next/link';
import BackButton from '@/components/back-button';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-8 px-6 text-center">
      <div className="space-y-3">
         <h1 className="text-4xl font-semibold sm:text-5xl"
             style={{ fontFamily: 'Tesla, system-ui, -apple-system, sans-serif' }}
            >404 Not Found
        </h1>
        <p className="text-lg text-fd-muted-foreground sm:text-xl">
          访问的地址可能被移动或已删除。
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className={cn(
            buttonVariants({ color: 'primary', size: 'sm' }),
            'px-5 py-2.5 text-base sm:px-6',
          )}
        >
          返回首页
        </Link>
        <BackButton
          color="outline"
          size="sm"
          className="px-5 py-2.5 text-base sm:px-6"
        />
      </div>
    </main>
  );
}

