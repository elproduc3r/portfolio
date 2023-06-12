const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  type: {
    type: String
  },
  status: {
    type: String,
    enum: ['upcoming', 'completed']
  },
  time: {
    type: String
  },
  date: {
    type: String
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  }
});

module.exports = mongoose.model('Interview', InterviewSchema);
