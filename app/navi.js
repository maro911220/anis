"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import useStore from "@/store/store";

export default function Navi() {
  const item = useStore((state) => state);
  useEffect(() => {
    item.loadGenres();
    item.loadTest();
  }, []);
  const [navi, setNavi] = useState(false);
  return (
    <nav className="flex-none w-80 sticky">
      <ul className={navi ? "flex" : "hidden" + " md:flex"}>
        <li>
          <Link href="#">LinkTest</Link>
        </li>
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
