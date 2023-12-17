import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/events ")
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data) ;
      console.log('Received data from SSE:', data);
      console.log('message', data.message);
      console.log('noti:', data.name);

      addNotification(data.message, data.name);
    }

    eventSource.onerror = (error) => {
      console.error('SSE Error: ', error);
      eventSource.close();
    }
    return () => {
      eventSource.close();
    }
  }, [])

  const addNotification = (message, name) => {
    const newNotification = {
      id: Date.now(),
      message,
      name,
    };

    setNotifications(prevNotifications => [...prevNotifications, newNotification]);
  };

  const removeNotification = (id) => {
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
  };

  return (
    <div className="Notification-container">
      <h2>Notification</h2>
      <ul className="notification-list">
        {notifications.map(notification => (
          <li key={notification.id} className="notification-item">
            <div className='content'>
              <strong>{notification.name}</strong>
              <div>{notification.message}</div>
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
