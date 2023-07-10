"use client";
import useStore from "@/store/store";
import { useEffect } from "react";

export default function Detail(props) {
  const item = useStore((state) => state);
  useEffect(() => {
    item.loadList(`anime/${props.params.id}`);
  }, []);
  return <div>{item.items.title}</div>;
}
