import { create } from "zustand";
import axios from "axios";

const baseUrl = "https://api.jikan.moe/v4";
const error = () => {
  setTimeout(() => {
    location.reload();
  }, 1500);
};

const useStore = create((set) => ({
  list: [],
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
  loadSchedules: async (day) => {
    await axios
      .get(`${baseUrl}/schedules?filter=${day}`)
      .then((res) => {
        set(() => ({ schedules: res.data.data }));
      })
      .catch((err) => {
        error();
      });
  },
  // list load
  loadList: async (e) => {
    let url;
    if (e.id) {
      if (isNaN(e.id)) {
        url = `${baseUrl}/anime?q=${e.id}`;
      } else {
        url = `${baseUrl}/anime?genres=${e.id}&order_by=popularity&page=${e.page}&limit=24`;
      }
    } else url = `${baseUrl}/${e}?limit=24`;

    await axios
      .get(url)
      .then((res) => {
        set(() => ({
          list: [...res.data.data],
          pagination: res.data.pagination,
        }));
      })
      .catch((err) => {
        error();
      });
  },
  // detail load
  loadDetail: async (e) => {
    await axios
      .all([
        axios.get(`${baseUrl}/anime/${e}/full`),
        axios.get(`${baseUrl}/anime/${e}/characters`),
        axios.get(`${baseUrl}/anime/${e}/news`),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          set(() => ({
            items: [res1.data.data, res2.data.data, res3.data.data],
          }));
        })
      )
      .catch((err) => {
        error();
      });
  },
  // reset
  listReset: () => {
    set(() => ({ list: [], items: [], charaList: [], schedules: [] }));
  },
}));

export default useStore;
