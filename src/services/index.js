import { API_STATUS, URL } from "../constants";
import axios from "axios";


export const getData = async (selectedColumns, page, filters, offset) => {
    try {
      let url = URL+`videos?page=${page}`;
      Object.entries(filters).forEach(([key, value]) => {
        url = url + `&${key}=${value}`;
      });
      url = url + `&columns=${selectedColumns}`+`&limit=${offset}`;
      const resp = await axios.get(url);
      if (resp.status === 200) {
        return { status: "success", data: resp.data };
      }
      return { status: API_STATUS.ERROR, data: null };
    } catch (e) {
      console.error("Error fetching data:", e);
      return { status: "error", data: null };
    }
  };