import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
const AdminMenu = () => {
  const router = useRouter();
  const { data: session, status }: any = useSession();
  useEffect(() => {
    if (status !== 'loading' && status !== 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);

  if (status === 'loading' || status !== 'authenticated') {
    return <div>Loading...</div>;
  }

  return (
    <main className={`mt-[30px] mb-[30px]`}>
      <ul className={`flex justify-evenly border-b-[1px]`}>
        {session.user.role === 'admin' && (
          <li>
            <Link href={`/admin/article`}>Article</Link>
          </li>
        )}
        {session.user.role === 'admin' && (
          <li>
            <Link href={'/admin/game'}>Game</Link>
          </li>
        )}
        {session.user.role === 'admin' && (
          <li>
            <Link href={'/admin/category'}>Category</Link>
          </li>
        )}
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>Comment(s)</li>
      </ul>
    </main>
  );
};
export default AdminMenu;
