
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from './EditTaskForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ 
    title: '',
    body: '',
    image: '',
    expiredDate: '',
    customNoti: { value: null, time: 'day' }
  });
  const [editTask, setEditTask] = useState(null);
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // new code
  const [displayedTasks, setDisplayedTasks] = useState([]);
  useEffect(() => {
    setDisplayedTasks(tasks); // Sử dụng biến tasks ban đầu để hiển thị toàn bộ danh sách công việc
  }, [tasks]);

  //

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tasks');
        setTasks(response.data.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/tasks', newTask);
      setTasks([response.data.data, ...tasks]);
      setNewTask({ title: '', body: '', image: '',expiredDate: '', customNoti: { value: null, time: '' } });
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

  const handleDeleteAllTasks = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks`);
      setTasks([]);
      toast.success('All tasks deleted successfully!');
    } catch (error) {
      console.error('Error deleting all tasks:', error.message);
      toast.error('Error deleting all tasks');
    }
  };


  const handleCompleteTask = async (taskId) => {
    try {
      const updatedCompletedStatus = !tasks.find((task) => task._id === taskId)?.completed;

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: updatedCompletedStatus } : task
        )
      );

      await axios.put(`http://localhost:3000/api/tasks/${taskId}`, {
        completed: updatedCompletedStatus,
      });
  
      toast.success('handle successfully!');
    } catch (error) {
      console.error('Error marking task as complete:', error.message);
      toast.error('Error marking task as complete');
    }
  };

  const handleSearch = () => {
    const filteredResults = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedTasks(filteredResults)
  };
  

  return (
    <div className="task-list-container">
      <ToastContainer />
      <h2>Task List</h2>
      <div className='search-task'>
        <button
          style={{
            backgroundColor: '#4caf50',
            color: 'white',
          }}
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='add-delete'>
        <button
          className='add-task'
          onClick={() => setAddPopupOpen(true)}
        >
            Thêm
        </button>
        <button
          className='delete-all-task'
          onClick={handleDeleteAllTasks}
        >
            Xoá tất cả
        </button>
      </div>

      <ul className="task-list">
        {displayedTasks.map((task) => (
          <li key={task._id} className="task-item">
            <strong>{task.title}</strong>
            <h1>{task.body}</h1>
            <p>expiredDate: {new Date(task.expiredDate).toLocaleString()}</p>
            <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
            <p>Custom Notification Value: {task.customNoti?.value}</p>
            <p>Custom Notification Time: {task.customNoti?.time}</p>
            <div className='complete'>
              <p>Completed:</p>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCompleteTask(task._id)}
              />
            </div>

            <button
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
            }}
            onClick={() => {
              const taskId = task._id;
              setEditTask(tasks.find(task => task._id === taskId));
              setEditPopupOpen(true);
            }}>Sửa</button>

            <button 
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
            }}
            onClick={() => handleDeleteTask(task._id)}>Xoá</button>
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

    </div>
  );
};

export default TaskList;
