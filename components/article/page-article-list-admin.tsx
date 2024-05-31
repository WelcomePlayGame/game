// 'use client';
// import { deleteArticleBySlug } from '@/lib/action';
// import Link from 'next/link';

// const deleteArticle = (slug: string, url: string) => async () => {
//   await deleteArticleBySlug(slug, url);
// };

// const ArticlesList = ({ articles }: any) => {
//   return (
//     <div className="flex justify-center">
//       <table className="table-auto border-collapse border border-gray-300 w-[900px]">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-300 px-4 py-2 text-[#000]">
//               Title
//             </th>
//             <th className="border border-gray-300 px-4 py-2 text-[#000]">
//               Update
//             </th>
//             <th className="border border-gray-300 px-4 py-2 text-[#000]">
//               Delete
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {articles.map((article: any, index: number) => (
//             <tr key={index}>
//               <td className="border border-gray-300 px-4 py-2">
//                 {article.title}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 <Link href={`/admin/article/update/${article.slug}`}>
//                   <span className="text-blue-500 hover:underline">Update</span>
//                 </Link>
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 <button
//                   type="submit"
//                   onClick={deleteArticle(article.slug, article.url_image)}
//                   className="text-red-500 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ArticlesList;
'use client';
import { useState, useEffect } from 'react';
import { deleteArticleBySlug, findAllArticle } from '@/lib/action';
import Link from 'next/link';
import Pagination from '@/components/pagination/page-pagination';

const deleteArticle = (slug: string, url: string) => async () => {
  await deleteArticleBySlug(slug, url);
};

const ArticlesList = ({ initialArticles, initialPage, totalArticles }: any) => {
  const [articles, setArticles] = useState(initialArticles || []);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;
  const totalPages = Math.ceil(totalArticles / pageSize);

  const fetchArticles = async (page: number) => {
    setLoading(true);
    try {
      const result = await findAllArticle(page, pageSize);
      setArticles(result.articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      fetchArticles(page);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  return (
    <div className="flex justify-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table-auto border-collapse border border-gray-300 w-[900px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-[#000]">
                Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-[#000]">
                Update
              </th>
              <th className="border border-gray-300 px-4 py-2 text-[#000]">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article: any, index: number) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {article.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link href={`/admin/article/update/${article.slug}`}>
                    <span className="text-blue-500 hover:underline">
                      Update
                    </span>
                  </Link>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    type="submit"
                    onClick={deleteArticle(article.slug, article.url_image)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ArticlesList;
