import { getContent } from '@/lib/content';
import { NewsArchive, NewsItem } from '@/components/news/NewsArchive';

export const metadata = {
  title: 'News Archive | CAIR',
  description: 'Latest updates, publications, and announcements from the Colorado AI Research lab.',
};

export default function NewsPage() {
  const news = getContent<NewsItem[]>('news');
  
  // Sort by date desc
  const sortedNews = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return <NewsArchive news={sortedNews} />;
}
