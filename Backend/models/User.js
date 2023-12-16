const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 6,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    // image:{
    //   type: image,
    //   default: URL("https://th.bing.com/th/id/OIP.MO18PZq_EXc7P8VVS-LpkwHaHa?w=207&h=207&c=7&r=0&o=5&pid=1.7"),
    // },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
