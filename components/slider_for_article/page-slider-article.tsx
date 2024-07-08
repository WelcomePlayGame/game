'use client';
import { useEffect, useState } from 'react';
import { findAllArticle } from '@/lib/action';
import CustomSlider from '@/components/slider_component_def/page-custom-slider';

const SliderArticle = () => {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { articles } = await findAllArticle(1, 10);

      const sortedArticles = articles.sort((a: any, b: any) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      setArticles(sortedArticles);
    };

    fetchArticles();
  }, []);

  return articles.length > 0 ? (
    <CustomSlider
      items={articles}
      nameHeadSlider="Last News"
      url_article="news"
    />
  ) : (
    <p>Loading...</p>
  );
};

export default SliderArticle;
