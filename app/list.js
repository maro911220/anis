"use client";
import useStore from "@/store/store";

export default function List() {
  const item = useStore((state) => state);
  return (
    <>
      <div>{item.counts}</div>
      <button
        onClick={() => {
          item.increase();
        }}
      >
        이벤트 테스트
      </button>
    </>
  );
}
