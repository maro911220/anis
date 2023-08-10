"use client";
import Link from "next/link";
import Loadings from "./loadings";
import useStore from "@/store/store";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";

/* style Home */
const titleStyle =
  "fs-yg text-xl text-center font-bold uppercase col-main mt-2 order-2 md:text-2xl md:text-left md:mt-0 md:order-none";
const boxStyle = "flex flex-col justify-between pb-4 md:flex-row md:py-4";
const contentBox = "flex flex-col items-start gap-2 mb-8 md:flex-row md:gap-4";
const conetntList =
  "top-24 w-full flex flex-none flex-row rounded overflow-hidden border md:sticky md:w-36 md:flex-col md:gap-2 md:order-2 md:border-none dark:border-neutral-700";
const contentListItem =
  "transition bg-neutral-100 flex-1 text-xs sm:text-sm md:text-lg md:rounded md:border dark:bg-neutral-600 dark:border-neutral-700 hover:bg-neutral-200 hover:dark:bg-neutral-700";
const contentListItemActive = "bg-main text-white border-transparent";
const conetntListBtn = "w-full h-8 uppercase md:h-10";
const scheduleLayout = "w-full flex-1";

/* Style Schedules */
const scheduleList = "grid grid-cols-1 gap-2 w-full";
const scheduleLink = "w-full h-full flex gap-2";
const scheduleListItem =
  "transition bg-neutral-100 p-2 border border-neutral-200 rounded dark:border-neutral-700 dark:bg-neutral-600 hover:bg-neutral-200 hover:dark:bg-neutral-700";
const scheduleListBox = "flex flex-col flex-1 justify-between overflow-hidden";
const scheduleLisImg = "w-16 h-24 object-cover rounded";
const scheduleListTitle = "text-sm truncate md:text-base";
const scheduleListTitleJp = "col-main font-bold";
const scheduleListCategory = "flex flex-wrap gap-x-2";
const scheduleListCategoryText = "text-xs";

/* Home */
export default function Home() {
  const item = useStore((state) => state);
  useEffect(() => {
    if (item.seasons.length == 0) item.loadSeasons();
    item.loadSchedules("monday");
  }, []);

  return (
    <>
      {!item.seasons[0] ? (
        <Loadings />
      ) : (
        <>
          <Top items={item.seasons} />
          <Schedules item={item} />
        </>
      )}
    </>
  );
}

/* Seasons */
function Top({ items }) {
  return (
    <>
      {/* title */}
      <div className={boxStyle}>
        <p className={titleStyle}>seasons</p>
      </div>
      {/* swiper */}
      <Swiper
        loop={1}
        speed={10000}
        modules={[Autoplay, FreeMode]}
        className="w-full main-swiper mb-6 md:mb-12"
        slidesPerView={"auto"}
        spaceBetween={8}
        freeMode={true}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
        }}
      >
        {items.map((item, index) => {
          return (
            <SwiperSlide key={index} className="!h-auto">
              <Link href={`/detail/${item.mal_id}`}>
                <img
                  src={item.images.jpg.image_url}
                  className="w-full h-full object-cover rounded"
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

/* Schedules */
function Schedules({ item }) {
  const [btnActive, setBtnActive] = useState(0);
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  return (
    <>
      {/* title */}
      <div className={boxStyle}>
        <p className={titleStyle}>schedule</p>
      </div>
      {/* content */}
      <div className={contentBox}>
        {/* day List */}
        <ul className={conetntList}>
          {days.map((day, index) => {
            return (
              <li
                key={index}
                className={`${contentListItem} ${
                  index === btnActive && contentListItemActive
                }`}
              >
                <button
                  className={conetntListBtn}
                  onClick={() => {
                    item.loadSchedules(day);
                    setBtnActive(index);
                  }}
                >
                  {day.slice(0, 3)}
                </button>
              </li>
            );
          })}
        </ul>
        {/* schedule List */}
        <div className={scheduleLayout}>
          {!item.schedules[0] ? (
            <Loadings />
          ) : (
            <motion.ul
              className={scheduleList}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {item.schedules.map((sch, index) => {
                return (
                  <li className={scheduleListItem} key={index}>
                    <Link
                      href={`/detail/${sch.mal_id}`}
                      className={scheduleLink}
                    >
                      <img
                        className={scheduleLisImg}
                        src={sch.images.jpg.image_url}
                        alt={sch.title_japanese}
                      />
                      <div className={scheduleListBox}>
                        <div>
                          <p
                            className={`${scheduleListTitleJp} ${scheduleListTitle}`}
                          >
                            {sch.title_japanese}
                          </p>
                          <p className={scheduleListTitle}>{sch.title}</p>
                        </div>
                        <div className={scheduleListCategory}>
                          {sch.genres.map((genres, index) => {
                            return (
                              <p
                                key={index}
                                className={scheduleListCategoryText}
                              >
                                {genres.name}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </div>
      </div>
    </>
  );
}
