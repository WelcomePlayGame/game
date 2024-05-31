'use client';
import { useEffect } from 'react';
import AdminMenu from '@/components/admin/page-menu-header';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Admin = () => {
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
    <main>
      <AdminMenu />
    </main>
  );
};

export default Admin;
