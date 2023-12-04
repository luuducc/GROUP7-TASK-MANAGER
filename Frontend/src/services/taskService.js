// src/services/taskService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tasks';

const getAllTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    throw new Error('Error fetching tasks');
  }
};

const createTask = async (task) => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data.data;
  } catch (error) {
    throw new Error('Error creating task');
  }
};

// Add other CRUD operations as needed

export default {
  getAllTasks,
  createTask,
  // Add other CRUD operations as needed
};
