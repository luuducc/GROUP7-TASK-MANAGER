import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todolist.css'

const Todolist = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState({
    // Initialize with default values or an empty string
    title: '',
    body: '',
  });

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch all todo items when the component mounts
    const fetchTodoList = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/todoList/user/${userId}`, {
          headers: {
            token: `Bearer ${token}`
          }
        });
        setTodoList(response.data);
      } catch (error) {
        console.error('Error fetching todo list:', error.message);
      }
    };

    fetchTodoList();
  }, []); // Empty dependency array to run the effect only once on mount

  const handleAddTodo = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/todo/create/`,
        newTodo,
        {
          headers: {
            token: `Bearer ${token}`
          }
        }
      );

      setTodoList([...todoList, response.data]);
      setNewTodo({
        title: '',
        body: '',
      });
    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:3000/api/todoList/${todoId}/user/${userId}`, {
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
        `http://localhost:3000/api/todoList/${todoId}/user/${userId}`,
        updatedTodo,
        {
          headers: {
            token: `Bearer ${token}`
          }
        }
      );

      setTodoList(todoList.map((todo) => (todo._id === todoId ? response.data : todo)));
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todoList.map((todo) => (
          <li key={todo._id}>
            <strong>{todo.title}</strong>
            <p>{todo.body}</p>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
            {/* You may add an update functionality here as needed */}
          </li>
        ))}
      </ul>
      <div>
        <h3>Add New Todo</h3>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newTodo.body}
          onChange={(e) => setNewTodo({ ...newTodo, body: e.target.value })}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
  );
};

export default Todolist;
