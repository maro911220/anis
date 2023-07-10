"use client";
import useStore from "@/store/store";
import { useEffect } from "react";
import Link from "next/link";

export default function List() {
  const item = useStore((state) => state);
  useEffect(() => {
    item.loadList("seasons/now");
  }, []);
  return (
    <>
      <p>New Seasons</p>
      <ul className="grid grid-cols-5	gap-4">
        {item.list.map((item, index) => {
          return (
            <li key={index}>
              <Link href={`/detail/${item.mal_id}`}>
                <img
                  className="w-full"
                  src={item.images.jpg.image_url}
                  alt={item.title}
                />
                <p>{item.title}</p>
                <p>{item.title_japanese}</p>
                <p>{item.episodes}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
