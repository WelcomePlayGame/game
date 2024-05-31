import { getAllComment } from '@/lib/action';
import CommentsGrid from './page-grid-comment';

const CommentsFetch = async () => {
  const comments = await getAllComment();
  return <CommentsGrid comments={comments} />;
};
const ListComment = () => {
  return (
    <main>
      <CommentsFetch />
    </main>
  );
};
export default ListComment;
