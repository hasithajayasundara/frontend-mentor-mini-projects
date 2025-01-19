'use client';

import { usePathname } from "next/navigation";

import { navConfig } from "@/utils/nav-config";
import { Navigation } from "./navigation";

export const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathName = usePathname();
  const config = navConfig.filter((item) => item.path === pathName)?.at(0);

  return (
    <body className={config?.id ?? ''}>
      <Navigation />
      <main id="main" className={`grid-container grid-container--${config?.id} flow`}>
        {children}
      </main>
    </body>
  );
}
