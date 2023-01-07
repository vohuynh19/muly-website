import axios, { AxiosRequestConfig } from "axios";

const requestConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BASE_API_URL,
};

const axiosInstance = axios.create(requestConfig);

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.baseURL = "http://localhost:4000";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    let msg: string = "";
    if (err.response) {
      const status = err.response.status;
      const errData = err.response.data;

      switch (status) {
        case 403: {
          msg = "You need permission to perform this action";
          break;
        }
        case 405: {
          msg = "Requested method is not supported";
          break;
        }
        default:
          msg =
            errData?.Description ||
            errData?.errorMessage ||
            "An error occurred while sending the request";
          break;
      }
    }
    return Promise.reject(msg);
  }
);

export default axiosInstance;
