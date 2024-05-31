'use client';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import PopLogin from '../login_pop_form/page-pop-form';
const addComment = async (
  slug: string,
  name: string,
  content: string,
  email: string
) => {
  const res = await fetch('/api/auth/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ slug, name, content, email }),
  });
  if (!res.ok) {
    throw new Error('Failed to create comment');
  }

  return res.json();
};
const AddComment = ({ slug }: { slug: string }) => {
  const [content, setContent] = useState('');
  const { data: session, status } = useSession();
  const [isLogin, setLogin] = useState(false);
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      [{ color: [] }],
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
    'align',
    'color',
  ];

  const handleEditorChange = (newContent: string) => {
    if (status !== 'authenticated') {
      setLogin(true);
    } else {
      setContent(newContent);
    }
  };
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (session?.user?.name && session?.user?.email) {
      await addComment(slug, session.user.name, content, session.user.email);
      setContent('');
    } else {
      setLogin(true);
    }
  };
  return (
    <main>
      <h3 className="text-center border-t-[1px] lg:mt-[30px] lg:mb-[30px] pt-[20px]">
        Add your comment
      </h3>
      <form
        className="flex flex-col items-center w-[300px] lg:w-[900px] mb-[70px] border-b-[1px]"
        onSubmit={submitHandler}
      >
        <QuillEditor
          value={content}
          onChange={handleEditorChange}
          modules={quillModules}
          formats={quillFormats}
          className="rounded text-center m-[10px] w-[300px] lg:w-[600px]"
        />
        <button
          type="submit"
          className="rounded bg-[red] w-[200px] h-[40px] mt-[30px] mb-[30px]"
        >
          Send your Comment
        </button>
      </form>
      {isLogin && <PopLogin isLogin={isLogin} setLogin={setLogin} />}
    </main>
  );
};

export default AddComment;
