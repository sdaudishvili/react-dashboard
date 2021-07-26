import Dashboard from '@/layouts/Dashboard';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ListProvider, CreateProvider, EditProvider } from '..';

const Resource = (props) => {
  const { name, list, create, edit } = props;

  const baseRoute = `/${name}`;
  const createRoute = `${baseRoute}/create`;
  const editRoute = `${baseRoute}/:id`;

  return (
    <Switch>
      {create && (
        <Route
          exact
          path={createRoute}
          render={() => (
            <Dashboard>
              <CreateProvider resourceName={name} component={create} baseRoute={baseRoute} />
            </Dashboard>
          )}
        />
      )}
      {edit && (
        <Route
          exact
          path={editRoute}
          render={() => (
            <Dashboard>
              <EditProvider resourceName={name} component={edit} baseRoute={baseRoute} />
            </Dashboard>
          )}
        />
      )}
      {list && (
        <Route
          exact
          path={baseRoute}
          render={() => (
            <Dashboard>
              <ListProvider
                resourceName={name}
                component={list}
                createRoute={create && createRoute}
                editRoute={edit && baseRoute}
              />
            </Dashboard>
          )}
        />
      )}
    </Switch>
  );
};

Resource.propTypes = {
  name: PropTypes.string.isRequired,
  list: PropTypes.any,
  create: PropTypes.any,
  edit: PropTypes.any
};

Resource.defaultProps = {
  list: null,
  create: null,
  edit: null
};

export default Resource;
