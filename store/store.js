import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  list: [],
  items: [],
  navList: [],
  pagination: [],
  // genres load
  loadGenres: async () => {
    await axios.get(`https://api.jikan.moe/v4/genres/anime`).then((res) => {
      set(() => ({ navList: res.data.data }));
    });
  },
  // list load
  loadList: async (e) => {
    let url;
    if (e.id) {
      if (isNaN(e.id)) {
        url = `https://api.jikan.moe/v4/anime?q=${e.id}`;
      } else {
        url = `https://api.jikan.moe/v4/anime?genres=${e.id}&order_by=popularity&page=${e.page}&limit=24`;
      }
    } else url = `https://api.jikan.moe/v4/${e}?limit=24`;

    await axios
      .get(url)
      .then((res) => {
        set(() => ({
          list: [...res.data.data],
          pagination: res.data.pagination,
        }));
      })
      .catch((err) => {
        location.reload();
      });
  },
  loadDetail: async (e) => {
    await axios
      .all([
        axios.get(`https://api.jikan.moe/v4/anime/${e}/full`),
        axios.get(`https://api.jikan.moe/v4/anime/${e}/characters`),
        axios.get(`https://api.jikan.moe/v4/anime/${e}/news`),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          set(() => ({
            items: [res1.data.data, res2.data.data, res3.data.data],
          }));
        })
      )
      .catch((err) => {
        location.reload();
      });
  },
  // reset
  listReset: () => {
    set(() => ({ list: [], items: [], charaList: [] }));
  },
}));

export default useStore;
