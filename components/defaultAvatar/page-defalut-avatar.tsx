import Image from 'next/image';

const DefalutAvatar = () => {
  return (
    <main>
      <Image src={`/images/image/gamer.png`} fill alt="avatar defalut" />
    </main>
  );
};
export default DefalutAvatar;
