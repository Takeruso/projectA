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

// PUT /api/rooms/:id
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { type, floor, capacity, occupied, status } = req.body

  const sql = `
    UPDATE rooms
    SET type = ?, floor = ?, capacity = ?, occupied = ?, status = ?
    WHERE id = ?
  `
  const params = [type, floor, capacity, occupied, status, id]

  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ message: 'Room updated successfully' })
  })
})

router.post('/', (req, res) => {
  const { id, type, floor, capacity, occupied, status } = req.body

  const sql = `
    INSERT INTO rooms (id, type, floor, capacity, occupied, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `

  const params = [id, type, floor, capacity, occupied, status]

  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ id: this.lastID, ...req.body })
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  const sql = 'DELETE FROM rooms WHERE id = ?'
  db.run(sql, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ message: 'Room deleted successfully' })
  })
})

module.exports = router
