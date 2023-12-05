
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from './EditTaskForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', body: '', image: '' });
  const [editTask, setEditTask] = useState(null);
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  // const [selectedTaskId, setSelectedTaskId] = useState(null);


  useEffect(() => {
    // Fetch tasks from the API when the component mounts
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tasks');
        setTasks(response.data.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleAddTask = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/tasks', newTask);
      setTasks([...tasks, response.data.data]);
      setNewTask({ title: '', body: '', image: '' });
      setAddPopupOpen(false);

      toast.success('Task added successfully!');
    } catch (error) {
      console.error('Error adding task:', error.message);
      toast.error('Error adding task');
    }
  };

  const handleEditTask = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/tasks/${editTask._id}`, editTask);
      setTasks(tasks.map((task) => (task._id === editTask._id ? response.data.data : task)));
      setEditTask(null);
      setEditPopupOpen(false);

      toast.success('Task edited successfully!');
    } catch (error) {
      console.error('Error editing task:', error.message);
      toast.error('Error editing task');
    }
  };
  

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));

      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error.message);
      toast.error('Error deleting task');
    }
  };

  return (
    <div className="task-list-container">
      <ToastContainer />
      <h2>Task List</h2>
      <button onClick={() => setAddPopupOpen(true)}>Thêm</button>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <strong>{task.title}</strong>
            <p>{task.body}</p>
            <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
            <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
            {/* Thay đổi button "Sửa" để gọi hàm mở form sửa */}
            <button onClick={() => {
              const taskId = task._id;
              setEditTask(tasks.find(task => task._id === taskId));
              setEditPopupOpen(true);
            }}>Sửa</button>



            <button onClick={() => handleDeleteTask(task._id)}>Xoá</button>
          </li>
        ))}
      </ul>

      {/* Add Task Form */}
      {isAddPopupOpen && (
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          handleAddTask={handleAddTask}
          onClose={() => setAddPopupOpen(false)}
        />
      )}

      {/* Edit Task Form */}
      {isEditPopupOpen && (
        <EditTaskForm
          editTask={editTask}
          setEditTask={setEditTask}
          handleEditTask={handleEditTask}
          onClose={() => setEditPopupOpen(false)}
        />
      )}
      {/* {isEditPopupOpen && console.log(editTask)} */}
    </div>
  );
};

export default TaskList;
