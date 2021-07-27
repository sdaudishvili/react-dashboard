import Page from '@/components/Page';
import PageHead from '@/components/PageHead';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { getStatic, updateStatic } from '@/dataProvider';
import { useSnackbar } from 'notistack';
import { messages } from '@/utils/messages';
import { generateErrorMsg } from '@/utils/messages/generateErrorMsg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  }
}));

const EditProvider = (props) => {
  const { resourceName, resource, component: Component } = props;
  const [record, setRecord] = React.useState({});
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStatic(resource);
        setRecord(res);
      } catch (err) {
        if (err.errors) {
          err.errors.forEach((err) => enqueueSnackbar(generateErrorMsg(err), { variant: 'error' }));
        } else {
          enqueueSnackbar(err.toString(), { variant: 'error' });
        }
      }
    };
    fetchData();
  }, []);

  const saveHandler = async (values) => {
    try {
      await updateStatic(resource, values);
      enqueueSnackbar(messages.UpdateSuccess, { variant: 'success' });
    } catch (err) {
      if (err.errors) {
        err.errors.forEach((err) => enqueueSnackbar(generateErrorMsg(err), { variant: 'error' }));
      } else {
        enqueueSnackbar(err.toString(), { variant: 'error' });
      }
    }
  };

  return (
    <Page className={classes.root} title="Edit">
      <PageHead h2={resourceName} h1="Edit" />
      {Object.keys(record).length > 0 && <Component saveHandler={saveHandler} initialValues={record} />}
    </Page>
  );
};

EditProvider.propTypes = {
  resourceName: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  component: PropTypes.any
};

EditProvider.defaultProps = {
  component: null
};

export default EditProvider;
