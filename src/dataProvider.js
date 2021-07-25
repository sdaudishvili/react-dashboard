import { axiosRemote as axios } from '@/utils/axios';
import buildQuery from './utils/buildQuery';

export const apiBaseUrl = 'https://localhost:44355/api';

// eslint-disable-next-line consistent-return
export const getMany = async (resource, params = {}) => {
  const { query = {} } = params;
  try {
    const res = await axios.get(`${apiBaseUrl}/${resource}${buildQuery(query)}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteResource = async (resource, id) => {
  await axios.delete(`${apiBaseUrl}/${resource}/${id}`);
};
