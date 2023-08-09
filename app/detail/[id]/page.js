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

/* style */
const textStyle = "text-sm lg:text-base text-neutral-600 dark:text-neutral-300";
const boxStyle =
  "p-2 my-2 rounded bg-neutral-100 border border-neutral-200 md:p-4 md:my-4 dark:border-neutral-700 dark:bg-neutral-600";
const titleBox =
  "flex gap-4 items-center sm:items-stretch flex-col  sm:flex-row";
const posterStyle = "flex-none rounded w-60 h-auto";
const detailBox = "w-full flex flex-col justify-between overflow-hidden";
const titleStyle = "text-base lg:text-xl font-bold mb-2";
const jpTitleStyle = "text-xl font-bold col-main md:text-2xl lg:text-3xl";
const slideStyle =
  "border rounded bg-white overflow-hidden dark:border-neutral-700 dark:bg-neutral-800";
const slideTextStyle = "text-sm p-1 h-12 text-ellipsis overflow-hidden";
const slideImgStyle = "w-full h-20 object-cover";

/* Detail */
export default function Detail(props) {
  const item = useStore((state) => state);
  const dataCheck = (e) => {
    return e !== "" ? e : "not data";
  };
  useEffect(() => {
    item.loadDetail(props.params.id);
  }, []);

  return (
    <>
      {item.items[0] ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full my-4 md:my-14"
        >
          {/* titlebox */}
          <div className={`${boxStyle} ${titleBox}`}>
            <img
              className={posterStyle}
              src={dataCheck(item.items[0].images.jpg.image_url)}
            />
            <div className={detailBox}>
              <div>
                <h2 className={jpTitleStyle}>
                  {dataCheck(item.items[0].title_japanese)}
                </h2>
                <p className={titleStyle}>{dataCheck(item.items[0].title)}</p>
                <div className={textStyle + ` !text-sm flex flex-wrap gap-x-2`}>
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
                  <p>
                    <b>Score : </b>
                    {dataCheck(item.items[0].score)}
                  </p>
                  <p>
                    <b>Studio : </b>
                    {item.items[0].studios.map((studio, index) => (
                      <span key={index}>{dataCheck(studio.name)}</span>
                    ))}
                  </p>
                </div>
              </div>

              {/* chara */}
              <div>
                <h3 className={`${titleStyle} mt-8 mb-2`}>Character</h3>
                <Swiper
                  modules={[Navigation]}
                  className="w-full "
                  slidesPerView={"auto"}
                  spaceBetween={4}
                  navigation
                >
                  {item.items[1].map((chara, index) => {
                    return (
                      <SwiperSlide key={index} className={slideStyle}>
                        <img
                          src={chara.character.images.jpg.image_url}
                          className={slideImgStyle}
                        />
                        <p className={slideTextStyle}>{chara.character.name}</p>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
          {/* Synopsis */}
          <div className={boxStyle}>
            <h3 className={`${titleStyle} mb-2`}>Synopsis</h3>
            <p className={textStyle}>{dataCheck(item.items[0].synopsis)}</p>
          </div>
          {/* News */}
          <div className={boxStyle}>
            <h3 className={`${titleStyle} mb-2`}>News</h3>
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
              <div className={textStyle}> not be found.</div>
            )}
          </div>
        </motion.div>
      ) : (
        <Loadings />
      )}
    </>
  );
}
