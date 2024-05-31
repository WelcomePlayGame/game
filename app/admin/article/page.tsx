'use client';
import AdminMenu from '@/components/admin/page-menu-header';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const ArticleDashboard = () => {
  const router = useRouter();
  const { data: session, status }: any = useSession();

  useEffect(() => {
    if (
      status !== 'loading' &&
      (status !== 'authenticated' || session?.user?.role !== 'admin')
    ) {
      router.replace('/');
    }
  }, [status, router, session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status !== 'authenticated' || session?.user?.role !== 'admin') {
    return null;
  }

  return (
    <main>
      <AdminMenu />
      <ul className="flex justify-evenly">
        <li>
          <Link href="/admin/article/add">Add Article</Link>
        </li>
        <li>List Article</li>
      </ul>
    </main>
  );
};

export default ArticleDashboard;
