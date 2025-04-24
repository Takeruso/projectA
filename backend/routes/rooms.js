// routes/rooms.js
const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req, res) => {
  db.all('SELECT * FROM rooms', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

module.exports = router
