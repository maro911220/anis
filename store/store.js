import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  list: [],
  generList: [],
  pagination: [],
  navList: [],
  items: "",
  loadList: async (e) => {
    await axios.get(`https://api.jikan.moe/v4/${e}`).then((res) => {
      console.log(res.data.data.title);
      if (Array.isArray(res.data.data)) {
        set(() => ({ list: [...res.data.data] }));
      } else {
        set(() => ({ items: res.data.data }));
      }
    });
  },
  loadGenres: async () => {
    await axios.get(`https://api.jikan.moe/v4/genres/anime`).then((res) => {
      set(() => ({ navList: res.data.data }));
    });
  },
  loadGenresList: async (e, page) => {
    await axios
      .get(
        `https://api.jikan.moe/v4/anime?genres=${e}&order_by=popularity&page=${page}`
      )
      .then((res) => {
        console.log(res.data.pagination);
        set(() => ({
          generList: res.data.data,
          pagination: res.data.pagination,
        }));
      });
  },
}));

export default useStore;
