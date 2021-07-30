import React, { useState } from 'react';
import { propertyKeyToLabel } from '@/utils/base';
import { Button, Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ElemsRenderer, Cropper, Preferences, CardRenderer, Editor, MediaList } from '@/components';
import PropTypes from 'prop-types';
import ImageSelector from '@/components/ImageSelector';
import { getUniqueSlug } from '@/api/dataProvider';
import debounce from '@/utils/debounce';

const PageCreate = ({ saveHandler, initialValues }) => {
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
    variant: 'outlined'
  });

  const handleSlugUpdate = () => async (value) => {
    const slug = await getUniqueSlug('pages', { text: value });
    handleValueUpdate({ field: 'slug', value: slug });
  };
  const debouncedHandleSlugUpdate = React.useCallback(debounce(handleSlugUpdate(), 500), []);

  const onTitleChange = ({ target: { value } }) => {
    handleValueUpdate({ field: 'title', value });
    debouncedHandleSlugUpdate(value);
  };

  const aboutElems = [
    <TextField {...generateTextFieldProps('title')} onChange={onTitleChange} />,
    <TextField
      {...generateTextFieldProps('slug')}
      onChange={({ target: { value } }) => handleValueUpdate({ field: 'slug', value })}
    />,
    <TextField
      type="color"
      {...generateTextFieldProps('color')}
      onChange={({ target: { value } }) => handleValueUpdate({ field: 'color', value })}
    />,
    <TextField
      {...generateTextFieldProps('innerTitle')}
      onChange={({ target: { value } }) => handleValueUpdate({ field: 'innerTitle', value })}
    />
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
    <CardRenderer title="Description">
      <Editor
        initialValue={values.description}
        onChange={(value) => handleValueUpdate({ field: 'description', value })}
      />
    </CardRenderer>,
    <Cropper
      title="Image Source"
      value={values.image}
      onSelect={(value) => handleValueUpdate({ field: 'image', value })}
    />,
    <CardRenderer title="Logo">
      <ElemsRenderer
        elems={[
          <TextField {...generateTextFieldProps('logoTitle', { label: 'Title' })} />,
          <ImageSelector
            title="Source"
            value={values.logo}
            onSelect={(value) => handleValueUpdate({ field: 'logo', value })}
          />
        ]}
      />
    </CardRenderer>,

    <MediaList items={values.mediaList} onListChange={(value) => handleValueUpdate({ field: 'mediaList', value })} />,

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
