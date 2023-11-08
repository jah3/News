import axios from "axios";

const AXIOS = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
})
AXIOS.interceptors.response.use((response) => {
        return response
    }, (error) => {
        return Promise.reject(error);
    }
)

export default AXIOS;