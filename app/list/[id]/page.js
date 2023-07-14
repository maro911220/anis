"use client";
import { useEffect } from "react";
import useStore from "@/store/store";
import ListComponent from "@/app/listComponent";
import Pagination from "@/app/pagination";

export default function List(props) {
  const item = useStore((state) => state);
  useEffect(() => {
    item.loadGenresList(props.searchParams.genres, props.searchParams.page);
  }, [props]);
  return (
    <>
      <ListComponent
        list={item.generList}
        title={props.params.id.replace("%20", " ")}
      />
      {item.pagination && <Pagination page={item.pagination} />}
    </>
  );
}
