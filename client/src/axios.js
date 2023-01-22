import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://todo-4qbe1f1bf-oguzhan76.vercel.app'
});

export default axiosInstance;