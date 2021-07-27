import Page from '@/components/Page';
import PageHead from '@/components/PageHead';
import { deleteOne, getMany } from '@/dataProvider';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { useSnackbar } from 'notistack';
import { messages } from '@/utils/messages';

const defaultQuery = {
  q: '',
  page: 0,
  perPage: 5
};

const ListProvider = (props) => {
  const { resourceName, resource, component: Component, createRoute, editRoute } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [options, setOptions] = React.useState({ ...defaultQuery });
  const [records, setRecords] = React.useState({ data: [], total: 0 });

  React.useEffect(() => {
    const fetchData = async () => {
      const query = { take: options.perPage, skip: options.page * options.perPage, q: options.q };
      try {
        const { data = [], meta: { total = 0 } = {} } = await getMany(resource, { query });
        setRecords({ data, total });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [options]);

  const deleteHandler = React.useCallback(async (id) => {
    try {
      await deleteOne(resource, id);
      setRecords(({ data, total }) => ({ data: data.filter((x) => x.id !== id), total: total - 1 }));
      enqueueSnackbar(messages.DeleteSuccess, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.ToString(), { variant: 'error' });
      console.log(error);
    }
  }, []);

  return (
    <Page title={resourceName}>
      <PageHead h2={resourceName} h1="Browse">
        {createRoute && (
          <Button component={RouterLink} to={createRoute} color="primary" variant="contained">
            Create
          </Button>
        )}
      </PageHead>
      <Component
        {...records}
        editRoute={editRoute}
        setOptions={setOptions}
        options={options}
        onDeleteClick={deleteHandler}
      />
    </Page>
  );
};

ListProvider.propTypes = {
  resourceName: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  createRoute: PropTypes.string,
  editRoute: PropTypes.string,
  component: PropTypes.any
};

ListProvider.defaultProps = {
  component: null,
  createRoute: null,
  editRoute: null
};

export default ListProvider;
