import React from 'react';

const AddTaskForm = ({ newTask, setNewTask, handleAddTask, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Thêm Task</h3>
        <label>
          Title: 
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
        </label>
        <br />
        <label>
          Body: <br />
          <textarea 
            value={newTask.body}
            onChange={(e) => setNewTask({ ...newTask, body: e.target.value })}
          />
        </label>
        <br />
        <label>
          Expired Date:
          <input
            type="datetime-local"
            value={newTask.expiredDate}
            onChange={(e) => setNewTask({ ...newTask, expiredDate: e.target.value })}
          />
        </label>

        <label>
          Custom Notification Value:
          <input
            type="number"
            value={newTask.customNoti.value}
            onChange={(e) => setNewTask({ ...newTask, customNoti: { ...newTask.customNoti, value: e.target.value } })}
          />
        </label>

        <label>
          Custom Notification Time:
          <select
            value={newTask.customNoti.time}
            onChange={(e) => setNewTask({ ...newTask, customNoti: { ...newTask.customNoti, time: e.target.value } })}
          >
            <option value="day">Day</option>
            <option value="hour">Hour</option>
            <option value="minute">Minute</option>
          </select>
        </label>

        <br />
        <button 
        style={{
          backgroundColor: '#4caf50',
          color: 'white',
        }}
        onClick={handleAddTask}>Thêm</button> 
        <button 
        style={{
          backgroundColor: '#4caf50',
          color: 'white',
        }}
        onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default AddTaskForm;
