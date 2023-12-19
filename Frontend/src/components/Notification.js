import React, { useState, useEffect } from 'react';
import './Notification.css';
import { v4 as uuidv4 } from 'uuid';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem('userId');

  const addNotification = (message, name) => {
    const newNotification = {
      id: uuidv4(),
      message,
      name,
      timestamp: new Date().toLocaleString(),
    };

    setNotifications(prevNotifications => [...prevNotifications, newNotification]);
  };

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:3000/events/${userId}`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received data from SSE:', data);
      console.log('message', data.message);
      console.log('noti:', data.name);

      addNotification(data.message, data.name);
    };

    eventSource.onerror = (error) => {
      console.error('SSE Error: ', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // useEffect(() => {
  //   // Gọi hàm addNotification khi component được render để thêm thông báo mặc định
  //   addNotification('This is a permanent notification', 'Default Name');
  // }, []);

  const removeNotification = (id) => {
    // Remove the notification
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
  };

  return (
    <div className="Notification-container">
      <h2>Notification</h2>
      <ul className="notification-list">
        {notifications.map(notification => (
          <li key={notification.id} className="notification-item">
            <div className='notification'>
              <strong className='name'>{notification.name}</strong>
              <div className='content'>
                <p>{notification.message}</p>
                <div>{notification.timestamp}</div>
              </div>
            </div>
            <div className='Delete'>
              <button onClick={() => removeNotification(notification.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
