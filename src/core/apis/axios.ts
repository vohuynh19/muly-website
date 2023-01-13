import axios, { AxiosRequestConfig } from 'axios';

export const BASE_URL = 'http://18.144.54.166';

const requestConfig: AxiosRequestConfig = {
  baseURL: `${BASE_URL}:9000/`,
};

const axiosInstance = axios.create(requestConfig);

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('access-token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    let msg: string = '';
    if (err.response) {
      const status = err.response.status;
      const errData = err.response.data;

      switch (status) {
        case 403: {
          msg = 'You need permission to perform this action';
          break;
        }
        case 405: {
          msg = 'Requested method is not supported';
          break;
        }
        default:
          msg = errData?.Description || errData?.errorMessage || 'An error occurred while sending the request';
          break;
      }
    }
    return Promise.reject(msg);
  },
);

export default axiosInstance;
