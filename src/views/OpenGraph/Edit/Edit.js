import React, { useState } from 'react';
import { propertyKeyToLabel } from '@/utils/base';
import { Button, Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Cropper, ElemsRenderer } from '@/components';
import PropTypes from 'prop-types';

const OpenGraphEdit = ({ saveHandler, initialValues }) => {
  const [values, setValues] = useState({ ...initialValues });

  const onSave = () => {
    saveHandler(values);
  };

  const handleValueUpdate = ({ field, value }) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const generateTextFieldProps = (key) => ({
    fullWidth: true,
    label: propertyKeyToLabel(key),
    name: key,
    value: values[key] || '',
    variant: 'outlined',
    onChange: ({ target: { value } }) => handleValueUpdate({ field: key, value })
  });

  const aboutElems = [
    <TextField {...generateTextFieldProps('shareTitle')} />,
    <TextField {...generateTextFieldProps('shareDescription')} />,
    <TextField {...generateTextFieldProps('keywords')} />
  ];

  const cardElems = [
    <Card>
      <CardHeader title="Info" />
      <CardContent>
        <ElemsRenderer elems={aboutElems} />
      </CardContent>
    </Card>,
    <Cropper
      title="Share Image"
      value={values.shareImage}
      onSelect={(value) => handleValueUpdate({ field: 'shareImage', value })}
    />,
    <Button color="primary" variant="contained" onClick={onSave}>
      Save
    </Button>
  ];

  return <ElemsRenderer elems={cardElems} />;
};

OpenGraphEdit.propTypes = {
  saveHandler: PropTypes.func,
  initialValues: PropTypes.object
};

OpenGraphEdit.defaultProps = {
  saveHandler: () => {},
  initialValues: {}
};

export default OpenGraphEdit;
