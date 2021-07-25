import React from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

const Pages = ({ data, total }) => {
  return (
    <Box mt={3}>
      {JSON.stringify(data)}
      {total}
    </Box>
  );
};

Pages.propTypes = {
  data: PropTypes.array,
  total: PropTypes.number
};

Pages.defaultProps = {
  data: [],
  total: 0
};

export default Pages;
