import axios from "axios";
import Cookies from 'js-cookie';

const AXIOS = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
})

// Add a request interceptor to the Axios instance
AXIOS.interceptors.request.use(
    (config) => {
        // Get the token from the cookie
        const token = Cookies.get('token');
        // If the token exists, add it to the request's Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Do something with request error here
        return Promise.reject(error);
    }
);

export default AXIOS;