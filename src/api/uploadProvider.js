import { axiosRemote as axios } from '@/utils/axios';
import { handleError, handleSuccess } from './handler';
import { apiBaseUrl } from './host';

export const uploadImage = async (payload) => {
  return new Promise((resolve, reject) =>
    axios.post(`${apiBaseUrl}/upload/image`, payload).then(handleSuccess(resolve)).catch(handleError(reject))
  );
};

export const cropImage = async (payload) => {
  return new Promise((resolve, reject) =>
    axios.post(`${apiBaseUrl}/upload/image/crop`, payload).then(handleSuccess(resolve)).catch(handleError(reject))
  );
};
