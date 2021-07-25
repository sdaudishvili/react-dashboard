import React, { useState } from 'react';
import { propertyKeyToLabel } from '@/utils/base';
import { Button, Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ElemsRenderer, Preferences } from '@/components';
import PropTypes from 'prop-types';

const PageCreate = ({ saveHandler }) => {
  const [values, setValues] = useState({});

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
    <TextField {...generateTextFieldProps('image')} />,
    <TextField {...generateTextFieldProps('shortDescription')} />,
    <TextField {...generateTextFieldProps('innerImage')} />,
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

    <Button color="primary" variant="contained" onClick={onSave}>
      Save
    </Button>
  ];

  return <ElemsRenderer elems={cardElems} />;
};

PageCreate.propTypes = {
  saveHandler: PropTypes.func
};

PageCreate.defaultProps = {
  saveHandler: () => {}
};

export default PageCreate;
