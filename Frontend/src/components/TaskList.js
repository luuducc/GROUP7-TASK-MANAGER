import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from './EditTaskForm';
import 'react-toastify/dist/ReactToastify.css';

const TaskList = ({ displayToast }) => {
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

  // new code
  const [displayedTasks, setDisplayedTasks] = useState([]);
  useEffect(() => {
    setDisplayedTasks(tasks);
  }, [tasks]);

  //

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/tasks/user/${userId}`,
          {
            headers: {
              token: `Bearer ${token}`
            }
          }
        );
        setTasks(response.data.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    try {
      // console.log('new', newTask)
      if (newTask.customNoti.value < 0) {
        // toast.error('The value must be positive')
        displayToast('The value must be positive', false);
        return
      } else {
        // if(newTask.customNoti.time === 'minute' && newTask.customNoti.value < 5) {
        //   toast.error('The minium time must be 5 minute')
        //   return 
        // }
      }
      const response = await axios.post(`http://localhost:3000/api/tasks/user/${userId}`, newTask, {
        headers: {
          token: `Bearer ${token}`
        }
      });
      setTasks([response.data.data, ...tasks]);
      setNewTask({ title: '', body: '', image: '', expiredDate: '', customNoti: { value: undefined, time: 'day' } });
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
        `http://localhost:3000/api/tasks/${editTask._id}/user/${userId}`,
        editTask, {
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
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}/user/${userId}`, {
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
      await axios.delete(`http://localhost:3000/api/tasks/user/${userId}`, {
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

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: updatedCompletedStatus } : task
        )
      );

      await axios.put(`http://localhost:3000/api/tasks/${taskId}/user/${userId}`,
        { completed: updatedCompletedStatus }, {
        headers: {
          token: `Bearer ${token}`
        }
      });
      if (updatedCompletedStatus) {
        // toast.success('Congratulation, you have done your job!');
        displayToast('Congratulation, you have done your job!', true)
      } else
        // toast.error('Please finish your job!');
        displayToast('Please finish your job!', false)
    } catch (error) {
      console.error('Error marking task as complete:', error.message);
      // toast.error('Error marking task as complete');
      displayToast('Error marking task as complete:', false)
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
      <h2>Task List</h2>
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
          Add
        </button>
        <button
          className='delete-all-task'
          onClick={handleDeleteAllTasks}
        >
          Delete All
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
              }}
            >
              Edit
            </button>

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
