'use client';
import { saveGame as add } from '@/lib/action';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import ImagePicker from '@/components/addImage/page-add-image';
import SelectDeveloper from '@/components/developer/page-select-developer';
import SelectTag from '@/components/tag/page-select-tag';
import SelectPlatform from '@/components/platform/page-select-platform';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Add = () => {
  const router = useRouter();
  const { data: session, status }: any = useSession();
  const [content, setContent] = useState<string>('');
  const [developer, setDeveloper] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');
  const quillRef = useRef<any>(null);

  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        [{ align: [] }],
        [{ color: [] }],
        ['code-block'],
        ['clean'],
      ],
    },
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
    formData.append('tagId', tag);
    formData.append('platformId', platform);
    formData.append('developerId', developer);

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
    <main className="block mx-auto w-[900px] mt-[120px]">
      <h2 className="text-[#fff] text-center mb-[30px]">Add Game</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <div>
            <div className="flex justify-center">
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                className="h-[30px] m-[10px] text-center text-[#000]"
                required
              />
              <input
                type="text"
                name="seo_title"
                placeholder="Enter SEO title"
                className="h-[30px] m-[10px] text-center text-[#000]"
                required
              />
              <input
                type="text"
                name="seo_content"
                placeholder="Enter SEO content"
                className="h-[30px] m-[10px] text-center text-[#000]"
                required
              />
              <input
                type="text"
                name="video_url"
                placeholder="Enter URL video (YouTube)"
                className="h-[30px] m-[10px] text-center text-[#000]"
                required
              />
            </div>
            <div className="flex justify-center">
              <div className="m-[10px] text-[#000]">
                <SelectDeveloper
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setDeveloper(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </div>
              <div className="m-[10px] text-[#000]">
                <SelectTag
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setTag(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </div>
              <div className="m-[10px] text-[#000]">
                <SelectPlatform
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setPlatform(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-[-160px]">
            <ImagePicker label="Add image" name="image" />
          </div>
        </div>

        <div>
          <ReactQuill
            value={content}
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-center bg-red-500 w-[100px] mt-[30px] text-white"
          >
            Send
          </button>
        </div>
      </form>
    </main>
  );
};

export default Add;
