'use client';
import Link from 'next/link';
import classes from './page-header.module.css';
import { usePathname } from 'next/navigation';
import BurgerMenu from '../burger_menu/page-burger-menu';
const PageNave = () => {
  const currentPath = usePathname();

  return (
    <main
      className={`${classes.nav_container} flex justify-evenly  text-[#fff] mt-[40px]`}
    >
      <div className={`uppercase text-[1.3rem]`}>gameforyou</div>
      <div className={`block md:hidden`}>
        <BurgerMenu />
      </div>
      <div className={`hidden md:block`}>
        <ul
          className={`${classes.ul_container} uppercase flex flex-row space-x-4`}
        >
          <li>
            <Link
              href={'/'}
              className={`${currentPath === '/' ? `text-[#6ec1e4]` : ``}`}
            >
              home
            </Link>
          </li>
          <li>
            <Link
              href={'/news'}
              className={`${currentPath === '/news' ? `text-[#6ec1e4]` : ``}`}
            >
              news about games
            </Link>
          </li>
          <li>
            <Link
              href={'/games'}
              className={`${currentPath === '/games' ? `text-[#6ec1e4]` : ``}`}
            >
              choose games
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
};
export default PageNave;
