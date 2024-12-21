/* eslint-disable no-undef */
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Message = require('./models/Message') // Модель для повідомлень

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Підключення до MongoDB
const mongoURI = process.env.MONGO_URI // Використовуємо змінну середовища
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err))

// Отримання всіх повідомлень
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.status(200).json(messages)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching messages' })
  }
})

// Створення нового повідомлення
app.post('/api/messages', async (req, res) => {
  const { name, text } = req.body

  if (!name || !text) {
    return res.status(400).json({ message: 'Name and text are required!' })
  }

  try {
    const newMessage = new Message({ name, text })
    await newMessage.save()
    res.status(201).json(newMessage)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error saving message' })
  }
})

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on https://yeeep-newyear-backend.onrender.com`)
})
