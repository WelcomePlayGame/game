import CommentItem from './page-item-comment';
const CommentsGrid = ({ comments }: any) => {
  return (
    <main>
      {comments.map((comment: any, index: number) => (
        <div key={index} className={`m-[20px]`}>
          <CommentItem {...comment} />
        </div>
      ))}
    </main>
  );
};

export default CommentsGrid;
