"use client";
import { useEffect } from "react";
import useStore from "@/store/store";
import ListComponent from "@/app/listComponent";
import Pagination from "@/app/list/pagination";

export default function List(props) {
  const item = useStore((state) => state);
  useEffect(() => {
    item.loadList(props.searchParams);
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
