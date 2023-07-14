"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import useStore from "@/store/store";
import { useSearchParams } from "next/navigation";

export default function Navi() {
  const item = useStore((state) => state);
  useEffect(() => {
    item.loadGenres();
  }, []);
  const [navi, setNavi] = useState(false);
  return (
    <nav
      className="flex-none w-72 sticky top-20 overflow-auto "
      style={{ height: "calc(100vh - 80px)" }}
    >
      <ul className={`${navi ? "flex" : "hidden"} md:flex`}>
        <Category title={"genres"} item={item.navList} />
      </ul>
      <button
        onClick={() => {
          setNavi(!navi);
        }}
      >
        토글샘플
      </button>
    </nav>
  );
}

function Category({ item, title }) {
  const searchParams = useSearchParams().get(title);
  return (
    <li className="w-full">
      <p className="py-2 font-bold uppercase ">{title}</p>
      <ul className="border-l-2	">
        {item.map((nav, index) => {
          return (
            <li className="px-4 " key={index}>
              <Link
                href={`/list/${nav.name}?${title}=${nav.mal_id}&page=1`}
                className={`${
                  searchParams == nav.mal_id && "col-main font-bold"
                }`}
              >
                {nav.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
