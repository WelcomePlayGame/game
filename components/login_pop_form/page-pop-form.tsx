'use client';
import LoginGoogle from '../login_with_google/page-login-google';
import React, { useRef, useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

interface PopLoginProps {
  isLogin: boolean;
  setLogin: (value: boolean) => void;
}

const AddUserPop = async (name: string, email: string, password: string) => {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });

  if (!res.ok) {
    throw new Error('Failed to create user');
  }

  return res.json();
};

const PopLogin: React.FC<PopLoginProps> = ({ isLogin, setLogin }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isExisting, setExisting] = useState(false);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!isExisting) {
        const res = await signIn('credentials', {
          redirect: false,
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        });
        if (res?.ok) {
          setLogin(false);
        }
      } else {
        const result = await AddUserPop(
          nameRef.current!.value,
          emailRef.current!.value,
          passwordRef.current!.value
        );
        toast.info('User Created');
        if (result) {
          const res = await signIn('credentials', {
            redirect: false,
            email: emailRef.current!.value,
            password: passwordRef.current!.value,
          });
          if (res?.ok) {
            setLogin(false);
          }
        }
      }
    } catch (error) {
      toast.error('Error');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[600px] h-[400px] bg-black bg-opacity-90 p-6 rounded shadow-lg relative">
        <form
          className="w-full h-full flex flex-col justify-center items-center "
          onSubmit={submitHandler}
        >
          {isExisting && (
            <input
              type="text"
              name="name"
              required
              placeholder="Enter name"
              className="mb-4 p-2 border rounded w-full text-center text-[#000]"
              ref={nameRef}
            />
          )}
          <input
            type="email"
            name="email"
            required
            placeholder="Enter email"
            className="mb-4 p-2 border rounded w-full text-center text-[#000]"
            ref={emailRef}
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Enter password"
            className="mb-4 p-2 border rounded w-full text-center text-[#000]"
            ref={passwordRef}
          />
          {isExisting ? (
            <span>
              Do you want {``}
              <span
                className={`text-[red] cursor-pointer`}
                onClick={() => setExisting(!isExisting)}
              >
                Login?
              </span>
            </span>
          ) : (
            <span>
              If you don{`'`}t have an account, you can{` `}
              <span
                className={`text-[red] cursor-pointer`}
                onClick={() => setExisting(!isExisting)}
              >
                Create One
              </span>
            </span>
          )}
          <button className="bg-red-500 text-white p-3 rounded m-[20px] ">
            {isExisting ? 'Create new account' : 'Login with existing account'}
          </button>
          <span className={`text-[#fff]`}>or</span>
          <LoginGoogle />
        </form>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setLogin(false)}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default PopLogin;
