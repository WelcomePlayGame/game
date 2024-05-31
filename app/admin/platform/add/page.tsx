'use client';
import { savePlatform as add } from '@/lib/action';
import { useState } from 'react';
import ImagePicker from '@/components/addImage/page-add-image';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });
const Add = () => {
  const router = useRouter();
  const { data: session, status }: any = useSession();
  const [content, setContent] = useState('');
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }],
      ['code-block'],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
  ];

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append('content', content);
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
      <h2 className={`text-[#fff] text-center mb-[30px]`}>Add Platform</h2>
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
            <input
              type="text"
              name="seo_title"
              placeholder="Enter SEO title"
              className={`h-[30px] m-[10px] text-center text-[#000]`}
              required
            />
            <input
              type="text"
              name="seo_content"
              placeholder="Enter SEO content"
              className={`h-[30px] m-[10px] text-center text-[#000]`}
              required
            />
          </div>
          <div className={`mt-[-160px]`}>
            <ImagePicker label="Add image" name="image" />
          </div>
        </div>

        <div className={``}>
          <QuillEditor
            value={content}
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
          />
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
