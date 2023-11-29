const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
dotenv.config();

require('dotenv').config()


const taskRouter = require("./routes/TaskRoutes");
//middleware
app.use(express.json()); 
app.use(express.static('./public'))
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/api/tasks", taskRouter);
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