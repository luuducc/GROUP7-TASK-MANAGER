import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Image } from '@chakra-ui/react';
import { Button, Modal, useDisclosure } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import './Profile.css';
import EditInformation from './EditInformation';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../userStorage';

const Profile = ({displayToast}) => {
  let userData = getUserData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleEditClick = () => {
    onOpen();
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  
    navigate('/');
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="container">
        <div className="avatar">
          <Image
            borderRadius='full'
            boxSize='150px'
            src='https://i.imgur.com/eY1E6LU.jpg'
            alt=''
          />
        </div>
        <div className="user-name">
          <p><strong>{userData.username}</strong> </p>
        </div>
        <div className="user-info">
          <p><strong>Email: </strong> {userData.email}</p>
          <p><strong>Password: </strong>*********</p>
        </div>

        <Box
          display='flex'
          justifyContent='center'
          mt={3}
        >
          <Button 
            colorScheme='blue'
            onClick={handleEditClick}
          >
            Edit Information
          </Button>
        </Box>

        <Box
          display='flex'
          justifyContent='center'
          mt={3}
        >
          <Button 
            colorScheme='blue'
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <EditInformation onClose={onClose} displayToast={displayToast} />
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
