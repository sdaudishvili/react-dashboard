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

export const getOne = async (resource, id) => {
  try {
    const res = await axios.get(`${apiBaseUrl}/${resource}/${id}`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const getStatic = async (resource) => {
  try {
    const res = await axios.get(`${apiBaseUrl}/${resource}`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const create = async (resource, values) => {
  try {
    await axios.post(`${apiBaseUrl}/${resource}`, values);
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const updateOne = async (resource, values) => {
  try {
    await axios.put(`${apiBaseUrl}/${resource}/${values.id}`, values);
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const updateStatic = async (resource, values) => {
  try {
    await axios.put(`${apiBaseUrl}/${resource}`, values);
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const deleteOne = async (resource, id) => {
  await axios.delete(`${apiBaseUrl}/${resource}/${id}`);
};
