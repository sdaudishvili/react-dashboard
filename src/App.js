import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';

// import { renderRoutes } from 'react-router-config';
import theme from './theme';
import { ScrollReset, AuthGuard, Notification } from './components';
import './assets/scss/index.scss';
import { Resource } from './components/Base';
import Pages from './views/Pages';
// import routes from './routes';

const history = createBrowserHistory();

const App = () => {
  const handleNotificationClose = () => {
    // dispatch(removeNotification(key));
  };

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Router history={history}>
          <ScrollReset />
          <AuthGuard>
            {/* {renderRoutes(routes)} */}
            <Resource name="pages" list={Pages} />
          </AuthGuard>
        </Router>
        <Notification onClose={handleNotificationClose} notifications={[]} />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
