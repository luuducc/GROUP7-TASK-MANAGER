const express = require("express");
const app = express();
const mongoose = require("mongoose");
const taskRouter = require("./routes/TaskRoutes");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
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
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000/");
    });
  } catch(err) {
    console.log('error: '+ err.message)
  }
}

start()