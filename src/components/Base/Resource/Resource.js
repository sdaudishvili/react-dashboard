import Dashboard from '@/layouts/Dashboard';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ListProvider } from '..';

const Resource = (props) => {
  const { name, list, create, edit } = props;
  const CreateComponent = create;
  const EditComponent = edit;

  const basePath = `/${name}`;
  const createRoute = `${basePath}/create`;
  const editRoute = `${basePath}/:id`;

  return (
    <Switch>
      {create && <Route path={createRoute} render={() => <CreateComponent />} />}
      {edit && <Route path={editRoute} render={() => <EditComponent />} />}
      {list && (
        <Route
          path={basePath}
          render={() => (
            <Dashboard>
              <ListProvider resourceName={name} component={list} createRoute={create && createRoute} />
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
