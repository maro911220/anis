"use client";
import { useEffect } from "react";
import useStore from "@/store/store";
import ListComponent from "@/app/listComponent";
import Pagination from "@/app/list/pagination";

/* List */
export default function List(props) {
  const item = useStore((state) => state);
  useEffect(() => {
    setTimeout(() => {
      item.loadList(props.searchParams);
    }, 1000);
    return () => {
      item.listReset();
    };
  }, [props]);
  return (
    <>
      <ListComponent
        list={item.list}
        title={props.params.id.replace(/%2B/g, " ")}
      />
      {item.list[0] && item.pagination && <Pagination page={item.pagination} />}
    </>
  );
}
