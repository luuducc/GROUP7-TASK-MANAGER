import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Button, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = ({ onClose, displayToast }) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmDelete = async () => {
    try {
      // check password
      const response = await axios.post(`http://localhost:3000/user/checkPass/${userId}`, {
          password,
      }, {
          headers: {
              token: `Bearer ${token}`
          }
      });

      console.log(">>> check response: ", response.data);

      if (response.data === 'Done') {
        // delete account
        await axios.delete(`http://localhost:3000/user/delete/${userId}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });

        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        navigate('/');
      } else {
        toast.error('Incorrect password. Please try again.');
      }
    } catch (error) {
      toast.error('Incorrect password. Please try again.');
      console.error('Error deleting user account:', error);
    } finally {
      onClose();
    }
  };

  return (
    <div>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Delete Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={5} textAlign="center">
            <p style={{ marginBottom: '20px' }}>Enter your password to delete your account:</p>
            <InputGroup size="md">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleTogglePasswordVisibility}>
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Flex justifyContent="space-around" mt={4}>
              <Button colorScheme="red" onClick={handleConfirmDelete} marginRight="10px">
                Yes, Delete Account
              </Button>
              <Button colorScheme="blue" onClick={onClose}>
                Cancel
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </div>
  );
};

export default DeleteAccount;
