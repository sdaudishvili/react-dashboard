import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';

import theme from './theme';
import { ScrollReset, AuthGuard, BaseRoutesProvider } from './components';
import './assets/scss/index.scss';
import { ResourcesProvider } from './components/Base';
import { UserProvider } from './context/userContext';
import { NotificationProvider } from './context/notificationContext';

const history = createBrowserHistory();

const App = () => {
  console.log(process.env.TEST);
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider dense={false}>
        <NotificationProvider>
          <UserProvider>
            <Router history={history}>
              <ScrollReset />
              <AuthGuard>
                <BaseRoutesProvider />
                <ResourcesProvider />
              </AuthGuard>
            </Router>
          </UserProvider>
        </NotificationProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
