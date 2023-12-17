import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  // Hàm này sẽ thêm một thông báo mới vào danh sách
  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
    };

    setNotifications(prevNotifications => [...prevNotifications, newNotification]);
  };

  useEffect(() => {
    // Gọi hàm addNotification khi component được render để thêm thông báo mặc định
    addNotification('This is a permanent notification');
  }, []);

  const removeNotification = (id) => {
    // Loại bỏ thông báo khỏi danh sách khi người dùng đóng thông báo
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
  };

  return (
    <div className="Notification-container">
      <h2>Notification</h2>
      <ul className="notification-list">
        {notifications.map(notification => (
          <li key={notification.id} className="notification-item">
            {notification.message}
            <button onClick={() => removeNotification(notification.id)}>Close</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
