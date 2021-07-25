import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import useRouter from '@/utils/useRouter';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const { NODE_ENV } = process.env;
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const Page = (props) => {
  const { title, children, className, ...rest } = props;
  const classes = useStyles();

  const router = useRouter();

  useEffect(() => {
    if (NODE_ENV !== 'production') {
      return;
    }

    if (window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: router.location.pathname,
        page_name: title
      });
    }
  }, [title, router]);

  return (
    <div {...rest} className={clsx(className, classes.root)}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  className: PropTypes.string
};

Page.defaultProps = {
  children: null,
  title: '',
  className: ''
};

export default Page;
