import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { propertyKeyToLabel } from '@/utils/base';
import { Button, Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ElemsRenderer, Preferences } from '@/components';

// import { createCategory, updateCategory } from '@store/actions/categories.action';

const PageCreate = () => {
  const [values] = useState({});

  const handleSave = async () => {};

  const generateTextFieldProps = (key) => ({
    fullWidth: true,
    label: propertyKeyToLabel(key),
    name: key,
    value: values[key],
    variant: 'outlined',
    onChange: () => {}
  });

  const aboutElems = [<TextField {...generateTextFieldProps('categoryName')} />];

  const cardElems = [
    <Preferences hasPublish published={values.published} />,
    <Card>
      <CardHeader title="About" />
      <CardContent>
        <ElemsRenderer elems={aboutElems} />
      </CardContent>
    </Card>,

    <Button color="primary" variant="contained" onClick={handleSave}>
      Save
    </Button>
  ];

  return values && Object.keys(values).length > 0 && <ElemsRenderer elems={cardElems} />;
};

export default PageCreate;
