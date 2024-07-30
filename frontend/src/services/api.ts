import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_LINKAPI as string,
});

api.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token !== undefined && token !== '') {
        if (request.headers) {
            request.headers.Authorization = 'Bearer ' + token;
        }
    } else {
        window.location.href = '/'; 
    }

    return request;
});

api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.config.url !== 'users/login') {
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('usuarioAutenticado');
                window.location.href = '/error401';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
