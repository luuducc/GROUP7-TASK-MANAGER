const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// TaskSchema : title, createdAt, image, content
// CRUD
// từ dữ liệu json sẽ xây dựng lên giao diện,
const taskSchema = new Schema({
  title: String,
  body: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Task", taskSchema);
