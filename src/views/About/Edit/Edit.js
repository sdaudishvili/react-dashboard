import React, { useState } from 'react';
import { propertyKeyToLabel } from '@/utils/base';
import { Button, Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { CardRenderer, Cropper, Editor, ElemsRenderer } from '@/components';
import PropTypes from 'prop-types';

const AboutEdit = ({ saveHandler, initialValues }) => {
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
    <TextField {...generateTextFieldProps('title')} />,
    <TextField {...generateTextFieldProps('shortDescription')} />,
    <TextField {...generateTextFieldProps('contentTitle')} />,
    <CardRenderer title="Description">
      <Editor
        initialValue={values.description}
        onChange={(value) => handleValueUpdate({ field: 'description', value })}
      />
    </CardRenderer>,
    <TextField {...generateTextFieldProps('video')} />
  ];

  const cardElems = [
    <Card>
      <CardHeader title="About" />
      <CardContent>
        <ElemsRenderer elems={aboutElems} />
      </CardContent>
    </Card>,
    <Cropper title="Image" value={values.image} onSelect={(value) => handleValueUpdate({ field: 'image', value })} />,
    <Cropper title="Image" value={values.image2} onSelect={(value) => handleValueUpdate({ field: 'image2', value })} />,

    <Button color="primary" variant="contained" onClick={onSave}>
      Save
    </Button>
  ];

  return <ElemsRenderer elems={cardElems} />;
};

AboutEdit.propTypes = {
  saveHandler: PropTypes.func,
  initialValues: PropTypes.object
};

AboutEdit.defaultProps = {
  saveHandler: () => {},
  initialValues: {}
};

export default AboutEdit;
