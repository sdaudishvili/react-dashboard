/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import Cookies from 'js-cookie';

import setAuthTokens from '@/utils/setAuthTokens';

const axiosMock = axios.create({
  withCredentials: true
});

export const axiosRemote = axios.create({
  headers: {
    'Accept-Language': 'ka'
  },
  timeout: 3000
});

const shouldIntercept = (error) => {
  try {
    return error.response.status === 401;
  } catch (e) {
    return false;
  }
};

const attachTokenToRequest = (request, token) => {
  request.headers.Authorization = `Bearer ${token}`;
};

const interceptors =
  (axiosInstance) =>
  ({ refreshToken, handleUnauthorized }) => {
    let isRefreshing = false;
    let failedQueue = [];

    const processQueue = (error, token = null) => {
      failedQueue.forEach((prom) => {
        if (error) {
          prom.reject(error);
        } else {
          prom.resolve(token);
        }
      });

      failedQueue = [];
    };

    axiosInstance.interceptors.request.use((config) => {
      attachTokenToRequest(config, Cookies.get('token'));

      return config;
    });

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (!shouldIntercept(error)) {
          return Promise.reject(error);
        }

        if (error.config._retry || error.config._queued) {
          return Promise.reject(error);
        }

        const originalRequest = error.config;
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest._queued = true;
              attachTokenToRequest(originalRequest, token);
              return axiosRemote.request(originalRequest);
            })
            .catch((err) => {
              console.log(err);
              return Promise.reject(error);
            });
        }
        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise((resolve, reject) => {
          refreshToken
            .call(refreshToken, { token: Cookies.get('token'), refreshToken: Cookies.get('refreshToken') })
            .then((tokenData) => {
              const { token, refreshToken } = tokenData;
              setAuthTokens(token, refreshToken);
              attachTokenToRequest(originalRequest, token);
              processQueue(null, token);
              resolve(axiosRemote.request(originalRequest));
            })
            .catch((err) => {
              handleUnauthorized();
              processQueue(err, null);
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }
    );
  };

export const enableInterceptors = interceptors(axiosRemote);

export default axiosMock;
