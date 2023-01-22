import axios from "axios";
import * as AxiosLogger from 'axios-logger';

const axiosInstance = axios.create({
    baseURL: process.env.API_URL || "http://localhost:5000"
});

axiosInstance.interceptors.request.use(AxiosLogger.requestLogger);

export default axiosInstance;