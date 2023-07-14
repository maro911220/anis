"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pagination({ page }) {
  function range(size, start) {
    start < 3 ? (start = 1) : (start = start - 2);
    return [...Array(size).keys()].map(
      (key) => key + start <= page.last_visible_page && key + start
    );
  }
  let router = useRouter();
  let pageList = range(5, page.current_page);
  let [loc, setLoc] = useState("");
  useEffect(() => {
    setLoc(window.location.href.split("list")[1].split("&")[0]);
  }, []);

  const liStyle = `flex justify-center items-center w-8 h-8 rounded hover:bg-neutral-800 hover:text-white`;

  return (
    <>
      <ul className="flex justify-center gap-2 my-6">
        <li>
          <a
            className={`${liStyle} bg-neutral-200`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page.current_page - 10 > 0) {
                router.push(`/list/${loc}&page=${page.current_page - 10}`);
              } else {
                alert("없어");
              }
            }}
          >
            prev
          </a>
        </li>
        {pageList.map((pageItem, index) => {
          return (
            <li key={index}>
              <Link
                className={`
                    ${
                      pageItem == page.current_page
                        ? "bg-neutral-800 text-white"
                        : "bg-neutral-200"
                    }
                    ${liStyle}
                `}
                href={`/list/${loc}&page=${pageItem}`}
              >
                {pageItem}
              </Link>
            </li>
          );
        })}
        <li>
          <Link className={`${liStyle} bg-neutral-200`} href="/">
            next
          </Link>
        </li>
      </ul>
    </>
  );
}
