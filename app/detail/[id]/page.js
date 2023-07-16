"use client";
import useStore from "@/store/store";
import { useEffect } from "react";
import Loadings from "../../loadings";

export default function Detail(props) {
  const item = useStore((state) => state);
  useEffect(() => {
    item.loadList(`anime/${props.params.id}/full`);
    item.loadChar(`anime/${props.params.id}/characters`);
    return () => {
      item.listReset();
    };
  }, []);
  return (
    <>
      {item.items.images ? (
        <div>
          <img src={item.items.images.jpg.image_url} />
          <p>{item.items.title}</p>
          <p>{item.items.title_japanese}</p>
          <p>{item.items.type}</p>
          <p>{item.items.year}</p>
          <p>{item.items.episodes}</p>
          <p>{item.items.synopsis}</p>
          <iframe
            width="100%"
            height="auto"
            src={`${item.items.trailer.embed_url}`}
          ></iframe>
          {/* chara */}
          {item.charaList.map((chara, index) => {
            return (
              <div key={index}>
                <p>{chara.character.name}</p>
                <img src={chara.character.images.jpg.image_url} />
              </div>
            );
          })}
        </div>
      ) : (
        <Loadings />
      )}
    </>
  );
}
