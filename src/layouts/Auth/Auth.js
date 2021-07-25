import React, { Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';

// import { useDispatch, useSelector } from 'react-redux';
// import { removeNotification } from '@actions/base.action';
import { Topbar } from './components';

const useStyles = makeStyles((theme) => ({
  content: {
    height: '100%',
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  }
}));

const Auth = (props) => {
  const { route } = props;

  const classes = useStyles();
  // const dispatch = useDispatch();

  return (
    <>
      <Topbar />
      <main className={classes.content}>
        <Suspense fallback={<LinearProgress />}>{renderRoutes(route.routes)}</Suspense>
      </main>
    </>
  );
};

Auth.propTypes = {
  route: PropTypes.object.isRequired
};

export default Auth;
