"use client";
import { useEffect } from "react";
import useStore from "@/store/store";
import ListComponent from "@/app/listComponent";
import { stringify } from "postcss";

export default function List(props) {
  const item = useStore((state) => state);
  useEffect(() => {
    item.loadGenresList(props.searchParams.genres);
  }, []);
  return (
    <>
      <ListComponent
        list={item.generList}
        title={props.params.id.replace("%20", " ")}
      />
    </>
  );
}
