import { Bookmark } from 'lucide-react';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: 'https://github.com/hoochanlon',
    links: [
      {
        type: 'icon',
        label: 'Visit Blog', // `aria-label`
        icon: <Bookmark />,
        text: 'Blog',
        url: 'https://hoochanlon.github.io',
      },
    ],
  };
}