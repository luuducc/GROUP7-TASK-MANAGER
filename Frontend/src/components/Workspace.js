import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Workspace.css';
import AddTaskWorkspace from './AddTaskWorkspace';
import EditTaskForm from './EditTaskForm';
import 'react-toastify/dist/ReactToastify.css';

const Workspace = ({ displayToast }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    body: '',
    image: '',
    expiredDate: '',
    customNoti: { value: undefined, time: 'day' }
  });
  const [editTask, setEditTask] = useState(null);
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin');
  const userEmail = localStorage.getItem('userEmail')
  const isAdminBoolean = (isAdmin == 'true') ? true : false;
  // const userData = JSON.parse(localStorage.getItem('token'));
  // console.log(userData)
  const [displayedTasks, setDisplayedTasks] = useState([]);
  useEffect(() => {
    setDisplayedTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setDisplayedTasks(tasks);
  }, [tasks]);

  //

  useEffect(() => {


    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/tasks/admin`,
          {
            headers: {
              token: `Bearer ${token}`
            }
          }
        );
        // console.log(response.data.data)
        setTasks(response.data.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    try {
      if(newTask.email === userEmail) {
        displayToast('Please enter your student email', false);
        return
      }
      if(newTask.customNoti.value < 0) {
        displayToast('The value must be positive', false);
        return
      }
      const response = await axios.post(`http://localhost:3000/api/tasks/admin`, { ...newTask }, {
        headers: {
          token: `Bearer ${token}`
        }
      });
      setTasks([response.data.data, ...tasks]);
      setNewTask({email: '', title: '', body: '', image: '', expiredDate: '', customNoti: { value: undefined, time: 'day' } });
      setAddPopupOpen(false);

      // toast.success('Task added successfully!');
      displayToast('Task added successfully!', true)
    } catch (error) {
      console.error('Error adding task:', error.message);
      // toast.error('Error adding task');
      displayToast('Error adding task', false);
    }
  };

  const handleEditTask = async () => {
    try {
      // console.log('edit', editTask)
      if (editTask.customNoti.value < 0) {
        // toast.error('The value must be positive')
        displayToast('The value must be positive', false);
        return
      } else {
        // if(editTask.customNoti.time === 'minute' && editTask.customNoti.value < 5) {
        //   toast.error('The minium time must be 5 minute')
        //   return 
        // }
      }
      const response = await axios.put(
        // `http://localhost:3000/api/tasks/${editTask._id}/user/${userId}`,
        `http://localhost:3000/api/tasks/${editTask._id}/admin/`,
        { ...editTask, userEmail }, {
        headers: {
          token: `Bearer ${token}`
        }
      });
      setTasks(tasks.map((task) => (task._id === editTask._id ? response.data.data : task)));
      setEditTask(null);
      setEditPopupOpen(false);

      // toast.success('Task edited successfully!');
      displayToast('Task edited successfully!', true)
    } catch (error) {
      console.error('Error editing task:', error.message);
      // toast.error('Error editing task');
      displayToast('Error editing task', false)
    }
  };


  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}/admin/`, {
        headers: {
          token: `Bearer ${token}`
        }
      });
      setTasks(tasks.filter((task) => task._id !== taskId));

      // toast.success('Task deleted successfully!');
      displayToast('Task deleted successfully!', true)
    } catch (error) {
      console.error('Error deleting task:', error.message);
      // toast.error('Error deleting task');
      displayToast('Error deleting task', false)

    }
  };

  const handleDeleteAllTasks = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/admin`, {
        headers: {
          token: `Bearer ${token}`
        }
      });
      setTasks([]);
      // toast.success('All tasks deleted successfully!');
      displayToast('All tasks deleted successfully!', true)

    } catch (error) {
      console.error('Error deleting all tasks', error.message);
      // toast.error('Error deleting all tasks');
      displayToast('Error deleting all tasks', false)

    }
  };


  const handleCompleteTask = async (taskId) => {
    try {
      const updatedCompletedStatus = !tasks.find((task) => task._id === taskId)?.completed;

      if(isAdminBoolean) { // admin will point to different route
        await axios.put(`http://localhost:3000/api/tasks/${taskId}/admin`,
          { completed: updatedCompletedStatus }, {
            headers: {
              token: `Bearer ${token}`
            }
        });
      } else {
        await axios.put(`http://localhost:3000/api/tasks/${taskId}/user/${userId}`,
          { completed: updatedCompletedStatus }, {
            headers: {
              token: `Bearer ${token}`
            }
        });
      }
      

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: updatedCompletedStatus } : task
        )
      );

      if (updatedCompletedStatus) {
        if(isAdminBoolean) {
          displayToast('Your student has completed the task', true)
        } else {
          displayToast('Congratulation, you have done your task!', true)
        }
      } else {
        if(isAdminBoolean) {
          displayToast('Your student has not completed the task', false)
        } else {
          displayToast('Please finish your task!', false)
        }
      }
    } catch (error) {
      console.error('Error marking task as complete:', error.response.data.msg);
      // toast.error('Error marking task as complete');
      displayToast('You do not own this task!', false)
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
      <h2>Workspace</h2>
      <div className='search-task'>
        <button
          style={{
            backgroundColor: '#4caf50',
            color: 'white',
          }}
          onClick={handleSearch}
        >
          Search
        </button>
        <input
          style={{
            padding: '10px',
          }}
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='add-delete'>
        { isAdminBoolean && (
            <button
              className='add-task'
              onClick={() => setAddPopupOpen(true)}
            >
              Add
            </button>
        )}
        { isAdminBoolean && (
            <button
              className='delete-all-task'
              onClick={handleDeleteAllTasks}
            >
              Delete All
            </button>
        )}
      </div>

      <ul className="task-list">
        {displayedTasks.map((task) => (
          <li key={task._id} className="task-item">
            <u><strong>{task.user.username}</strong></u>
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

            { isAdminBoolean && (
              <button
                style={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                }}
                onClick={() => {
                  const taskId = task._id;
                  setEditTask(tasks.find(task => task._id === taskId));
                  setEditPopupOpen(true);
                }}
              >
                Edit
              </button>
            )}

            { isAdminBoolean && (
              <button
                style={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                  backgroundColor: '#FF5758'
                }}
                onClick={() => handleDeleteTask(task._id)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Add Task Form */}
      {isAddPopupOpen && (
        <AddTaskWorkspace
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

export default Workspace;
