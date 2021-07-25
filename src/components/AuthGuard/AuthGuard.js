import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
// import { useDispatch } from 'react-redux';

import { enableInterceptors } from '@/utils/axios';
import useRouter from '@/utils/useRouter';
import removeAuthTokens from '@/utils/removeAuthTokens';
// import parseJWT from '@/utils/parseJWT';

// import { refreshToken, setSessionUser } from '@actions/account.action';

const getToken = () => Cookies.get('token');

const AuthGuard = (props) => {
  const { children } = props;

  const [isLoaded, setIsLoaded] = React.useState(false);

  // const dispatch = useDispatch();
  const router = useRouter();

  const redirectToLogin = () => router.history.push('/auth/login');

  useEffect(() => {
    const handleUnauthorizedRequest = () => {
      removeAuthTokens();
      redirectToLogin();
      /// logout
    };

    const token = getToken();

    if (token) {
      // dispatch(setSessionUser(parseJWT(token)));
      enableInterceptors({
        handleUnauthorized: handleUnauthorizedRequest,
        // refreshToken: (args) => dispatch(refreshToken(args))
        refreshToken: () => () => {}
      });
    }

    if (!isLoaded) setIsLoaded(true);
  }, [router]);

  useEffect(() => {
    if (!getToken()) redirectToLogin();
    if (!isLoaded) setIsLoaded(true);
  }, []);

  return <>{isLoaded && children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthGuard;
