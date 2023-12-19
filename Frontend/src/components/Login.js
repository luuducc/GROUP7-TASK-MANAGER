import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRadio } from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      const { accessToken, userId, ...userData } = response.data;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('userId', userData._id);
      // console.log(userData)
      localStorage.setItem('isAdmin', userData.isAdmin);
      localStorage.setItem('userEmail', userData.email);

      console.log('token: ', localStorage.getItem('token'));
      console.log('userId: ', localStorage.getItem('userId'));

      toast.success('Login successful!');
      navigate('/main');

    } catch (error) {
      console.error('Login failed:', error.response.data);
      toast.error('Login failed. Please check your username or password.');
    }
  };

  return (
    <div>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
