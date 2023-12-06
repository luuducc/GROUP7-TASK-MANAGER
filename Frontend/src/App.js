// src/App.js
import React, { useEffect} from 'react';
import TaskList from './components/TaskList';

function App() {
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/events ") // SSE endpoint
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
      <TaskList />
    </div>
  );
}

export default App;
