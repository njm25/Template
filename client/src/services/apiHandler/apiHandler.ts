import axios from "axios";
import { toast } from "react-toastify";

const apiHandler = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

apiHandler.interceptors.response.use(
  (response) => {
    toast.success(response.data);
    return response;
},
  (error) => {
    toast.error(error.response.data);
    return error.response.data;
  }
);

export default apiHandler;