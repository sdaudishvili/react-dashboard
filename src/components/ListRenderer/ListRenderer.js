/* eslint-disable react/no-danger */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { propertyKeyToLabel } from '@/utils/base';

const recursivelyGet = (curLevelObjRef, path, level) => {
  if (!curLevelObjRef) return '';
  if (level === path.length - 1) return curLevelObjRef[path[level]];
  return recursivelyGet(curLevelObjRef[path[level]], path, level + 1);
};

const getValueByPath = (obj, path) => {
  return recursivelyGet(obj, path.split('.'), 0);
};

const useStyles = makeStyles((theme) => ({
  inner: {
    minWidth: 700
  },
  actions: {
    whiteSpace: 'nowrap'
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: 52,
    width: 52,
    marginRight: theme.spacing(1)
  },
  deleteButton: {
    marginLeft: theme.spacing(1)
  }
}));

const ListRenderer = (props) => {
  const { items, onDeleteClick, editRoute, displayKeys } = props;

  const classes = useStyles();

  const [deletableItemId, setDeletableItemId] = React.useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeletableItemId(null);
  };

  const handleDeleteButtonClick = (id) => {
    setDeletableItemId(id);
    setIsDeleteModalOpen(true);
  };

  const handleSubmitDeleteButtonClick = () => {
    onDeleteClick(deletableItemId);
    handleDeleteModalClose();
  };

  return (
    <div className={classes.inner}>
      <Table>
        <TableHead>
          <TableRow>
            {displayKeys &&
              displayKeys.map((x) => (
                <TableCell key={x.prop}>{x.title ? x.title : propertyKeyToLabel(x.prop)}</TableCell>
              ))}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items &&
            items.map((item, i) => (
              <TableRow hover key={item.id || JSON.stringify(i)}>
                {displayKeys &&
                  displayKeys.map((x) =>
                    x.imageKey ? (
                      <TableCell key={x.prop}>
                        <div className={classes.nameCell}>
                          <Avatar
                            className={classes.avatar}
                            src={process.env.STATIC_RESOURCES_URL.concat('/', getValueByPath(item, x.imageKey))}
                          >
                            {' '}
                          </Avatar>
                          {x.isHtml ? (
                            <div dangerouslySetInnerHTML={{ __html: String(getValueByPath(item, x.prop)) }} />
                          ) : (
                            <div>{String(getValueByPath(item, x.prop))}</div>
                          )}
                        </div>
                      </TableCell>
                    ) : (
                      <React.Fragment key={x.prop}>
                        {typeof item[x.prop] === 'boolean' ? (
                          <TableCell>
                            {item[x.prop] ? <CheckCircleIcon color="secondary" /> : <CancelIcon color="action" />}
                          </TableCell>
                        ) : (
                          <TableCell>
                            {x.isHtml ? (
                              <div dangerouslySetInnerHTML={{ __html: String(getValueByPath(item, x.prop)) }} />
                            ) : (
                              String(getValueByPath(item, x.prop))
                            )}
                          </TableCell>
                        )}
                      </React.Fragment>
                    )
                  )}
                <TableCell align="right" className={classes.actions}>
                  {editRoute && (
                    <Button
                      color="primary"
                      component={RouterLink}
                      to={`${editRoute}/${item.id}`}
                      size="small"
                      variant="outlined"
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDeleteButtonClick(item.id ? item.id : item)}
                    className={classes.deleteButton}
                    type="submit"
                    color="secondary"
                    variant="contained"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Dialog
        open={isDeleteModalOpen}
        keepMounted
        onClose={handleDeleteModalClose}
        aria-labelledby="alert-dialog-item-title"
        aria-describedby="alert-dialog-item-description"
      >
        <DialogTitle id="alert-dialog-item-title">Delete item</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-item-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteModalClose} color="primary">
            No
          </Button>
          <Button onClick={handleSubmitDeleteButtonClick} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ListRenderer.propTypes = {
  items: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func,
  editRoute: PropTypes.string,
  displayKeys: PropTypes.array.isRequired
};
ListRenderer.defaultProps = {
  onDeleteClick: () => {},
  editRoute: ''
};

export default ListRenderer;
