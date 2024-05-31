import React from 'react';

interface CommentItemProps {
  name: string;
  content: string;
  date: string | Date;
}

const CommentItem: React.FC<CommentItemProps> = ({ name, content, date }) => {
  const createMarkup = (html: string) => ({ __html: html });
  const formattedDate = new Date(date).toLocaleDateString();
  return (
    <main className="flex flex-col items-start border border-solid border-white rounded p-4">
      <div className="mb-2">
        <span className="border-b border-red-500 mb-2 block">{name}</span>
        <span>{formattedDate}</span>
      </div>
      <span dangerouslySetInnerHTML={createMarkup(content)} />
    </main>
  );
};

export default CommentItem;
