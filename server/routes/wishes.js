/* eslint-disable no-undef */
const express = require('express')
const Wish = require('../models/Message')

const router = express.Router()

// API для отримання і відправлення побажань
router.post('/wishes', async (req, res) => {
  const { role, wish } = req.body

  if (!role || !wish) {
    return res.status(400).json({ message: 'Role and wish are required!' })
  }

  const newWish = new Wish({ role, wish })
  await newWish.save()

  const randomWish = await Wish.aggregate([{ $sample: { size: 1 } }])

  const resultWish = randomWish[0]

  res.status(200).json(resultWish)
})

module.exports = router
