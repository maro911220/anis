"use client";

import Link from "next/link";
import { Player } from "@lottiefiles/react-lottie-player";
import LottieJson from "public/animation_lkxqapwo.json";
import Loadings from "../loadings";
import { useState } from "react";

/* style */
const box =
  "flex flex-col items-center justify-center fixed top-1/2 left-1/2 translate-y-[-55%] translate-x-[-50%]";
const btn =
  "text-xl py-1 px-4 bg-main text-white rounded transition hover:brightness-125";
const text = "text-xl mb-4 col-main";

/* ERROR */
export default function Error() {
  const [lottieLoad, setLottieLoad] = useState(false);
  return (
    <>
      {lottieLoad == false && <Loadings />}
      <div className={`${box} ${lottieLoad ? "visible" : "hidden"}`}>
        <Player
          loop
          autoplay
          src={LottieJson}
          onEvent={(event) => {
            if (event === "load") setLottieLoad(true);
          }}
          style={{ height: "300px", width: "300px" }}
        />
        <p className={text}>TOO MANY REQUESTS</p>
        <Link className={btn} href="/">
          Back Main
        </Link>
      </div>
    </>
  );
}
