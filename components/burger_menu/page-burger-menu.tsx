import React, { useState } from 'react';
import clsx from 'clsx';
import { twMerge as twmerge } from 'tailwind-merge';
import Link from 'next/link';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuClasses = twmerge(
    'fixed top-0 right-0 w-full text-[#fff] h-full bg-black bg-opacity-90 shadow-lg transform transition-transform duration-300 ease-in-out z-50', // Добавил z-50 для достаточного повышения уровня
    clsx({
      'translate-x-0': isOpen,
      'translate-x-full': !isOpen,
    })
  );

  return (
    <div>
      <button className="p-1" onClick={() => setIsOpen(!isOpen)}>
        Menu
      </button>
      <div className={menuClasses}>
        <button
          className="absolute top-4 right-4 p-2"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
        <ul className="p-4 border-b-[1px] h-full]">
          <li className="my-2">
            <Link href={'/'} className={`uppercase`}>
              home
            </Link>
          </li>
          <li className="my-2">
            <Link href={'/news'} className={`uppercase`}>
              news about games
            </Link>
          </li>
          <li className="my-2">
            <Link href="/games" className={`uppercase`}>
              choose games
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;
