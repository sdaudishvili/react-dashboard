import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Card, CardHeader, CardContent, TextField, Button } from '@material-ui/core';

const CardTextField = (props) => {
  const { removeKey, removeFunction, className, title, label, ...rest } = props;

  return (
    <Card className={clsx(className)}>
      <CardHeader title={title} />
      <CardContent style={{ display: 'flex' }}>
        <TextField fullWidth variant="outlined" {...rest} label={label || title} />
        {removeFunction && (
          <Button
            onClick={() => {
              removeFunction(removeKey);
            }}
            color="primary"
            variant="contained"
          >
            Remove
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

CardTextField.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  removeFunction: PropTypes.func,
  removeKey: PropTypes.number
};

CardTextField.defaultProps = {
  className: '',
  title: '',
  label: null,
  removeFunction: undefined,
  removeKey: 0
};

export default CardTextField;
