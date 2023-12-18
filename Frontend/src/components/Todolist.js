import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todolist.css';

const Todolist = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
  });

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/todo/user/${userId}`, {
          headers: {
            token: `Bearer ${token}`
          }
        });
        const sortedTodos = response.data.data.sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt) ;
        });
  
        setTodoList(sortedTodos);
      } catch (error) {
        console.error('Error fetching todo list:', error.message);
      }
    };

    fetchTodoList();
  }, [userId, token]);

  const handleAddTodo = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/todo/user/${userId}`,
        newTodo,
        {
          headers: {
            token: `Bearer ${token}`
          }
        }
      );

      setTodoList([ response.data.data, ...todoList]);
      setNewTodo({
        title: '',
      });
    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:3000/todo/${todoId}/user/${userId}`, {
        headers: {
          token: `Bearer ${token}`
        }
      });

      setTodoList(todoList.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  const handleUpdateTodo = async (todoId, updatedTodo) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/todo/${todoId}/user/${userId}`,
        updatedTodo,
        {
          headers: {
            token: `Bearer ${token}`
          }
        }
      );

      setTodoList(todoList.map((todo) => (todo._id === todoId ? response.data.data : todo)));
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
  };

  return (
    <div className="todo-list-container">
      <h2>Todo List</h2>
      <div className='todo-list'>
        <button 
          onClick={handleAddTodo}
          style={{
            backgroundColor: '#4caf50',
            color: 'white',
            margin: '0px',
            width: '100px',
            // padding: '0px'
          }}
        >
          Add
        </button>
        <input
          type="text"
          placeholder="Add todo"
          value={newTodo.title}
          style={{
            margin: '0 0 0 5px',
          }}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
      </div>
      <ul className='todo-ul'>
        {todoList.map((todo) => (
          <li key={todo._id}>
            <strong>{todo.title}</strong>

            <div>
              <button 
                onClick={() => handleUpdateTodo(todo._id, { completed: !todo.completed })}
                style={{
                  backgroundColor: todo.completed ? '#4caf50' : '#FF5758',
                }}
              >
                {todo.completed ? 'Complete' : 'Incomplete'}
              </button>
              <button 
                style={{
                  backgroundColor: '#FF5758',
                  color: 'white',
                }}
                onClick={() => handleDeleteTodo(todo._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Todolist;

