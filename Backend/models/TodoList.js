const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoListSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }, 
  completed: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("TodoList", todoListSchema);
