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
        <ol
          className={`flex flex-col items-start lg:flex-row lg:justify-between uppercase text-[1.1rem] lg:space-x-3`}
        >
          <li>
            <Link href="https://www.instagram.com/optimisticpetrovich/">
              instargam
            </Link>
          </li>
          <li>
            <Link
              href={`https://www.facebook.com/GameVadymPetrovich/`}
              target="_blank"
            >
              facebook
            </Link>
          </li>
          <li>telegram</li>
          <li>
            <Link href="https://www.reddit.com/user/GameForYouOnlineInfo/">
              reddit
            </Link>
          </li>
          <li>
            <Link href="https://www.youtube.com/@GameForYouOnline">
              youtube
            </Link>
          </li>
          <li>
            <Link href="https://www.tiktok.com/@gameforyouonline">tictok</Link>
          </li>
        </ol>
      </div>
    </footer>
  );
};

export default Footer;
