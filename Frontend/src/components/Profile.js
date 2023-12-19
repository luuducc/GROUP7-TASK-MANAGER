import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Image } from '@chakra-ui/react';
import { Button, Modal, useDisclosure } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import './Profile.css';
import EditInformation from './EditInformation';
import DeleteAccount from './DeleteAccount';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = ({displayToast}) => {
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [userData, setUserData] = useState({});
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  const handleEditClick = () => {
    onEditOpen();
  };

  const handleDeleteClick = () => {
    onDeleteOpen();
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('notifications');
    navigate('/');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/getUserByID/${userId}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId, token]);

  
  

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
          _hover={{
            backgroundColor: 'blue',
            color: 'white',
          }}
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
            colorScheme='red'
            onClick={handleDeleteClick}
            backgroundColor="red.500"
            _hover={{
              backgroundColor: 'red.500',
              color: 'white',
            }}
          >
            Delete Account
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
            _hover={{
              backgroundColor: 'blue',
              color: 'white',
            }}
          >
            Logout
          </Button>
        </Box>
        
        <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <EditInformation onClose={onEditClose} displayToast={displayToast} />
        </Modal>

        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
          <DeleteAccount onClose={onDeleteClose} displayToast={displayToast} />
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
