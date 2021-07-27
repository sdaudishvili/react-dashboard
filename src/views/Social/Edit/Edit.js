import React, { useState } from 'react';
import { propertyKeyToLabel } from '@/utils/base';
import { Button, Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ElemsRenderer } from '@/components';
import PropTypes from 'prop-types';

const ContactEdit = ({ saveHandler, initialValues }) => {
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
    <TextField {...generateTextFieldProps('facebook')} />,
    <TextField {...generateTextFieldProps('instagram')} />,
    <TextField {...generateTextFieldProps('youtube')} />,
    <TextField {...generateTextFieldProps('twitter')} />,
    <TextField {...generateTextFieldProps('tiktok')} />
  ];

  const cardElems = [
    <Card>
      <CardHeader title="Info" />
      <CardContent>
        <ElemsRenderer elems={aboutElems} />
      </CardContent>
    </Card>,
    <Button color="primary" variant="contained" onClick={onSave}>
      Save
    </Button>
  ];

  return <ElemsRenderer elems={cardElems} />;
};

ContactEdit.propTypes = {
  saveHandler: PropTypes.func,
  initialValues: PropTypes.object
};

ContactEdit.defaultProps = {
  saveHandler: () => {},
  initialValues: {}
};

export default ContactEdit;
