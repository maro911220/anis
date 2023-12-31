import Link from "next/link";
import Loadings from "./loadings";
import { motion } from "framer-motion";

// style
const BoxStyle = "flex justify-between flex-col md:flex-row pb-4 md:py-4";
const titleStyle =
  "text-xl md:text-2xl font-bold uppercase col-main fs-yg text-center md:text-left mt-2 md:mt-0 order-2 md:order-none";
const ulStyle =
  "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  xl:grid-cols-6 gap-2 md:gap-4 mb-8 text-sm md:text-md";
const liStyle =
  "p-2 rounded bg-neutral-100 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-600";
const liImgStyle = "w-full flex-1 mb-2 object-cover rounded";
const liTitleStyle = "font-bold truncate col-main flex-none";
const liSubStyle = "truncate dark:text-slate-100 flex-none";

// ListComponent
export default function ListComponent({ list, title }) {
  const dataCheck = (e) => {
    return e !== "" ? e : "not data";
  };
  return (
    <>
      <h2 className="hidden">List</h2>
      <div className={BoxStyle}>
        <p className={titleStyle}>{dataCheck(title)}</p>
      </div>

      {!list[0] ? (
        <Loadings />
      ) : (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={ulStyle}
        >
          {list.map((item, index) => {
            return (
              <motion.li
                key={index}
                className={liStyle}
                whileHover={{ y: -10 }}
              >
                <Link
                  href={`/detail/${item.mal_id}`}
                  className="flex flex-col w-full h-full"
                >
                  <img
                    className={liImgStyle}
                    src={dataCheck(item.images.jpg.image_url)}
                    alt={dataCheck(item.title)}
                  />
                  <h3 className={liTitleStyle}>{dataCheck(item.title)}</h3>
                  <p className={liSubStyle}>{dataCheck(item.title_japanese)}</p>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </>
  );
}
