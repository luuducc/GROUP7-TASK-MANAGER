const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// TaskSchema : title, createdAt, image, content
// CRUD
// từ dữ liệu json sẽ xây dựng lên giao diện,
const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }, 
  expiredDate: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Task", taskSchema);
