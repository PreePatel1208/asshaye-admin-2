import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:2500",
})

export const interceptor=()=>{axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
  )}
  interceptor()

  export default axiosInstance