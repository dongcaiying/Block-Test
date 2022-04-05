import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/apis',
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: any) => {
    const { response } = error;
    if (response) {
      Promise.reject(response.data);
    }
    message.error('网络连接异常,请稍后再试!');
  }
);
export default axiosInstance;
