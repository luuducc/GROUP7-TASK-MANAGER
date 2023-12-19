
// import React, { useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage';
import Mainpage from './Pages/Mainpage';
import React, { useEffect, useState } from 'react';


function App() {

  // const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   const eventSource = new EventSource("http://localhost:3000/events ")
  //   eventSource.onmessage = (event) => {
  //     const data = JSON.parse(event.data) ;
  //     console.log('Received data from SSE:', data);

  //     addNotification(data.message);
  //   }

  //   eventSource.onerror = (error) => {
  //     console.error('SSE Error: ', error);
  //     eventSource.close();
  //   }
  //   return () => {
  //     eventSource.close();
  //   }
  // }, [])

  return (
    <div className="App">
      <div id="fixedBackground"></div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/main" element={<Mainpage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
