import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  items: "",
  list: [],
  charaList: [],
  navList: [],
  pagination: [],
  // genres load
  loadGenres: async () => {
    await axios.get(`https://api.jikan.moe/v4/genres/anime`).then((res) => {
      set(() => ({ navList: res.data.data }));
    });
  },
  // list,detail load
  loadList: async (e) => {
    let url = e.id
      ? `https://api.jikan.moe/v4/anime?genres=${e.id}&order_by=popularity&page=${e.page}`
      : `https://api.jikan.moe/v4/${e}`;

    await axios.get(url).then((res) => {
      if (Array.isArray(res.data.data)) {
        set(() => ({
          list: [...res.data.data],
          pagination: res.data.pagination,
        }));
      } else {
        set(() => ({ items: res.data.data }));
      }
    });
  },
  // loadChar
  loadChar: async (e) => {
    await axios.get(`https://api.jikan.moe/v4/${e}`).then((res) => {
      console.log(res);
      set(() => ({ charaList: [...res.data.data] }));
    });
  },
  // reset
  listReset: () => {
    set(() => ({ list: [], items: [], charaList: [] }));
  },
}));

export default useStore;
