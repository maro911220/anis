"use client";
import Navi from "./navi";
import Link from "next/link";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AiFillGithub, AiOutlineSearch } from "react-icons/ai";
import { MdLightMode, MdNightlightRound } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";

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
  "flex items-center absolute md:static top-16 right-0 w-full md:w-auto ";
const searchInput =
  "flex-1 w-full h-10 border  border-r-0 border-l-0 p-2 md:border-l md:rounded-l bg-white dark:bg-neutral-800  dark:border-neutral-500 focus:outline-none";

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

  const notWarn = () => {
    toast.warning("Please search in English");
    toast.clearWaitingQueue();
  };

  const notWarn2 = () => {
    toast.warning("Please enter at least two letters");
    toast.clearWaitingQueue();
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
          <div className="flex items-center gap-1 md:gap-2">
            <form
              action={`/search/${search}`}
              className={searchBox}
              onSubmit={(e) => {
                if (search.length < 2) {
                  notWarn2();
                  e.preventDefault();
                }
              }}
            >
              <input
                className={searchInput}
                type="text"
                name="search"
                placeholder="search"
                value={search}
                onChange={(e) => {
                  const regExp = /[^0-9a-zA-Z,\s]/g;
                  if (regExp.test(e.target.value)) {
                    notWarn();
                    setSearch("");
                  } else {
                    setSearch(e.target.value);
                  }
                }}
              />
              <button
                type="submit"
                className={iconStyle + ` rounded-none md:rounded-r flex-none`}
              >
                <AiOutlineSearch />
              </button>
              <ToastContainer
                limit={1}
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
              />
              <Navi />
            </form>
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
