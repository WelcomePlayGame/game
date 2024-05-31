// import AdminMenu from '@/components/admin/page-menu-header';
// import ArticlesList from '@/components/article/page-article-list-admin';
// import { findAllArticle } from '@/lib/action';
// const ArticleFetch = async () => {
//   const articles = await findAllArticle();
//   return <ArticlesList articles={articles} />;
// };
// const ListArticle = async () => {
//   return (
//     <main>
//       <AdminMenu />
//       <ArticleFetch />
//     </main>
//   );
// };
// export default ListArticle;
import AdminMenu from '@/components/admin/page-menu-header';
import ArticlesList from '@/components/article/page-article-list-admin';
import { findAllArticle } from '@/lib/action';

const ArticleFetch = async () => {
  const initialPage = 1;
  const pageSize = 10;
  const { articles, totalArticles } = await findAllArticle(
    initialPage,
    pageSize
  );
  return (
    <ArticlesList
      initialArticles={articles}
      initialPage={initialPage}
      totalArticles={totalArticles}
    />
  );
};

const ListArticle = async () => {
  return (
    <main>
      <AdminMenu />
      <ArticleFetch />
    </main>
  );
};

export default ListArticle;
