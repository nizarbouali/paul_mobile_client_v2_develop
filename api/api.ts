import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CONFIG from "@/config/api";

const { API_BASE_URL, API_VERSION } = CONFIG;
const baseURL = `${API_BASE_URL}${API_VERSION}`;

const request = axios.create({
  baseURL: baseURL,
  // timeout: AxiosConfigs.TIMEOUT,
  headers: { "Access-Control-Allow-Origin": "*" },
});

request.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("authToken");
    const tmpConfigs = { ...config };
    if (token) {
      tmpConfigs.headers.Authorization = `Bearer ${token}`;
    }
    return tmpConfigs;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default request;
