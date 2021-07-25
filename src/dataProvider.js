import axios from 'axios';
import buildQuery from './utils/buildQuery';

const baseUrl = 'https://localhost:44355/api';

// eslint-disable-next-line consistent-return
export const getMany = async (resource, params = {}) => {
  const { query = {} } = params;
  try {
    const res = await axios.get(`${baseUrl}/${resource}${buildQuery(query)}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteResource = async (resource, id) => {
  await axios.delete(`${baseUrl}/${resource}/${id}`);
};
