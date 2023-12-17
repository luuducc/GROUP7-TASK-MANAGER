import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Image } from '@chakra-ui/react';
import { Button, Modal, useDisclosure } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import './Profile.css';
import axios from 'axios';
import EditInformation from './EditInformation';

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userData, setUserData] = useState({});
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  // console.log("userid: ",userId);
  // console.log("token: ",token);

  const handleEditClick = () => {
    onOpen();
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

        // console.log("data: ", data);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Check if userId is available before making the request
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <div className="profile-container">
      <ToastContainer />
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

        <Modal isOpen={isOpen} onClose={onClose}>
          <EditInformation onClose={onClose} />
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
