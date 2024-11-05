'use client';
import React, { useState, useEffect } from 'react';
import PageItem from './page-item-news';
import Pagination from '@/components/pagination/page-pagination';
import { findAllArticle } from '@/lib/action';

const PageGrid = ({ initialArticles, initialPage, totalArticles }: any) => {
  const [articles, setArticles] = useState(initialArticles || []);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;
  const totalPages = Math.ceil(totalArticles / pageSize);

  const fetchArticles = async (page: number) => {
    setLoading(true);
    try {
      const result = await findAllArticle(page, pageSize);
      console.log('Fetched articles:', result.articles); // Debugging output
      if (Array.isArray(result.articles)) {
        setArticles(result.articles);
      } else {
        console.error(
          'Expected articles to be an array, but got:',
          result.articles
        );
        setArticles([]);
      }
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

  if (loading) {
    return (
      <div style={{ display: 'block', margin: 'auto' }}>
        <img src={`/animation.gif`} alt="animation" />
      </div>
    );
  }

  return (
    <div>
      <div
        className={`flex text-center justify-center mt-[50px] text-[0.8rem]  lg:text-[1.3rem]`}
      >
        <h1>Latest Gaming News: Updates, Releases, and New Announcements</h1>
      </div>
      <main className="flex flex-col flex-wrap mt-[30px] lg:mt-[90px] lg:flex-row lg:justify-evenly">
        {articles.map((article: any, index: number) => (
          <div key={index}>
            <PageItem {...article} />
          </div>
        ))}
      </main>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PageGrid;
