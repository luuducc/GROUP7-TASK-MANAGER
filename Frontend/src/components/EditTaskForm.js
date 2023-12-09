// EditTaskForm.js
import React from 'react';



const EditTaskForm = ({ editTask, setEditTask, handleEditTask, onClose }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prevEditTask) => ({
      ...prevEditTask,
      [name]: value,
    }));
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

          <label htmlFor="editImage">Image:</label>
          <input
            type="text"
            id="editImage"
            name="image"
            value={editTask.image}
            onChange={handleChange}
          />

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
