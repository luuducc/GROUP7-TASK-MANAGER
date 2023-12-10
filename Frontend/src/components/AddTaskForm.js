// AddTaskForm.js
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
          Image URL:
          <input
            type="text"
            value={newTask.image}
            onChange={(e) => setNewTask({ ...newTask, image: e.target.value })}
          />
        </label>
        <br />
        <button onClick={handleAddTask}>Thêm</button> 
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default AddTaskForm;
