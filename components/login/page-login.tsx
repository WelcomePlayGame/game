'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import LoginGoogle from '../login_with_google/page-login-google';
const createUser = async (name: string, email: string, password: string) => {
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
export const generateMetadata = async ({ params }: any) => {
  return {
    title: 'Login page',
    description: 'Please login this page',
  };
};

const LoginForm = () => {
  const [isLoading, setLoading] = useState(false);
  const { data: session, status }: any = useSession();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoading) {
      const result = await signIn('credentials', {
        redirect: false,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });
      if (!result?.error) {
      }
    } else {
      try {
        const result = await createUser(
          nameRef.current!.value,
          emailRef.current!.value,
          passwordRef.current!.value
        );
      } catch (error) {
        throw error;
      }
    }
  };

  if (status === 'loading' || status === 'authenticated') {
    return <div>Loading...</div>;
  }

  return (
    <main className={`flex flex-col items-center mt-[150px]`}>
      <h1 className={`mb-[15px]`}>{!isLoading ? 'Login' : 'Sign Up'}</h1>
      <form
        onSubmit={submitHandler}
        className={`flex flex-col w-[350px] items-center bg-[#000] bg-opacity-65 lg:w-[600px] p-[20px] rounded-[7px]`}
      >
        {isLoading && (
          <input
            type="text"
            name="name"
            required
            className={`w-[300px] lg:w-[400px] h-[30px] m-[10px] rounded text-center text-[#000]`}
            placeholder="Enter name"
            ref={nameRef}
          />
        )}
        <input
          type="email"
          name="email"
          required
          className={`w-[300px] lg:w-[400px] h-[30px] m-[10px] rounded text-center text-[#000]`}
          placeholder="Enter email"
          ref={emailRef}
        />
        <input
          type="password"
          name="password"
          required
          className={`w-[300px] lg:w-[400px] h-[30px] m-[10px] rounded text-center text-[#000]`}
          placeholder="Enter password"
          ref={passwordRef}
        />
        {isLoading ? (
          <span>
            Do you want {``}
            <span
              className={`text-[red]`}
              onClick={() => setLoading(!isLoading)}
            >
              Login?
            </span>
          </span>
        ) : (
          <span>
            If you don{`'`}t have an account, you can{` `}
            <span
              className={`text-[red]`}
              onClick={() => setLoading(!isLoading)}
            >
              Create One
            </span>
          </span>
        )}

        <div className={`flex flex-col items-center`}>
          <button
            type="submit"
            className={`mt-[20px] bg-[red] w-[300px] h-[40px] rounded`}
          >
            {isLoading ? 'Create new account' : 'Login with existing account'}
          </button>
          <LoginGoogle />
        </div>
      </form>
    </main>
  );
};

export default LoginForm;
