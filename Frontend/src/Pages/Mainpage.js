
import React from 'react';
import './Mainpage.css';
import TaskList from '../components/TaskList';
import Profile from '../components/Profile';
import Project from '../components/Projects';
import Notification from '../components/Notification';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Center, AbsoluteCenter } from '@chakra-ui/react'

const Header = () => {
  return (
    <Tabs variant='enclosed' align='center' margin={0}>
      <TabList
      width={832}
      position={'fixed'} 
      zIndex={10}
      >
        <Tab>My Task</Tab>
        <Tab>Projects</Tab>
        <Tab>Notification</Tab>
        <Tab>Profile</Tab>
      </TabList>
      <TabPanels align='start'>
        <TabPanel>
          <TaskList/>
        </TabPanel>
        <TabPanel>
          <Project/> 
        </TabPanel>
        <TabPanel>
          <Notification/> 
        </TabPanel>
        <TabPanel>
          <Profile/> 
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Header;
