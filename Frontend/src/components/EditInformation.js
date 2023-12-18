import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Button, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import './Profile.css';
import React, { useState } from 'react';
import axios from 'axios';

const EditInformation = ({ onClose, displayToast }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

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

            displayToast('Changes saved successfully', true)
            onClose();
        } catch (error) {
            displayToast('Edit failed!', false)
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
                        <InputGroup>
                            <Input
                                placeholder="Username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <Input
                                placeholder="New Password"
                                type={showPassword ? 'text' : 'password'}
                                value={newpassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleTogglePasswordVisibility}>
                                {showPassword ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <Input
                                placeholder="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleTogglePasswordVisibility}>
                                {showPassword ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
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