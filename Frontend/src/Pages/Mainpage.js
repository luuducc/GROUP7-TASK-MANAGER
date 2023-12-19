
import React from 'react';
import './Mainpage.css';
import TaskList from '../components/TaskList';
import Todolist from '../components/Todolist';
import Profile from '../components/Profile';
import Workspace from '../components/Workspace';
import Notification from '../components/Notification';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const tabListStyle = {
  width: '800px',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  background: '#2c3e50',
  color: '#ecf0f1',
  padding: '10px',
  margin: '0 16px',
  position: 'fixed',
  top: 0,
  zIndex: 10,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const tabHoverStyle = {
  _hover: {
    background: '#4caf50', // Change the background color on hover
    color: '#fff', // Change the text color on hover
  },
};


const Header = () => {
  const displayToast = (message, type) => {
    if (type === true) { // success
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  return (
    <Tabs variant='enclosed' align='center' margin={0}>
      <TabList
        position={'fixed'}
        zIndex={10}
        style={tabListStyle}
      >
        <Tab {...tabHoverStyle}>My Task</Tab>
        <Tab {...tabHoverStyle}>My Todolist</Tab>
        <Tab {...tabHoverStyle}>Workspace</Tab>
        <Tab {...tabHoverStyle}>Notification</Tab>
        <Tab {...tabHoverStyle}>{`Hi, ${localStorage.getItem('userName')}`}</Tab>
      </TabList>
      <TabPanels align='start'>
        <TabPanel>
          <TaskList displayToast={displayToast} />
        </TabPanel>
        <TabPanel>
          <Todolist displayToast={displayToast} />
        </TabPanel>
        <TabPanel>
          <Workspace displayToast={displayToast} />
        </TabPanel>
        <TabPanel>
          <Notification />
        </TabPanel>
        <TabPanel>
          <Profile displayToast={displayToast} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Header;
