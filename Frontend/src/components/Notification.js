import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
    };

    setNotifications(prevNotifications => [...prevNotifications, newNotification]);
  };

  useEffect(() => {
    addNotification('This is a permanent notification');
  }, []);

  const removeNotification = (id) => {
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
  };

  return (
    <div className="Notification-container">
      <h2>Notification</h2>
      <ul className="notification-list">
        {notifications.map(notification => (
          <li key={notification.id} className="notification-item">
            {notification.message}
            <button onClick={() => removeNotification(notification.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
