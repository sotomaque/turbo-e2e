import axios, { type AxiosRequestHeaders } from 'axios';
import { env } from '@env/server.mjs';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      const existingHeaders = config.headers as AxiosRequestHeaders;
      const existingAuthHeader = existingHeaders.get('Authorization') ?? '';
      if (token && token !== existingAuthHeader) {
        const headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        } as unknown as AxiosRequestHeaders;
        config.headers = headers;
      }
    }

    return config;
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    return Promise.reject(error);
  }
);

export const setAPIAuthToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAPIAuthToken = () => {
  api.defaults.headers.common.Authorization = null;
};

export default api;
