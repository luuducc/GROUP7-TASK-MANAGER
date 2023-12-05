const express = require("express");
const app = express();
const mongoose = require("mongoose");
const taskRouter = require("./routes/TaskRoutes");
const cron = require("node-cron")
const { addClient, removeClient, sendSSEMessage } = require("./utils")
const Task = require('./models/Task');
const cors = require("cors");  // Import the cors middleware
require('dotenv').config()

// Enable CORS for all routes
app.use(cors());

//middleware
app.use(express.json()); 
app.use("/api/tasks", taskRouter); //
app.use(express.static('./public'))
  

const start = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('connected to the db')

    // Set up SSE Endpoint
    app.get('/events', (req, res) => {
      res.setHeader('Content-Type', 'text/event-stream')
      res.setHeader('Cache-Control', 'no-cache')
      res.setHeader('Connection', 'keep-alive')
      
      // const intervalId = setInterval(() => {
      //   res.write(`data: Hello from server ${new Date().toLocaleTimeString()}\n\n`);
      // }, 5000);

      const clientId = Date.now()
      res.flushHeaders()

      addClient( {id: clientId, res})

      req.on("close", () => {
        removeClient(clientId)
      })
    })

    // Start cron job
    cron.schedule("* * * * *", async () => { // run every minute
      try {
        const tasks = await Task.find()
        const today = new Date();
        tasks.forEach(task => {
          const expiredDate = task.expiredDate;
          const timeDiff = expiredDate.getTime() - today.getTime();
          const minutesUntilExpiration = timeDiff / (1000 * 60)
          const hoursUntilExpiration = minutesUntilExpiration / 60
          const daysUntilExpiration = Math.ceil(timeDiff / (1000*3600*24));

          // -- Enable this when deploying
          if(daysUntilExpiration >=0 && daysUntilExpiration <= 3) {
            sendSSEMessage({
              id: task._id, 
              name: task.title, 
              minutesUntilExpiration,
              hoursUntilExpiration,
              daysUntilExpiration
            })
            if(minutesUntilExpiration <= 15) { // warning when there are less than 15 minutes left
              sendSSEMessage({
                WARNING: "This task is nearing its deadline!!!",
                taskName: task.title,
                timeLeft: minutesUntilExpiration
              })
            }
            console.log({
              id: task._id, name: task.title, 
              minutesUntilExpiration, 
              hoursUntilExpiration,     
              daysUntilExpiration,   
            })
            // other announcements here
          }

          
        })   
      } catch (error) {
        console.error("Error: " + error.message)
      }
    })
    //
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000/");
    });
  } catch(err) {
    console.log('error: '+ err.message)
  }
}

start()