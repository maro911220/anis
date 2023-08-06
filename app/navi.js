"use client";
import { useEffect, useState } from "react";
import useStore from "@/store/store";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";

// style
const navStyle =
  "flex flex-none border md:mr-2 dark:border-neutral-800 w-32 md:w-44 h-10 ml-auto text-xs md:text-sm font-normal items-center justify-between px-2 relative bg-white md:rounded cursor-pointer dark:bg-neutral-600";
const navListStyle =
  "absolute z-10 top-12 right-0 w-full h-40 overflow-auto rounded bg-white border dark:bg-neutral-600 dark:border-neutral-800 ";
const navListItemStyle =
  "px-2 py-1 hover:bg-neutral-200 hover:dark:bg-neutral-900";

// Navi
export default function Navi() {
  const item = useStore((state) => state);
  const [selects, setSelects] = useState(false);
  useEffect(() => {
    item.loadGenres();
  }, []);

  return (
    <>
      <div
        className={navStyle}
        onClick={() => {
          setSelects(!selects);
        }}
      >
        <p>Genres</p>
        <MdKeyboardArrowDown />
        {selects && (
          <AnimatePresence>
            <motion.ul
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              className={navListStyle}
            >
              <Category title={"genres"} item={item.navList} />
            </motion.ul>
          </AnimatePresence>
        )}
      </div>
    </>
  );
}

// Navi Item
function Category({ item, title }) {
  let router = useRouter();
  return (
    <>
      {item.map((nav, index) => {
        return (
          <li
            key={index}
            className={navListItemStyle}
            onClick={() => {
              let name = nav.name.replace(/[ ]/g, "+");
              router.push(
                `/list/${name}?type=${title}&id=${nav.mal_id}&page=1`
              );
            }}
          >
            {nav.name}
          </li>
        );
      })}
    </>
  );
}
