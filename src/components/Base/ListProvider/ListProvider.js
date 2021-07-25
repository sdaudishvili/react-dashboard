import Page from '@/components/Page';
import PageHead from '@/components/PageHead';
import { deleteResource, getMany } from '@/dataProvider';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { firstLetterToUpperCase } from '@/utils/base';

const defaultQuery = {
  q: '',
  page: 0,
  perPage: 5
};

const ListProvider = (props) => {
  const { resourceName, component: Component, createRoute, editRoute } = props;

  const [options, setOptions] = React.useState({ ...defaultQuery });
  const [resource, setResource] = React.useState({ data: [], meta: 0 });

  React.useEffect(() => {
    const fetchData = async () => {
      const query = { take: options.perPage, skip: options.page * options.perPage, q: options.q };
      try {
        const { data = [], meta: { total = 0 } = {} } = await getMany(resourceName, { query });
        setResource({ data, total });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [options]);

  const deleteHandler = React.useCallback(async (id) => {
    await deleteResource(resourceName, id);
    setResource(({ data, total }) => ({ data: data.filter((x) => x.id !== id), total: total - 1 }));
  }, []);

  const transformedResourceName = React.useMemo(() => firstLetterToUpperCase(resourceName), [resourceName]);

  return (
    <Page title={transformedResourceName}>
      <PageHead h2={transformedResourceName} h1="Browse">
        {createRoute && (
          <Button component={RouterLink} to={createRoute} color="primary" variant="contained">
            Create
          </Button>
        )}
      </PageHead>
      <Component
        {...resource}
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
