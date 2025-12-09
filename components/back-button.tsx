'use client';

import { type ComponentProps } from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/cn';
import { type ButtonProps, buttonVariants } from './ui/button';

interface BackButtonProps
  extends Omit<ComponentProps<'button'>, 'color'>,
    ButtonProps {
  fallbackHref?: string;
}

export default function BackButton({
  fallbackHref = '/',
  size = 'sm',
  color = 'secondary',
  className,
  children = '回退上一页',
  ...props
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      {...props}
      className={cn(
        buttonVariants({ size, color }),
        'px-4 py-2',
        className,
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

