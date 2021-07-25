import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

import CategoryCreate from '@/views/CategoryCreate';
import Categories from '@/views/Categories';
import ErrorLayout from './layouts/Error';
import DashboardLayout from './layouts/Dashboard';
import AuthLayout from './layouts/Auth';

import LoginView from './views/Auth/Login';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/categories" />
  },
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: LoginView
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: lazy(() => import('@/views/Error/Error401'))
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('@/views/Error/Error404'))
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: lazy(() => import('@/views/Error/Error500'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      // categories
      {
        path: '/categories',
        exact: true,
        component: Categories
      },
      {
        path: '/categories/create',
        exact: true,
        component: CategoryCreate
      },
      {
        path: '/categories/create/:id',
        exact: true,
        component: CategoryCreate
      },

      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  }
];

export default routes;
