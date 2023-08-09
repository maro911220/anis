import { create } from "zustand";
import axios from "axios";

const baseUrl = "https://api.jikan.moe/v4";
const delay = 1000;
axios.interceptors.response.use(undefined, async (err) => {
  const { config, message } = err;
  return axios.get(config.url);
});

const useStore = create((set) => ({
  list: [],
  seasons: [],
  items: [],
  navList: [],
  schedules: [],
  pagination: [],
  // genres load
  loadGenres: async () => {
    await axios.get(`${baseUrl}/genres/anime`).then((res) => {
      set(() => ({ navList: res.data.data }));
    });
  },
  // schedules load
  loadSchedules: async (day) => {
    set(() => ({ schedules: [] }));
    setTimeout(() => {
      axios.get(`${baseUrl}/schedules?filter=${day}`).then((res) => {
        set(() => ({ schedules: res.data.data }));
      });
    }, delay);
  },
  // list load
  loadList: async (e) => {
    let url;
    set(() => ({ list: [] }));
    if (isNaN(e.id)) url = `anime?q=${e.id}`;
    else url = `anime?genres=${e.id}&order_by=popularity&page=${e.page}`;
    setTimeout(() => {
      axios.get(`${baseUrl}/${url}&limit=24`).then((res) => {
        set(() => ({
          list: [...res.data.data],
          pagination: res.data.pagination,
        }));
      });
    }, delay);
  },
  // seasons load
  loadSeasons: async () => {
    setTimeout(() => {
      axios.get(`${baseUrl}/seasons/now?limit=24`).then((res) => {
        set(() => ({ seasons: [...res.data.data] }));
      });
    }, delay);
  },
  // detail load
  loadDetail: async (e) => {
    set(() => ({ items: [] }));
    setTimeout(() => {
      axios
        .all([
          axios.get(`${baseUrl}/anime/${e}/full`),
          axios.get(`${baseUrl}/anime/${e}/characters`),
          axios.get(`${baseUrl}/anime/${e}/news`),
        ])
        .then(
          axios.spread((res1, res2, res3) => {
            set(() => ({
              items: [
                res1.data.data,
                res2.data.data.slice(0, 16),
                res3.data.data.slice(0, 5),
              ],
            }));
          })
        );
    }, delay);
  },
}));

export default useStore;
