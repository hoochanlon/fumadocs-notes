import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// 创建搜索API实例，包含GET和staticGET方法
const { GET, staticGET } = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: 'english',
});

// 在静态导出模式下使用staticGET作为GET处理程序
export { staticGET as GET };

// 配置路由为静态可渲染
export const dynamic = 'force-static';

export const revalidate = false;

// 为静态导出生成参数，确保/api/search路由被预渲染
export function generateStaticParams() {
  return [{}];
}
