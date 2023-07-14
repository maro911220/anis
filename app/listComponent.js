import Link from "next/link";
import { motion } from "framer-motion";

export default function ListComponent({ list, title }) {
  return (
    <>
      <p className="py-2 border-b bg-white text-2xl font-bold uppercase col-main">
        {title}
      </p>
      <ul className="grid grid-cols-5 gap-4 my-8">
        {list.map((item, index) => {
          return (
            <motion.li
              key={index}
              className="p-2 rounded bg-neutral-800 dark:bg-slate-100"
              whileHover={{ y: -10 }}
            >
              <Link href={`/detail/${item.mal_id}`}>
                <img
                  className="w-full h-72 object-cover rounded"
                  src={item.images.jpg.image_url}
                  alt={item.title}
                />
                <p className="font-bold truncate col-main">{item.title}</p>
                <p className="truncate text-slate-100">{item.title_japanese}</p>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </>
  );
}
