
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Image } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import './Profile.css';

const Profile = () => {

  return (
    <div className="profile-container">
        <ToastContainer />
        <h2>Profile</h2>
        <div class="container">
        <div class="avatar">
            <Image
                borderRadius='full'
                boxSize='150px'
                src='https://i.imgur.com/eY1E6LU.jpg'
                alt=''
            />
        </div>
        <div class="user-name">
            <p><strong>User Name</strong></p>
        </div>

        <div class="user-info">
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Password:</strong> *********</p>
        </div>
        <Box
            display='flex'
            justifyContent='center'
            mt={3}
        >
            <Button 
                colorScheme='blue'
            >
                Edit Information
            </Button>
        </Box>
    </div>
    </div>
  );
};

export default Profile;
