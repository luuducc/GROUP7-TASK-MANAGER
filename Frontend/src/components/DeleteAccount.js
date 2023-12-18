import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Button, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import {Flex } from '@chakra-ui/react';
import './Profile.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = ({ onClose, displayToast }) => {

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleConfirmDelete = async () => {
        try {
          await axios.delete(`http://localhost:3000/user/delete/${userId}`, {
            headers: {
              token: `Bearer ${token}`,
            },
          });
    
          localStorage.removeItem('userId');
          localStorage.removeItem('token');
          navigate('/');
        } catch (error) {
          console.error('Error deleting user account:', error);
        } finally {
            onClose();
        }
      };

    return (
        <div >
            <ModalOverlay />
                <ModalContent>
                <ModalHeader textAlign="center">Edit Information</ModalHeader>
                    <ModalCloseButton />
                    <Box p={5} textAlign="center">
                      <p style={{ marginBottom: '20px' }}>Are you sure you want to delete your account?</p>
                      <Flex justifyContent="space-around">
                        <Button colorScheme='red' onClick={handleConfirmDelete} marginRight="10px">
                          Yes, Delete Account
                        </Button>
                        <Button colorScheme='blue' onClick={onClose}>Cancel</Button>
                      </Flex>
                    </Box>
                </ModalContent>
        </div>
    )
}

export default DeleteAccount;