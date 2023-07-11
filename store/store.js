import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  list: [],
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
      console.log(res);
    });
  },
  loadTest: async () => {
    await axios
      .get("https://api.jikan.moe/v4/anime?genre=Action")
      .then((res) => {
        console.log(res);
      });
  },
}));

export default useStore;
