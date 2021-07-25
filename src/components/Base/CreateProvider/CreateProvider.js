import Page from '@/components/Page';
import PageHead from '@/components/PageHead';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { firstLetterToUpperCase } from '@/utils/base';

const CreateProvider = (props) => {
  const { resourceName, component: Component, baseRoute } = props;

  const transformedResourceName = firstLetterToUpperCase(resourceName);

  return (
    <Page title="Create">
      <PageHead h2={transformedResourceName} h1="Create">
        {baseRoute && (
          <Button component={RouterLink} to={baseRoute} color="primary" variant="contained">
            Return to list
          </Button>
        )}
      </PageHead>
      <Component />
    </Page>
  );
};

CreateProvider.propTypes = {
  resourceName: PropTypes.string.isRequired,
  baseRoute: PropTypes.string,
  component: PropTypes.any
};

CreateProvider.defaultProps = {
  component: null,
  baseRoute: null
};

export default CreateProvider;
