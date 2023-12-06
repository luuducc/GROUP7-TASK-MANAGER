const express = require("express");
const app = express();
const mongoose = require("mongoose");
const taskRouter = require("./routes/TaskRoutes");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const cron = require("node-cron")
const { addClient, removeClient, sendSSEMessage } = require("./utils")
const Task = require('./models/Task');
const cors = require("cors");  // Import the cors middleware
require('dotenv').config()

// Enable CORS for all routes
app.use(cors());

//middleware
app.use(express.json()); 
app.use(express.static('./public'))
  
//Routes
app.use("/api/tasks", taskRouter); //
app.use("/auth", authRoute);
app.use("/user", userRoute);

const start = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('connected to the db')

    // Set up SSE Endpoint
    app.get('/events', (req, res) => {
      res.setHeader('Content-Type', 'text/event-stream')
      res.setHeader('Cache-Control', 'no-cache')
      res.setHeader('Connection', 'keep-alive')

      const clientId = Date.now()
      res.flushHeaders()

      addClient( {id: clientId, res})

      req.on("close", () => {
        removeClient(clientId)
      })
    })

    // Start cron job
    cron.schedule("*/5 * * * *", async () => { // run every 5 minutes
      try {
        const tasks = await Task.find()
        const today = new Date();
        tasks.forEach(task => {
          const { expiredDate, customNoti } = task;
          const { value: timeUntilExpiration } = customNoti
          const timeDiff = expiredDate.getTime() - today.getTime();
          const minutesUntilExpiration = timeDiff / (1000 * 60)
          const hoursUntilExpiration = minutesUntilExpiration / 60
          const daysUntilExpiration = Math.ceil(timeDiff / (1000*3600*24));

          console.log({ daysUntilExpiration, customNoti, timeUntilExpiration })

          switch(customNoti.time) {
            case "day":   
              if(daysUntilExpiration <= timeUntilExpiration) {
                sendSSEMessage({
                  name: task.title,
                  daysUntilExpiration,
                  message: `the time left is ${daysUntilExpiration} day`
                })
              }
              break
            case "hour" :
              if(hoursUntilExpiration <= timeUntilExpiration) {
                sendSSEMessage({
                  name: task.title,
                  hoursUntilExpiration,
                  message: `the time left is ${hoursUntilExpiration} hours`
                })
              }
              break
            case "minute" :
              if(hoursUntilExpiration <= timeUntilExpiration) {
                sendSSEMessage({
                  name: task.title,
                  minutesUntilExpiration,
                  message: `the time left is ${minutesUntilExpiration} minute`
                })
              }
              break
            default: 
              break
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