const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  //GET ALL USER
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET USER BY ID
  getUserByID: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET USER BY EMAIL
  getUserByEmail: async (req, res, next) => {
    try {
      if(req.body.email){
        const user = await User.find({email: req.body.email}); // return an array
        if(user.length > 0) {
          // because email is unique => only 1 user is returned => array has length 1
          const userId = user[0]._id.toHexString() 
          req.userId = userId
          next()
          // return res.status(200).json(user);
        } else {
          return res.status(404).json({msg: `cannot find user with email ${req.body.email}`});
        }
      } else{
        return res.status(404).json({msg: 'Please provide an email!'});
      }
      
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE A USER
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // UPDATE USER INFOR
  updateUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.newpassword, salt);
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          username: req.body.username,
          password: hashed,
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //CHECKPASS
  checkPassUser: async(req, res) => {
    const user = await User.findById(req.user.id );
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(404).json("Incorrect password");
    }
    else
      return res.status(200).json("Done");
  }

};

module.exports = userController;
