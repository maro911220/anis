"use client";

import { MdLightMode, MdNightlight } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";

// style
const iconStyle =
  "flex justify-center items-center w-10 h-10 text-white text-xl rounded-lg cursor-pointer bg-main transition hover:brightness-125";
const headerStyle =
  "header w-full fixed top-0 bg-white z-50 border-b dark:bg-neutral-800 dark:border-neutral-500";
const headerInnerStyle =
  "max-w-screen-2xl px-4  m-auto flex justify-between items-center h-20";

// Header
export default function Header() {
  const sytleCheck =
    'document.documentElement.classList = localStorage.getItem("maroMode");';
  return (
    <>
      <header className={headerStyle}>
        <div className={headerInnerStyle}>
          <h1>
            <Link href="/" className="flex items-end">
              <img className="w-28" src="/logo.png" alt="로고" />
              <span className="blind">Maro</span>
              <span className="text-xs leading-none">Anis</span>
            </Link>
          </h1>
          <div className="flex gap-2">
            <a
              className={iconStyle}
              href="https://github.com/maro911220"
              target="_blank"
              onClick={(e) => {
                e.preventDefault();
                let type =
                  localStorage.getItem("maroMode") == "dark" ? " " : "dark";
                localStorage.setItem("maroMode", type);
                document.documentElement.classList = type;
              }}
            >
              <MdLightMode />
            </a>
            <a
              className={iconStyle}
              href="https://github.com/maro911220"
              target="_blank"
            >
              <AiFillGithub />
            </a>
          </div>
        </div>
        <script dangerouslySetInnerHTML={{ __html: sytleCheck }} />
      </header>
    </>
  );
}
