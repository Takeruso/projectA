const express = require('express')
const router = express.Router()
const db = require('../db')

// Get all staff
router.get('/', (req, res) => {
  db.all('SELECT * FROM staff', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

// Add new staff
router.post('/', (req, res) => {
  const {
    first_name,
    last_name,
    role,
    qualification,
    employment_type,
    annual_salary,
    date_of_birth,
    gender,
    phone,
    email,
    shift
  } = req.body

  const sql = `
    INSERT INTO staff 
    (first_name, last_name, role, qualification, employment_type, annual_salary, date_of_birth, gender, phone, email, shift)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  const params = [
    first_name,
    last_name,
    role,
    qualification,
    employment_type,
    annual_salary,
    date_of_birth,
    gender,
    phone,
    email,
    shift
  ]

  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ id: this.lastID, ...req.body })
  })
})

// Update staff
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { name, role, phone, email, shift } = req.body
  const sql = `
    UPDATE staff
    SET name = ?, role = ?, phone = ?, email = ?, shift = ?
    WHERE id = ?
  `
  const params = [name, role, phone, email, shift, id]

  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ message: 'Staff updated successfully' })
  })
})

// Delete staff
router.delete('/:id', (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM staff WHERE id = ?'

  db.run(sql, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ message: 'Staff deleted successfully' })
  })
})

module.exports = router
