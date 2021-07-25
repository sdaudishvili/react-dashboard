import React from 'react';

import DashboardLayout from './layouts/Dashboard';
import AuthLayout from './layouts/Auth';

import LoginView from './views/Auth/Login';

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
      // categories
      {
        path: '/categories',
        exact: true,
        component: () => <div>/categories</div>
      },
      {
        path: '/categories/create',
        exact: true,
        component: () => <div>/categories/create</div>
      },
      {
        path: '/categories/create/:id',
        exact: true,
        component: () => <div>/categories/create/:id</div>
      }
    ]
  }
];

export default routes;
