import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Button, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import './Profile.css';
import React, { useState } from 'react';
import axios from 'axios';

const EditInformation = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');

    const handleSaveChanges = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/user`, {
                password,
            });

            // Nếu mật khẩu trùng khớp, thực hiện lưu dữ liệu thay đổi lên backend và thông báo
            // (Bạn cần thay đổi đường dẫn và nội dung của yêu cầu POST dựa trên backend của bạn)
            await axios.post('https://your-backend-api.com/saveChanges', {
                username,
                newpassword,
            });

            toast.success('Changes saved successfully');
            onClose();
        } catch (error) {
            toast.error('Incorrect password. Changes not saved.');
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