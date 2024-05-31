import PageHeader from '@/components/head/page-header';
import PageNave from '@/components/head/page-nav-header';
import Footer from '@/components/footer/page-footer';
import { findAllArticle } from '@/lib/action';
import PageGrid from '@/components/news_slug/page-grid-news';
export const generateMetadata = async () => {
  return {
    title: 'dwd',
    description: 'd',
  };
};
const ArticleFetch = async () => {
  const articles = await findAllArticle();
  return <PageGrid articles={articles} />;
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
