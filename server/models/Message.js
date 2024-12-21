/* eslint-disable no-undef */
const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
