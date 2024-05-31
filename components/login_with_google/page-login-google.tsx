import { signIn } from 'next-auth/react';
import Image from 'next/image';
const LoginGoogle = () => {
  return (
    <div className={`flex justify-center items-center space-x-2`}>
      <span className={`text-[#fff]`}>Login with</span>
      <div
        onClick={() => signIn('google')}
        className={`relative w-[50px] h-[50px]`}
      >
        <Image src={'/images/image/google.png'} fill alt="google" />
      </div>
    </div>
  );
};
export default LoginGoogle;
