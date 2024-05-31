'use client';
import { saveCategory as add } from '@/lib/action';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
const Add = () => {
  const router = useRouter();
  const { data: session, status }: any = useSession();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await add(formData);
      toast.success('Category added successfully');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error('Ops... Error');
    }
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
    <main className={`flex flex-col items-center mt-[70px]`}>
      <h3 className={`mb-[30px]`}>Add Category</h3>
      <form onSubmit={handleSubmit} className={`flex flex-col`}>
        <div>
          <input
            name="title"
            placeholder="Name category"
            required
            className={`text-[#000] text-center`}
          />
        </div>
        <button
          className={`mt-[30px] mx-auto block bg-[red] w-[100px] rounded`}
        >
          Send
        </button>
      </form>
    </main>
  );
};
export default Add;
