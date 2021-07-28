import DashboardLayout from './layouts/Dashboard';
import AuthLayout from './layouts/Auth';

import LoginView from './views/Auth/Login';
import UserInfo from './views/UserInfo';

const routes = [
  {
    layout: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: LoginView
      }
    ]
  },

  {
    layout: DashboardLayout,
    routes: [
      {
        path: '/account',
        exact: true,
        component: UserInfo
      }
    ]
  }
];

export default routes;
