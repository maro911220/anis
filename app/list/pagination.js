"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

// style
const ulStyle = "flex justify-center my-6";
const liStyle =
  "flex justify-center items-center w-8 h-8 ml-[-1px] border text-sm hover:bg-neutral-500 hover:text-white hover:border-transparent dark:border-neutral-500 ";
const disabledStyle =
  "pointer-events-none bg-neutral-500 text-neutral-300 border-neutral-500";

//Pagination
export default function Pagination({ page }) {
  function range(size, start) {
    let starts;
    let values = start % 10;
    if (values <= 5 && values != 0) {
      starts = start - values;
    } else {
      starts = values == 0 ? start - 5 : start - (values - 5);
    }
    return [...Array(size).keys()].map((key) =>
      key + 1 + starts <= page.last_visible_page ? key + 1 + starts : null
    );
  }
  let [loc, setLoc] = useState("");
  let pageList = range(5, page.current_page);
  useEffect(() => {
    setLoc(window.location.href.split("list")[1].split("page")[0]);
  }, []);

  return (
    <>
      <ul className={ulStyle}>
        <MoveButton type={"prevDouble"} page={page} loc={loc} />
        <MoveButton type={"prev"} page={page} loc={loc} />
        {pageList.map((pageItem, index) => {
          return (
            pageItem != null && (
              <li key={index}>
                <Link
                  className={`
                    ${
                      pageItem == page.current_page
                        ? "bg-main text-white border-main"
                        : " "
                    }
                    ${liStyle}
                `}
                  href={`/list/${loc}page=${pageItem}`}
                >
                  {pageItem}
                </Link>
              </li>
            )
          );
        })}
        <MoveButton type={"next"} page={page} loc={loc} />
        <MoveButton type={"nextDouble"} page={page} loc={loc} />
      </ul>
    </>
  );
}

// MoveButton
function MoveButton({ type, page, loc }) {
  let router = useRouter();
  let classed, pageNum;

  // button type
  switch (type) {
    case "prevDouble":
      classed = page.current_page != 1;
      pageNum = 1;
      break;
    case "prev":
      classed = page.current_page != 1;
      pageNum = page.current_page - 1;
      break;
    case "next":
      classed = page.current_page != page.last_visible_page;
      pageNum = page.current_page + 1;
      break;
    case "nextDouble":
      classed = page.current_page != page.last_visible_page;
      pageNum = page.last_visible_page;
      break;
    default:
      break;
  }

  return (
    <>
      <li>
        <a
          href="#none"
          className={`${liStyle} ${
            classed ? "pointer-events-auto" : disabledStyle
          }`}
          onClick={(e) => {
            e.preventDefault();
            router.push(`/list/${loc}page=${pageNum}`);
          }}
        >
          {type == "prevDouble" && <MdKeyboardDoubleArrowLeft />}
          {type == "prev" && <MdKeyboardArrowLeft />}
          {type == "next" && <MdKeyboardArrowRight />}
          {type == "nextDouble" && <MdKeyboardDoubleArrowRight />}
        </a>
      </li>
    </>
  );
}
