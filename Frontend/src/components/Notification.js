import React, { useState, useEffect } from 'react';
import './Notification.css';
import { getUserData } from '../userStorage';
import { v4 as uuidv4 } from 'uuid' // to get the unique value despite the concurrent requests

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = getUserData()._id
  // console.log("hello", userId)
  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:3000/events/${userId}`) // connect to /events api
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data) ;
      console.log('data', data)
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
      // get multi responses from server => id can have the same value!!
      // id: Date.now(), 
      id: uuidv4(),
      message,
      name,
    };

    setNotifications(prevNotifications => [...prevNotifications, newNotification]);
    console.log("noti",notifications)
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
