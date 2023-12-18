
import React from 'react';
import './Mainpage.css';
import TaskList from '../components/TaskList';
import Todolist from '../components/Todolist';
import Profile from '../components/Profile';
import Workspace from '../components/Workspace';
import Notification from '../components/Notification';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Center, AbsoluteCenter } from '@chakra-ui/react'

const Header = () => {
  const displayToast = (message, type) => {
    if(type === true) { // success
      toast.success(message)
    } else { // error
      toast.error(message)
    }
  }
  return (
      <Tabs variant='enclosed' align='center' margin={0}>
      <TabList
        width={832}
        position={'fixed'} 
        zIndex={10}
      >
        <Tab>My Task</Tab>
        <Tab>My Todolist</Tab>
        <Tab>Workspace</Tab>
        <Tab>Notification</Tab>
        <Tab>Profile</Tab>
      </TabList>
      <TabPanels align='start'>
        <TabPanel>
          <TaskList displayToast={displayToast}/>
        </TabPanel>
        <TabPanel>
          <Todolist/> 
        </TabPanel>
        <TabPanel>
          <Workspace/> 
        </TabPanel>
        <TabPanel>
          <Notification/> 
        </TabPanel>
        <TabPanel>
          <Profile displayToast={displayToast}/> 
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Header;
