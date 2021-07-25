import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';

// import { renderRoutes } from 'react-router-config';
import theme from './theme';
import { ScrollReset, AuthGuard, Notification, BaseRoutesProvider } from './components';
import './assets/scss/index.scss';
// import { ResourcesProvider } from './components/Base';
import { ResourcesProvider } from './components/Base';
import { UserProvider } from './userContext';
// import { ResourcesProvider } from './components/Base';
// import routes from './routes';

const history = createBrowserHistory();

const App = () => {
  const handleNotificationClose = () => {
    // dispatch(removeNotification(key));
  };

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <UserProvider>
          <Router history={history}>
            <ScrollReset />
            <AuthGuard>
              <BaseRoutesProvider />
              <ResourcesProvider />
            </AuthGuard>
          </Router>
        </UserProvider>
        <Notification onClose={handleNotificationClose} notifications={[]} />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
