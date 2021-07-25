import Page from '@/components/Page';
import PageHead from '@/components/PageHead';
import { getMany } from '@/dataProvider';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { firstLetterToUpperCase } from '@/utils/base';

const defaultQuery = {
  q: '',
  take: 5,
  skip: 0
};

const ListProvider = (props) => {
  const { resourceName, component: Component, createRoute } = props;

  const [query] = React.useState({ ...defaultQuery });
  const [resource, setResource] = React.useState({ data: [], meta: 0 });

  React.useEffect(() => {
    const fetchData = async () => {
      const { data = [], meta: { total = 0 } = {} } = await getMany(resourceName, { query });
      setResource({ data, total });
    };
    fetchData();
  }, []);

  const transformedResourceName = firstLetterToUpperCase(resourceName);

  return (
    <Page title={transformedResourceName}>
      <PageHead h2={transformedResourceName} h1="Browse">
        {createRoute && (
          <Button component={RouterLink} to={createRoute} color="primary" variant="contained">
            Create
          </Button>
        )}
      </PageHead>
      <Component {...resource} />
    </Page>
  );
};

ListProvider.propTypes = {
  resourceName: PropTypes.string.isRequired,
  createRoute: PropTypes.string,
  component: PropTypes.any
};

ListProvider.defaultProps = {
  component: null,
  createRoute: null
};

export default ListProvider;
