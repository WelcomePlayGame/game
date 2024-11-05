import PageHeader from '@/components/head/page-header';
import PageNave from '@/components/head/page-nav-header';
import Footer from '@/components/footer/page-footer';
import { findAllArticle } from '@/lib/action';
import PageGrid from '@/components/news_slug/page-grid-news';

export const generateMetadata = async () => {
  return {
    title:
      'Latest Gaming News and Updates | Stay Ahead with Game Reviews & Trends',
    description:
      'Stay updated with the latest gaming news, reviews, and trends. Explore in-depth game reviews, industry insights, and breaking news on the newest releases and updates. Join our community of gamers and never miss a beat in the gaming world.',
  };
};

const ArticleFetch = async () => {
  const initialPage = 1;
  const pageSize = 10;
  const { articles, totalArticles } = await findAllArticle(
    initialPage,
    pageSize
  );

  return (
    <PageGrid
      initialArticles={articles}
      initialPage={initialPage}
      totalArticles={totalArticles}
    />
  );
};

const Articles = async () => {
  return (
    <main>
      <PageHeader />
      <PageNave />
      <ArticleFetch />
      <Footer />
    </main>
  );
};

export default Articles;
