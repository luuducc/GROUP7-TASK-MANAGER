const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  workspace: {
    type: Schema.Types.ObjectId,
    ref: 'Workspace'
  },
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
    // required: true,
    validate: {
      validator: function(date) {
        return date > new Date()
      },
      message: 'Expired date must be in the future'
    }
  },
  customNoti: {
    value: {
      type: Number,
      // required: true,
      validate: [
        {
          validator: function(val) {
            if(this.customNoti.time === 'hour' || this.customNoti.time === 'day' || this.customNoti.time === 'minute') 
              return val > 0
          },
          message: 'time must be positive'
        },
        // {
        //   validator: function(val) {
        //     if(this.customNoti.time === 'minute') 
        //       return val >= 5
        //   },
        //   message: 'the minimum time is 5 minute'
        // }
      ]
    },
    time: {
      type: String,
      enum: ['day', 'hour', 'minute'],
      // default: 'day',
      // required: true,
    }
  },
  completed: {
    type: Boolean,
    default: false,
  },
  expired: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Task", taskSchema);
