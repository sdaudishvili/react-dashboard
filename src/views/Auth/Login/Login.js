import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, CardMedia, Typography, Divider } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

import { Page } from '@/components';
import gradients from '@/utils/gradients';
import { axiosRemote as axios } from '@/utils/axios';
import { apiBaseUrl } from '@/dataProvider';
import setAuthTokens from '@/utils/setAuthTokens';
import useRouter from '@/utils/useRouter';
import Cookies from 'js-cookie';
import { useUser } from '@/context/userContext';
import { LoginForm } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 2)
  },
  card: {
    width: theme.breakpoints.values.md,
    maxWidth: '100%',
    overflow: 'unset',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  icon: {
    backgroundImage: gradients.green,
    color: theme.palette.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
    fontSize: 32
  },
  loginForm: {
    marginTop: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(2, 0)
  }
}));

const Login = () => {
  const classes = useStyles();
  const { setUser } = useUser();

  const router = useRouter();
  // const dispatch = useDispatch();

  React.useEffect(() => {
    if (Cookies.get('token')) {
      router.history.push('/');
    }
  }, []);

  const login = async (values) => {
    try {
      const { data } = await axios.post(`${apiBaseUrl}/auth/login`, values);
      const { signInResult, token: tokenResponse } = data;
      if (signInResult.succeeded) {
        const { token, refershToken } = tokenResponse;
        setUser(token);
        setAuthTokens(token, refershToken);
        router.history.push('/');
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Page className={classes.root} title="Login">
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <LockIcon className={classes.icon} />
          <Typography gutterBottom variant="h3">
            Sign in
          </Typography>
          <Typography variant="subtitle2">Sign in on the internal platform</Typography>
          <LoginForm className={classes.loginForm} login={login} />
          <Divider className={classes.divider} />
        </CardContent>
        <CardMedia className={classes.media} image="/images/auth.png" title="Cover" />
      </Card>
    </Page>
  );
};

export default Login;
