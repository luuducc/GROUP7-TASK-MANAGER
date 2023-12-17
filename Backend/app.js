const express = require("express");
const app = express();
const mongoose = require("mongoose");
const taskRouter = require("./routes/TaskRoutes");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const todoList = require("./routes/todoList");
const workspace = require("./routes/workspace");
const taskProject = require("./routes/taskProject");

const { setupSSEEndpoint, setupCronJob } = require('./sseHandler')
const cors = require("cors");  // Import the cors middleware
require('dotenv').config()

// Enable CORS for all routes
app.use(cors());

//middleware
app.use(express.json()); 
app.use(express.static('./public'))
  
//Routes
app.use("/api/tasks", taskRouter); 
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/todo", todoList);
app.use("/workspace", workspace);
//app.use("/taskProject". taskProject);

const start = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('connected to the db')

    // Set up SSE Endpoint and start cron job
    setupSSEEndpoint(app)

    // // Start cron job
    // setupCronJob()
    // //
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000/");
    });
  } catch(err) {
    console.log('error: '+ err.message)
  }
}

start()