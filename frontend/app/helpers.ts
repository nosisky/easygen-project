import axios from "axios";

console.log(
  process.env.NEXT_PUBLIC_API_URL,
  "API URL",
  process.env.NEXT_PUBLIC_API_URL
);
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default api;
