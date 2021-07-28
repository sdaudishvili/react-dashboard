import React, { useState } from 'react';
import { propertyKeyToLabel } from '@/utils/base';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import { ElemsRenderer, Cropper, Preferences, CardRenderer, Editor, MediaList } from '@/components';
import PropTypes from 'prop-types';
import ImageSelector from '@/components/ImageSelector';
import { getUniqueSlug } from '@/api/dataProvider';
import debounce from '@/utils/debounce';
import { studioTypes } from '../utils/types';

const StudioCreate = ({ saveHandler, initialValues }) => {
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
    variant: 'outlined'
  });

  const handleSlugUpdate = () => async (value) => {
    const slug = await getUniqueSlug('agencies', { text: value });
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
      {...generateTextFieldProps('shortDescription')}
      onChange={({ target: { value } }) => handleValueUpdate({ field: 'shortDescription', value })}
    />,
    <FormControl variant="outlined" fullWidth>
      <InputLabel>Type</InputLabel>
      <Select value={values.type || ''} label="Type">
        <MenuItem value="" onClick={() => handleValueUpdate({ field: 'type', value: '' })}>
          <em>None</em>
        </MenuItem>
        {studioTypes.map((option) => (
          <MenuItem value={option.key} onClick={() => handleValueUpdate({ field: 'type', value: option.key })}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
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
    <Cropper
      title="Inner Image Source"
      value={values.innerImage}
      onSelect={(value) => handleValueUpdate({ field: 'innerImage', value })}
    />,
    <CardRenderer>
      <TextField {...generateTextFieldProps('logoTitle')} />
    </CardRenderer>,
    <ImageSelector
      title="Logo Source"
      value={values.logo}
      onSelect={(value) => handleValueUpdate({ field: 'logo', value })}
    />,
    <MediaList items={values.mediaList} onListChange={(value) => handleValueUpdate({ field: 'mediaList', value })} />,

    <Button color="primary" variant="contained" onClick={onSave}>
      Save
    </Button>
  ];

  return <ElemsRenderer elems={cardElems} />;
};

StudioCreate.propTypes = {
  saveHandler: PropTypes.func,
  initialValues: PropTypes.object
};

StudioCreate.defaultProps = {
  saveHandler: () => {},
  initialValues: {}
};

export default StudioCreate;
