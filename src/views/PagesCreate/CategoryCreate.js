import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import useRouter from '@/utils/useRouter';
import deepClone from '@/utils/deepClone';
import { propertyKeyToLabel } from '@/utils/base';
import { ADD, EDIT, getAddEditModeTemplate } from '@/utils/addEditMode';
import { makeStyles } from '@material-ui/styles';
import { Button, Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Page, PageHead, ElemsRenderer, Preferences } from '@/components';

// import { createCategory, updateCategory } from '@store/actions/categories.action';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  }
}));

const modesTemplate = getAddEditModeTemplate('Category');

const CategoryCreate = () => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.match.params;
  // const dispatch = useDispatch();

  // const { categoryById } = useSelector((state) => state.categories);
  const categoryById = {};

  const [values, setValues] = useState({});
  const [mode, setMode] = useState(ADD);

  useEffect(() => {
    if (id) {
      setMode(EDIT);
    }
    if (categoryById) {
      setValues(deepClone(categoryById));
    }
  }, [categoryById]);

  const handleValueUpdate = ({ field, value }) => {
    setValues((values) => ({ ...values, [field]: value }));
  };

  const handleSave = async () => {
    try {
      if (values.id !== null) {
        // await dispatch(updateCategory(values));
      } else {
        // await dispatch(createCategory({ ...removeProperty(values)('id') }));
      }
      router.history.push('/categories');
    } catch (err) {
      console.log(err);
    }
  };

  const generateTextFieldProps = (key) => ({
    fullWidth: true,
    label: propertyKeyToLabel(key),
    name: key,
    value: values[key],
    variant: 'outlined',
    onChange: ({ target: { value } }) => handleValueUpdate({ field: key, value })
  });

  const aboutElems = [<TextField {...generateTextFieldProps('categoryName')} />];

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

    <Button color="primary" variant="contained" onClick={handleSave}>
      Save
    </Button>
  ];

  return (
    <Page className={classes.root} title={modesTemplate.get(mode).title}>
      <PageHead h2="Categories" h1={modesTemplate.get(mode).title} />
      {values && Object.keys(values).length > 0 && <ElemsRenderer elems={cardElems} />}
    </Page>
  );
};

export default CategoryCreate;
