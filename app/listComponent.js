import Link from "next/link";
import { motion } from "framer-motion";
import Navi from "./navi";
import Loadings from "./loadings";

// style
const BoxStyle = "flex justify-between py-4";
const titleStyle = "text-2xl font-bold uppercase col-main fs-yg";
const ulStyle = "grid grid-cols-5 gap-4 mb-8";
const liStyle = "p-2 rounded bg-neutral-800 dark:bg-neutral-600";
const liImgStyle = "w-full h-96 object-cover rounded";
const liTitleStyle = "font-bold truncate col-main";
const liSubStyle = "truncate text-slate-100 ";

// ListComponent
export default function ListComponent({ list, title }) {
  return (
    <>
      <div className={BoxStyle}>
        <p className={titleStyle}>{title}</p>
        <Navi />
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
                <Link href={`/detail/${item.mal_id}`}>
                  <img
                    className={liImgStyle}
                    src={item.images.jpg.image_url}
                    alt={item.title}
                  />
                  <p className={liTitleStyle}>{item.title}</p>
                  <p className={liSubStyle}>{item.title_japanese}</p>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </>
  );
}
