export const handleSuccess = (resolve) => (response) => {
  return resolve(response.data);
};

export const handleError = (reject) => (error) => {
  if (error.response && error.response.data) {
    reject(error.response.data);
  } else {
    reject(error);
  }
};
