"use client";
import { useEffect, useState } from "react";
import useStore from "@/store/store";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";

// style
const navStyle =
  "flex w-44 items-center justify-between px-4 relative bg-main text-white rounded cursor-pointer";
const navListStyle =
  "absolute z-10 top-10 right-0 w-full h-40 overflow-auto bg-main rounded";
const navListItemStyle = "px-4 py-1 text-sm  hover:bg-neutral-800";

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
              console.log(name);
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
