
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Image } from '@chakra-ui/react';
import { Button, Modal, useDisclosure } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import './Profile.css';
import React from 'react';
import axios from 'axios';
import EditInformation from './EditInformation'

const Profile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleEditClick = () => {
        onOpen();
    };

    async function fetchUserData() {
        try {
            const response = await axios.get(`http://localhost:3000/user`);
            const data = response.data;

            document.getElementById('user-name').textContent = data.name;
            document.getElementById('user-email').textContent = data.email;
            document.getElementById('user-email').textContent = data.email;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    window.onload = fetchUserData;

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
                <p><strong>User Name:</strong> <span id="user-name"></span></p>
            </div>
            <div className="user-info">
                <p><strong>Email:</strong> <span id="user-email"></span></p>
                <p><strong>Password:</strong> <span id="user-password"></span></p>
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
