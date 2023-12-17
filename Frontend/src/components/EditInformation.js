import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Button, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import './Profile.css';
import React, { useState } from 'react';
import axios from 'axios';
import { getUserData } from '../userStorage';

const EditInformation = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');

    const userId = getUserData()._id;
    const token = localStorage.getItem('token');

    const handleSaveChanges = async () => {
        try {
            
            await axios.post(`http://localhost:3000/user/checkPass/${userId}`, {
                password,
            }, {
                headers: {
                    token: `Bearer ${token}`
                }
            });  
            
            await axios.put(`http://localhost:3000/user/update/${userId}`, {
                username,
                newpassword,
                password
            }, {
                headers: {
                    token: `Bearer ${token}`
                }
            });

            toast.success('Changes saved successfully');
            onClose();
        } catch (error) {
            toast.error('Edit failed!');
        }
        onClose();
    };

    return (
        <div >
            <ModalOverlay />
                <ModalContent>
                <ModalHeader textAlign="center">Edit Information</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <label>
                            Username:
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            New Password:
                            <input
                                type="password"
                                value={newpassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <br />
                        <Box
                            display="flex"
                            justifyContent={'center'}
                        >
                            <Button
                                colorScheme="blue"
                                onClick={handleSaveChanges}                              
                                >
                                Save Changes
                            </Button>
                        </Box>
                    </ModalBody>
                </ModalContent>
        </div>
    )
}

export default EditInformation;