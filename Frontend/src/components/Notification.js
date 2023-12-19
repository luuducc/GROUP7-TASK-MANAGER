import React, { useState, useEffect } from 'react';
import './Notification.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [storedTasks, setStoredTasks] = useState();
  

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/tasks/user/${userId}`, {
          headers: {
            token: `Bearer ${token}`
          }
        });
        setStoredTasks(prevTasks => response.data.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };
  
    fetchTasks();
  }, [userId, token]);
  

  useEffect(() => {
    if (storedTasks && storedTasks.length > 0) {
      const newNotifications = storedTasks.map((element) => ({
        title: element.title,
        id: element._id,
        body: element.body,
        expiredDate: element.expiredDate,
        customNoti: element.customNoti,
        elapsedTime: calculateTimeElapsed(element.expiredDate),
        isExpired: isTaskExpired(element.expiredDate)
      }));

      setNotifications(newNotifications);
    }
  }, [storedTasks]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const calculateTimeElapsed = (expiredDate) => {
    const currentTime = Date.now();
    const expirationTime = new Date(expiredDate).getTime();
    const timeDifference = expirationTime - currentTime;
    const seconds = Math.floor(timeDifference / 1000);

    if (seconds > 0) {
      return `${seconds} second${seconds > 1 ? 's' : ''} left`;
    } else {
      return `less than a second left`;
    }
  };

  const isTaskExpired = (expiredDate) => {
    const currentTime = Date.now();
    const expirationTime = new Date(expiredDate).getTime();
    return currentTime > expirationTime;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update elapsedTime and check if task is expired for each notification
      const updatedNotifications = notifications.map((notification) => ({
        ...notification,
        elapsedTime: calculateTimeElapsed(notification.expiredDate),
        isExpired: isTaskExpired(notification.expiredDate)
      }));

      setNotifications(updatedNotifications);
    }, 5000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [notifications]);

  return (
    <div className="Notification-container">
      <h2>Notification</h2>
      <ul className="notification-list">
        {notifications.map((notification) => (
          <li key={notification.id} className={`notification-item ${notification.isExpired ? 'expired' : ''}`}>
            <div className='content'>
              <strong>{notification.title}</strong>
              <div>{notification.body}</div>
              <div style={{ color: notification.isExpired ? 'red' : '#0766FF' }}>{notification.isExpired ? 'Expired' : notification.elapsedTime}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
