"use client";
import useStore from "@/store/store";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { AiOutlineLink } from "react-icons/ai";
import Loadings from "../../loadings";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// style
const textStyle = "text-neutral-600 dark:text-neutral-400";

export default function Detail(props) {
  const item = useStore((state) => state);
  useEffect(() => {
    item.loadDetail(props.params.id);
    return () => {
      item.listReset();
    };
  }, []);

  return (
    <>
      {item.items[0] ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full my-12"
        >
          <div className="flex gap-4 pb-4 mb-4 border-b items-center sm:items-stretch flex-col sm:flex-row dark:border-neutral-500">
            <img
              className="flex-none rounded w-60 h-auto"
              src={item.items[0].images.jpg.image_url}
            />
            <div className="w-full flex flex-col justify-between mt-8 sm:mt-0 overflow-hidden">
              <div>
                <p className="text-3xl font-bold col-main">
                  {item.items[0].title_japanese}
                </p>
                <p className="text-xl font-bold">{item.items[0].title}</p>
                <div className={textStyle + ` flex gap-4`}>
                  <p>
                    <b>Type : </b> {item.items[0].type}
                  </p>
                  <p>
                    <b>Year : </b>
                    {item.items[0].year}
                  </p>
                  <p>
                    <b>Episodes : </b>
                    {item.items[0].episodes}
                  </p>
                </div>
              </div>

              {/* chara */}
              <div>
                <Swiper
                  modules={[Navigation]}
                  className="w-full mt-8"
                  slidesPerView={"auto"}
                  spaceBetween={4}
                  navigation
                >
                  {item.items[1].map((chara, index) => {
                    return (
                      <SwiperSlide
                        key={index}
                        className="border rounded overflow-hidden dark:border-neutral-500"
                      >
                        <img
                          src={chara.character.images.jpg.image_url}
                          className="w-full h-24 object-cover	"
                        />
                        <p className="text-sm p-1 h-12 text-ellipsis overflow-hidden">
                          {chara.character.name}
                        </p>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="border-b pb-4 mb-4 dark:border-neutral-500">
            <p className="text-xl font-bold mb-2">Synopsis</p>
            <p className={textStyle}>{item.items[0].synopsis}</p>
          </div>
          <div>
            <p className="text-xl font-bold mb-2">news</p>
            {item.items[2].map((news, index) => {
              return (
                <div key={index}>
                  <a
                    className={
                      textStyle + ` inline-flex leading-5 hover:underline`
                    }
                    href={news.url}
                    target="_blank"
                  >
                    <AiOutlineLink className="flex-none text-md" />
                    {news.title}
                  </a>
                </div>
              );
            })}
          </div>
        </motion.div>
      ) : (
        <Loadings />
      )}
    </>
  );
}
