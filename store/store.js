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
}));

export default useStore;
