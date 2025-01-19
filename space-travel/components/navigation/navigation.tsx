'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from '../../images/shared/logo.svg';
import { navConfig } from "../../utils/nav-config";

export const Navigation = () => {
  const pathName = usePathname();
  return (
    <header className="primary-header flex">
      <div>
        <Image
          src={logo}
          alt="Space travel logo"
          className="logo"
        />
      </div>
      <button className="mobile-nav-toggle" aria-controls="primary-navigation" aria-expanded="false">
        <span className="sr-only">Menu</span>
      </button>
      <nav>
        <ul id="primary-navigation" className="underline-indicators flex primary-navigation">
          {navConfig.map((item, idx) => (
            <li key={item.key} className={`${item.path === pathName ? 'active' : ''}`}>
              <Link className="uppercase text-white letter-spacing-2" href={item.path}>
                <span aria-hidden="true">
                  {`0${idx}`}
                </span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
};
