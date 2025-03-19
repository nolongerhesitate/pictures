import axios, { CreateAxiosDefaults } from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 60 * 1000, // one minute
  withCredentials: true
});

instance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default instance;
