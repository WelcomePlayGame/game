import React from 'react'; // Убедитесь, что импортирован React
import PageItem from './page-item-news';

const PageGrid = ({ articles }: any) => {
  return (
    <main
      className={`flex flex-col flex-wrap mt-[30px] lg:mt-[90px] lg:flex-row lg:justify-evenly`}
    >
      {articles.map((article: any, index: number) => (
        <div key={index}>
          <PageItem {...article} />
        </div>
      ))}
    </main>
  );
};

export default PageGrid;
