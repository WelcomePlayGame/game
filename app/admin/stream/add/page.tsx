'use client';
import { useRef } from 'react';

const addVideo = async (title: string, url: string) => {
  title = title.trim();
  url = url.trim();

  const res = await fetch(`/api/auth/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, url }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to add video');
  }

  return res.json();
};

const AddVideo = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (titleRef.current && urlRef.current) {
      try {
        await addVideo(titleRef.current.value, urlRef.current.value);
      } catch (error: any) {
        console.error(error.message);
      }
    }
  };

  return (
    <main className={`flex flex-col items-center mt-[70px]`}>
      <form
        onSubmit={submitHandler}
        className={`flex flex-col items-center w-[900px] text-center`}
      >
        <input
          type="text"
          ref={titleRef}
          placeholder="Title Video"
          className={`m-[10px] text-center rounded w-[600px] text-[#000]`}
        />
        <input
          type="text"
          ref={urlRef}
          placeholder="url video"
          className={`text-center rounded w-[600px] text-[#000]`}
        />
        <button
          className={`bg-[red] bg-opacity-70 mt-[20px] w-[200px] rounded`}
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default AddVideo;
