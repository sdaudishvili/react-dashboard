import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import { enableInterceptors } from '@/utils/axios';
import useRouter from '@/utils/useRouter';
import removeAuthTokens from '@/utils/removeAuthTokens';

const getToken = () => Cookies.get('token');

const AuthGuard = (props) => {
  const { children } = props;

  const [isLoaded, setIsLoaded] = React.useState(false);

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
      enableInterceptors({
        handleUnauthorized: handleUnauthorizedRequest
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
