'use client';

import AdminMenu from '@/components/admin/page-menu-header';
import DefalutAvatar from '@/components/defaultAvatar/page-defalut-avatar';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Profile = () => {
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
      <div className={`flex justify-end p-[20px]`}>
        <div className={`flex flex-col items-center`}>
          <h2> {session.user.name}</h2>
          <div
            className={`relative w-24 h-24 rounded-full overflow-hidden mt-[15px] mb-[12px]`}
          >
            {session.user.image === '' ? (
              <Image src={session.user.image} fill alt={session.user.name} />
            ) : (
              <DefalutAvatar />
            )}
          </div>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
