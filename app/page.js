"use client";
import { useEffect } from "react";
import useStore from "@/store/store";
import ListComponent from "./listComponent";

export default function Home() {
  const item = useStore((state) => state);
  useEffect(() => {
    item.loadList("seasons/now");
    return () => {
      item.listReset();
    };
  }, []);
  return (
    <div>
      <ListComponent list={item.list} title={"seasons"} />
    </div>
  );
}
