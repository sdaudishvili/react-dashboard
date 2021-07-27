import React, { useState } from 'react';
import { propertyKeyToLabel } from '@/utils/base';
import { Button, Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ElemsRenderer, ImageSelector, Preferences } from '@/components';
import PropTypes from 'prop-types';

const PageCreate = ({ saveHandler, initialValues }) => {
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
    <TextField {...generateTextFieldProps('slug')} />,
    <TextField {...generateTextFieldProps('shortDescription')} />,
    <TextField {...generateTextFieldProps('logo')} />,
    <TextField {...generateTextFieldProps('logoTitle')} />,
    <TextField {...generateTextFieldProps('description')} />,
    <TextField {...generateTextFieldProps('color')} />
  ];

  const cardElems = [
    <Preferences
      hasPublish
      published={values.published}
      onPublishedValueUpdate={(published) => handleValueUpdate({ field: 'published', value: published })}
    />,
    <Card>
      <CardHeader title="About" />
      <CardContent>
        <ElemsRenderer elems={aboutElems} />
      </CardContent>
    </Card>,
    <ImageSelector
      title="Image Source"
      value={values.image}
      onSelect={(value) => handleValueUpdate({ field: 'image', value })}
    />,
    <ImageSelector
      title="Inner Image Source"
      value={values.innerImage}
      onSelect={(value) => handleValueUpdate({ field: 'innerImage', value })}
    />,

    <Button color="primary" variant="contained" onClick={onSave}>
      Save
    </Button>
  ];

  return <ElemsRenderer elems={cardElems} />;
};

PageCreate.propTypes = {
  saveHandler: PropTypes.func,
  initialValues: PropTypes.object
};

PageCreate.defaultProps = {
  saveHandler: () => {},
  initialValues: {}
};

export default PageCreate;
