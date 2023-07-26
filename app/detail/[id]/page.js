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
  const dataCheck = (e) => {
    return e !== "" ? e : "not data";
  };
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
              src={dataCheck(item.items[0].images.jpg.image_url)}
            />
            <div className="w-full flex flex-col justify-between mt-8 sm:mt-0 overflow-hidden">
              <div>
                <h2 className="text-3xl font-bold col-main">
                  {dataCheck(item.items[0].title_japanese)}
                </h2>
                <p className="text-xl font-bold">
                  {dataCheck(item.items[0].title)}
                </p>
                <div className={textStyle + ` flex gap-4`}>
                  <p>
                    <b>Type : </b> {dataCheck(item.items[0].type)}
                  </p>
                  <p>
                    <b>Year : </b>
                    {dataCheck(item.items[0].year)}
                  </p>
                  <p>
                    <b>Episodes : </b>
                    {dataCheck(item.items[0].episodes)}
                  </p>
                </div>
              </div>

              {/* chara */}
              <div>
                <h3 className="text-xl font-bold mt-8 mb-2">Character</h3>
                <Swiper
                  modules={[Navigation]}
                  className="w-full "
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
            <h3 className="text-xl font-bold mb-2">Synopsis</h3>
            <p className={textStyle}>{dataCheck(item.items[0].synopsis)}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">News</h3>
            {item.items[2].length != 0 ? (
              item.items[2].map((news, index) => {
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
              })
            ) : (
              <div> not be found.</div>
            )}
          </div>
        </motion.div>
      ) : (
        <Loadings />
      )}
    </>
  );
}
