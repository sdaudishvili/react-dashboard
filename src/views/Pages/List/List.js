import React from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

const PagesList = ({ data, total }) => {
  return (
    <Box mt={3}>
      {JSON.stringify(data)}
      {total}
    </Box>
  );
};

PagesList.propTypes = {
  data: PropTypes.array,
  total: PropTypes.number
};

PagesList.defaultProps = {
  data: [],
  total: 0
};

export default PagesList;
