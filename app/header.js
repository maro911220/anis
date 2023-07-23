"use client";
import { MdLightMode, MdNightlightRound } from "react-icons/md";
import { AiFillGithub, AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";

// style
const logoStyle = "w-20 h-8 md:w-28 md:h-12";
const iconStyle =
  "flex justify-center items-center w-10 h-10 text-white text-xl rounded cursor-pointer bg-main transition hover:brightness-125";
const headerStyle =
  "header w-full fixed top-0 bg-white z-50 border-b dark:bg-neutral-800 dark:border-neutral-500";
const headerInnerStyle =
  "max-w-screen-2xl px-2 md:px-4  m-auto flex justify-between items-center h-16 md:h-20 relative";
const sytleCheck =
  'document.documentElement.classList = localStorage.getItem("maroMode");';
const searchBox =
  "flex items-center absolute md:static top-16 right-0 w-full md:w-auto";
const searchInput =
  "flex-1 h-10 border  border-r-0 border-l-0 p-2 md:border-l md:rounded-l bg-white dark:bg-neutral-800  dark:border-neutral-500 focus:outline-none";

// Header
export default function Header() {
  const [mode, setMode] = useState("");
  const [search, setSearch] = useState("");
  const modeCheck = () => {
    let type = localStorage.getItem("maroMode") == "dark" ? " " : "dark";
    setMode(type);
    localStorage.setItem("maroMode", type);
    document.documentElement.classList = type;
  };

  return (
    <>
      <header className={headerStyle}>
        <div className={headerInnerStyle}>
          <h1>
            <Link href="/" className="flex items-end">
              <img className={logoStyle} src="/logo.png" alt="로고" />
              <span className="blind">Maro</span>
              <span className="text-xs leading-none">Anis</span>
            </Link>
          </h1>
          <div className="flex items-center gap-2">
            <div className={searchBox}>
              <input
                className={searchInput}
                type="text"
                name="search"
                placeholder="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Link
                className={iconStyle + ` rounded-none md:rounded-r flex-none`}
                href={`/search/${search}`}
                onClick={(e) => {
                  if (search == "") {
                    e.preventDefault();
                    alert("검색어를 입력해주세염");
                  } else if (Number(search.charAt(0))) {
                    e.preventDefault();
                    alert("첫글자는 숫자 불가능");
                    setSearch("");
                  } else {
                    setSearch("");
                  }
                }}
              >
                <AiOutlineSearch />
              </Link>
            </div>
            <a
              className={iconStyle}
              href="https://github.com/maro911220"
              target="_blank"
              onClick={(e) => {
                e.preventDefault();
                modeCheck();
              }}
            >
              {mode == "dark" ? <MdLightMode /> : <MdNightlightRound />}
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
