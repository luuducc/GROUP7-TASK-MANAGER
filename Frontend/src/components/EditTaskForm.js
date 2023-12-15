// EditTaskForm.js
import React from 'react';

const EditTaskForm = ({ editTask, setEditTask, handleEditTask, onClose }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Handle nested properties
    if (name.includes("customNoti")) {
      const [parent, child] = name.split(".");
      setEditTask((prevEditTask) => ({
        ...prevEditTask,
        [parent]: {
          ...prevEditTask[parent],
          [child]: value,
        },
      }));
    } else {
      setEditTask((prevEditTask) => ({
        ...prevEditTask,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditTask();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Sửa Task</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="editTitle">Title:</label>
          <input
            type="text"
            id="editTitle"
            name="title"
            value={editTask.title}
            onChange={handleChange}
          />

          <label htmlFor="editBody">Body:</label>
          <textarea
            id="editBody"
            name="body"
            value={editTask.body}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="editBody">Expired Date:</label>
          <label>
            <input
              id="editExpiredDate"
              name="expiredDate"
              type="datetime-local"
              value={editTask.expiredDate}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="editCustomNotiValue">Custom Notification Value:</label>
          <input
            type="number"
            id="editCustomNotiValue"
            name="customNoti.value"
            value={editTask.customNoti.value}
            onChange={handleChange}
          />

          <label htmlFor="editCustomNotiTime">Custom Notification Time:</label>
          <select
            id="editCustomNotiTime"
            name="customNoti.time"
            value={editTask.customNoti.time}
            onChange={handleChange}
          >
            <option value="day">Day</option>
            <option value="hour">Hour</option>
            <option value="minute">Minute</option>
          </select>

          <button type="submit">Lưu</button>
          <button type="button" onClick={onClose}>
            Hủy
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskForm;
