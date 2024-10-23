import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const axiosIns = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export default axiosIns;
