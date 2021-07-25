/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import Cookies from 'js-cookie';

import setAuthTokens from '@/utils/setAuthTokens';

export const axiosRemote = axios.create({
  headers: {
    'Accept-Language': 'ka'
  },
  timeout: 3000
});

const isUnauthorized = (error) => {
  try {
    return error.response.status === 401;
  } catch (e) {
    return false;
  }
};

const interceptors =
  (axiosInstance) =>
  ({ handleUnauthorized }) => {
    axiosInstance.interceptors.request.use((config) => {
      const token = Cookies.get('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log('error');

        if (isUnauthorized(error)) {
          handleUnauthorized();
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );
  };

export const enableInterceptors = interceptors(axiosRemote);
