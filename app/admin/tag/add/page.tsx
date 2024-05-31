'use client';
import { saveTag as add } from '@/lib/action';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
const Add = () => {
  const router = useRouter();
  const { data: session, status }: any = useSession();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await add(formData);
    document.location.reload();
  };
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
    <main className={`block mx-auto w-[900px] mt-[120px]`}>
      <h2 className={`text-[#fff] text-center mb-[30px]`}>Add Tag</h2>
      <form onSubmit={handleSubmit}>
        <div className={`flex  justify-center`}>
          <div className={`flex justify-center`}>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              className={`h-[30px] m-[10px] text-center text-[#000]`}
              required
            />
          </div>
        </div>

        <div className={`flex justify-center`}>
          <button
            type="submit"
            className={`text-center  bg-[red] w-[100px] mt-[30px]`}
          >
            Send
          </button>
        </div>
      </form>
    </main>
  );
};
export default Add;
