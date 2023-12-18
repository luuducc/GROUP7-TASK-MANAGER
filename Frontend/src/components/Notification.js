import React, { useState, useEffect } from 'react';
import './Notification.css';
import { v4 as uuidv4 } from 'uuid';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Load notifications from localStorage
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(storedNotifications);

    // Start interval for updating elapsed time (optional)
    const intervalId = setInterval(() => {
      updateElapsedTime();
    }, 60000);

    return () => {
      clearInterval(intervalId); // Clear interval on component unmount
    };
  }, []);

  const addNotification = (message, name) => {
    const newNotification = {
      id: uuidv4(),
      message,
      name,
      timestamp: Date.now(),
    };

    setNotifications((prevNotifications) => {
      const updatedNotifications = [newNotification, ...prevNotifications];
      // Save updated notifications to localStorage
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
      return updatedNotifications;
    });
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
    // Update localStorage after removing a notification
    localStorage.setItem(
      'notifications',
      JSON.stringify(notifications.filter((notification) => notification.id !== id))
    );
  };

  const updateElapsedTime = () => {
    setNotifications((prevNotifications) => {
      return prevNotifications.map((notification) => ({
        ...notification,
        elapsedTime: calculateTimeElapsed(notification.timestamp),
      }));
    });
  };

  const calculateTimeElapsed = (timestamp) => {
    const currentTime = Date.now();
    const timeDifference = currentTime - timestamp;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `now`;
    }
  };

  return (
    <div className="Notification-container">
      <h2>Notification</h2>
      <ul className="notification-list">
        {notifications.map((notification) => (
          <li key={notification.id} className="notification-item">
            <div className='content'>
              <strong>{notification.name}</strong>
              <div>{notification.message}</div>
              <div style={{ color: '#0766FF' }}>{notification.elapsedTime}</div>
            </div>
            <button onClick={() => removeNotification(notification.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
