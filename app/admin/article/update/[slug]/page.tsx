'use client';
import ImagePicker from '@/components/addImage/page-add-image';
import AdminMenu from '@/components/admin/page-menu-header';
import { addArticle as add } from '@/lib/action';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import SelectCategory from '@/components/category/page-select-category';
import SelectGames from '@/components/games/page-select-games';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const ArticleUpdate: React.FC = () => {
  const router = useRouter();
  const { data: session, status }: any = useSession();
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [game, setGame] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { registerVideoBlot } = require('@/components/redactor/videoBlot');
      registerVideoBlot();
    }
  }, []);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
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
    'video',
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
    formData.append('category_id', category);
    formData.append('game_id', game);
    try {
      await add(formData);
      toast.success('Article added successfully');
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
    <main>
      <AdminMenu />
      <div className={`flex justify-evenly mt-[70px]`}>
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col items-center text-[#000] w-[1200px]`}
        >
          <div className={`flex flex-col`}>
            <div className={`flex justify-between`}>
              <div className={`flex justify-between`}>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  className={`w-[300px] h-[30px] m-[10px] text-center`}
                  required
                />
                <input
                  type="text"
                  name="seo_title"
                  placeholder="Enter SEO title"
                  className={`w-[300px] h-[30px] m-[10px] text-center`}
                  required
                />
                <input
                  type="text"
                  name="seo_content"
                  placeholder="Enter seo content"
                  className={`w-[300px] h-[30px] m-[10px] text-center`}
                  required
                />
              </div>

              <div className={`pl-[50px] mt-[-70px]`}>
                <ImagePicker label="Add Image" name="image" />
              </div>
            </div>
            <div className={`flex justify-start`}>
              <div className={`mr-[30px]`}>
                <SelectCategory
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setCategory(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </div>
              <div className={`ml-[30px]`}>
                <SelectGames
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setGame(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <QuillEditor
                value={content}
                onChange={handleEditorChange}
                modules={quillModules}
                formats={quillFormats}
                className="w-full max-w-[900px] mt-10 bg-white"
              />
            </div>
          </div>
          <button
            type="submit"
            className={`text-[#fff] m-[10px] bg-red-300 rounded w-[100px] h-[30px]`}
          >
            Update
          </button>
        </form>
      </div>
    </main>
  );
};

export default ArticleUpdate;
