import React from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

let displayed = [];

const Notification = (props) => {
  const { onClose, notifications } = props;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  React.useEffect(() => {
    notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
      if (dismissed) {
        closeSnackbar(key);
        return;
      }

      if (displayed.includes(key)) return;

      enqueueSnackbar(message, {
        key,
        ...options,
        onExited: (event, key) => {
          onClose(key);
          removeDisplayed(key);
        }
      });

      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar]);

  return null;
};

Notification.propTypes = {
  onClose: PropTypes.func,
  notifications: PropTypes.array
};

Notification.defaultProps = {
  onClose: () => {},
  notifications: []
};

export default Notification;
