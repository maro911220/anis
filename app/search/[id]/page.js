"use client";
import { useEffect } from "react";
import useStore from "@/store/store";
import ListComponent from "@/app/listComponent";

/* Search List */
export default function List(props) {
  const item = useStore((state) => state);
  useEffect(() => {
    item.loadList(props.params);
    return () => {
      // item.listReset();
    };
  }, [props]);
  return (
    <>
      <ListComponent
        list={item.list}
        title={props.params.id.replace(/%20/g, " ")}
      />
    </>
  );
}
