const express = require('express')
const router = express.Router()
const db = require('../db')

// GET all assignments
router.get('/', (req, res) => {
  db.all('SELECT * FROM staff_assignment', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

// GET assignments by staff ID
router.get('/:staffId', (req, res) => {
  const { staffId } = req.params
  db.all(
    'SELECT * FROM staff_assignment WHERE staff_id = ?',
    [staffId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json(rows)
    }
  )
})

// POST new assignment
router.post('/', (req, res) => {
  const { staff_id, date, shift_id } = req.body
  if (!staff_id || !date || !shift_id) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  db.run(
    'INSERT INTO staff_assignment (staff_id, date, shift_id) VALUES (?, ?, ?)',
    [staff_id, date, shift_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ success: true, id: this.lastID })
    }
  )
})

// PUT update assignment (change shift)
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { shift_id } = req.body
  db.run(
    'UPDATE staff_assignment SET shift_id = ? WHERE id = ?',
    [shift_id, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ success: true, changes: this.changes })
    }
  )
})

// DELETE assignment by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params
  db.run('DELETE FROM staff_assignment WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ success: true, changes: this.changes })
  })
})

module.exports = router
