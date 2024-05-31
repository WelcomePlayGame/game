// import { useState, useEffect } from 'react';
// import { findAllArticle as get } from '@/lib/action';
// interface IArticle {
//   id: number;
//   title: string;
// }
// const SelectArticle = ({ onChange }: any) => {
//   const [articles, setArticle] = useState<IArticle[]>([]);
//   useEffect(() => {
//     const fetch = async () => {
//       const data = await get();
//       setArticle(data);
//     };
//     fetch();
//   }, []);
//   return (
//     <main>
//       <select onChange={onChange} multiple>
//         {articles.map((article) => (
//           <option key={article.id} value={article.id}>
//             {article.title}
//           </option>
//         ))}
//       </select>
//     </main>
//   );
// };
// export default SelectArticle;
import { useState, useEffect } from 'react';
import { findAllArticle as get } from '@/lib/action';

interface IArticle {
  id: number;
  title: string;
}

const SelectArticle = ({ onChange }: any) => {
  const [articles, setArticles] = useState<IArticle[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { articles } = await get(1, 5000);
      setArticles(articles);
    };

    fetch();
  }, []);

  return (
    <main>
      <select onChange={onChange} multiple>
        {articles.map((article) => (
          <option key={article.id} value={article.id}>
            {article.title}
          </option>
        ))}
      </select>
    </main>
  );
};

export default SelectArticle;
