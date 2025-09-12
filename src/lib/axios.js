import axios from "axios";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "https://mobiversite-shop-1.onrender.com"
});
export default api;
