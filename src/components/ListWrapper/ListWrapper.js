import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Card, CardActions, TablePagination, CardHeader, Typography, Box } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  },
  divider: {
    transform: 'translateY(-1px)'
  }
}));

const ListWrapper = React.forwardRef((props, ref) => {
  const { count, page, className, children, title, onPageChange, initialRowsPerPage, pagination, action, ...rest } =
    props;
  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  React.useImperativeHandle(ref, () => ({
    resetPagination: () => {
      onPageChange(0, rowsPerPage);
    }
  }));

  const handleChangePage = (event, newPage) => {
    onPageChange(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newValue = event.target.value;
    setRowsPerPage(newValue);
    onPageChange(0, newValue);
  };

  return (
    <Box {...rest} className={clsx(classes.root, className)}>
      {!!count && (
        <Typography color="textSecondary" gutterBottom variant="body2">
          {count} Records found.
          {pagination && (
            <>
              Page {page + 1} of {Math.ceil(count / rowsPerPage)}
            </>
          )}
        </Typography>
      )}

      <Card>
        <CardHeader action={action} title={title} />
        <Divider />
        {children && <PerfectScrollbar>{children}</PerfectScrollbar>}
        {pagination && (
          <>
            <Divider className={classes.divider} />
            <CardActions className={classes.actions}>
              <TablePagination
                component="div"
                count={count}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </CardActions>
          </>
        )}
      </Card>
    </Box>
  );
});

ListWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  count: PropTypes.number,
  title: PropTypes.string,
  onPageChange: PropTypes.func,
  initialRowsPerPage: PropTypes.number,
  pagination: PropTypes.bool,
  action: PropTypes.any,
  page: PropTypes.number
};

ListWrapper.defaultProps = {
  className: '',
  children: null,
  title: '',
  count: 0,
  page: 0,
  onPageChange: () => {},
  initialRowsPerPage: 10,
  pagination: true,
  action: null
};

export default ListWrapper;
