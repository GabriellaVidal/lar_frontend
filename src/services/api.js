import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  // baseURL: "http://api.orivaiot.tk"
  baseURL: "http://192.168.1.2:3002"
  // baseURL: "http://localhost:3002"
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;