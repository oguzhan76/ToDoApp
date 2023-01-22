import axios from "axios";
import * as AxiosLogger from 'axios-logger';

const url = "https://todo-app-oguzhan76.vercel.app";

const axiosInstance = axios.create({
    baseURL: process.env.API_URL || url || "http://localhost:6000"
});

axiosInstance.interceptors.request.use(AxiosLogger.requestLogger);

export default axiosInstance;