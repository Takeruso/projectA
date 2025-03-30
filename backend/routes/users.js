const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req, res) => {
  db.all('SELECT id, username FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

router.post('/', (req, res) => {
  const { username, password } = req.body
  db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, password],
    function (err) {
      if (err) return res.status(500).json({ error: err.message })
      res.status(201).json({ id: this.lastID })
    }
  )
})

module.exports = router
