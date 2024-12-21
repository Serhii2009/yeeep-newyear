/* eslint-disable no-undef */
const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Message', MessageSchema)
