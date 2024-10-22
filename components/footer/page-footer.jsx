import Link from 'next/link';

const Footer = () => {
  return (
    <footer
      className={`flex flex-col lg:flex-row lg:justify-around border-t-[1px] border-solid border-[#fff] mt-[50px] p-[50px]`}
    >
      <div className={``}>
        <span
          className={`text-center uppercase text-[1.8rem] text-[var(--global-accent-color)] font-rubik`}
        >
          our social
        </span>
        <div
          className={`flex flex-col items-start lg:flex-row lg:justify-between uppercase text-[1.1rem] lg:space-x-3`}
        >
          <span>
            <Link href="https://www.instagram.com/optimisticpetrovich/">
              instargam
            </Link>
          </span>
          <span>
            <Link
              href={`https://www.facebook.com/GameVadymPetrovich/`}
              target="_blank"
            >
              facebook
            </Link>
          </span>
          <span>telegram</span>
          <span>
            <Link href="https://www.reddit.com/user/GameForYouOnlineInfo/">
              reddit
            </Link>
          </span>
          <span>
            <Link href="https://www.youtube.com/@GameForYouOnline">
              youtube
            </Link>
          </span>
          <span>
            <Link href="https://www.tiktok.com/@gameforyouonline">tictok</Link>
          </span>
        </div>
      </div>
      <div></div>
      <div></div>
    </footer>
  );
};

export default Footer;
