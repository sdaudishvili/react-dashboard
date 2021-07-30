import React, { useState } from 'react';
import { propertyKeyToLabel } from '@/utils/base';
import { Button, Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ElemsRenderer, Cropper } from '@/components';
import PropTypes from 'prop-types';

const MerchCreate = ({ saveHandler, initialValues }) => {
  const [values, setValues] = useState({ ...initialValues });

  const onSave = () => {
    saveHandler(values);
  };

  const handleValueUpdate = ({ field, value }) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const generateTextFieldProps = (key, { label = '' } = {}) => ({
    fullWidth: true,
    label: label || propertyKeyToLabel(key),
    name: key,
    value: values[key] || '',
    variant: 'outlined',
    onChange: ({ target: { value } }) => handleValueUpdate({ field: key, value })
  });

  const aboutElems = [
    <TextField {...generateTextFieldProps('price')} />,
    <TextField {...generateTextFieldProps('url')} />
  ];

  const cardElems = [
    <Card>
      <CardHeader title="About" />
      <CardContent>
        <ElemsRenderer elems={aboutElems} />
      </CardContent>
    </Card>,
    <Cropper
      title="Image Source"
      value={values.image}
      onSelect={(value) => handleValueUpdate({ field: 'image', value })}
    />,
    <Button color="primary" variant="contained" onClick={onSave}>
      Save
    </Button>
  ];

  return <ElemsRenderer elems={cardElems} />;
};

MerchCreate.propTypes = {
  saveHandler: PropTypes.func,
  initialValues: PropTypes.object
};

MerchCreate.defaultProps = {
  saveHandler: () => {},
  initialValues: {}
};

export default MerchCreate;
