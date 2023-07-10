import { MdLightMode, MdNightlight } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      {/* header-con */}
      <div className="max-w-screen-2xl m-auto flex justify-between items-center h-20">
        {/* logo */}
        <h1>
          <Link href="/" className="flex items-end">
            <img className="w-28" src="/logo.png" alt="로고" />
            <span className="blind">Maro</span>
            <span className="text-xs leading-none">Anis</span>
          </Link>
        </h1>
        {/* icons */}
        <div className="flex gap-2">
          <a
            className="flex justify-center items-center w-10 h-10 text-white text-xl rounded-lg cursor-pointer bgMain"
            href="https://github.com/maro911220"
            target="_blank"
          >
            <MdLightMode />
          </a>
          <a
            className="flex justify-center items-center w-10 h-10 text-white text-xl rounded-lg cursor-pointer bgMain"
            href="https://github.com/maro911220"
            target="_blank"
          >
            <AiFillGithub />
          </a>
        </div>
      </div>
    </header>
  );
}
