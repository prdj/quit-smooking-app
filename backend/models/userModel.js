const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
    match: [/^[a-zA-Z\s.]+$/, 'The name must contain only letters'],
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  smokingHabit: {
    cigarettesPerDay: {
      type: Number,
      default: 0
    },
    quitDate: {
      type: Date
    }
  },
  goals: [{
    description: {
      type: String,
      required: true
    },
    targetDate: {
      type: Date,
      required: true
    },
    achieved: {
      type: Boolean,
      default: false
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;