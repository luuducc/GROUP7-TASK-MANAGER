
import React, { useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage';
import Mainpage from './Pages/Mainpage';


function App() {
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/events ")
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data) 
      console.log('Received data from SSE:', data)
      // process data from server SSE
      // ....
    }

    eventSource.onerror = (error) => {
      console.error('SSE Error: ', error)
      eventSource.close() // close connection if error happens
    }
    return () => {
      eventSource.close() // close connection when component unmount
    }
  }, [])
  return (
    <div className="App">
      <div id="fixedBackground"></div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
        <Routes>
          <Route path="/main" element={<Mainpage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
