import React from 'react';

const NotificationContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = React.useState([]);

  const enqueue = (notif) => {
    setNotifications((prev) => [...prev, notif]);
  };

  const remove = (notif) => {
    setNotifications((prev) => prev.filter((x) => x.key !== notif.key));
  };

  const value = { notifications, enqueue, remove };
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
