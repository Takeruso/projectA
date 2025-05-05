// appointments_api.js
const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser')

const app = express()
const db = new sqlite3.Database('clinic.db')
app.use(bodyParser.json())

// Create appointments table
db.run(`
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    staff_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    purpose TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (staff_id) REFERENCES staff(id)
  );
`)

// POST /appointments - Create new appointment
app.post('/appointments', (req, res) => {
  const { patient_id, staff_id, date, time, purpose } = req.body
  const sql = `INSERT INTO appointments (patient_id, staff_id, date, time, purpose) VALUES (?, ?, ?, ?, ?)`
  db.run(sql, [patient_id, staff_id, date, time, purpose], function (err) {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ id: this.lastID })
  })
})

// GET /appointments - Get all appointments or filter
app.get('/appointments', (req, res) => {
  const { patient_id, staff_id } = req.query
  let sql = 'SELECT * FROM appointments'
  let params = []
  if (patient_id) {
    sql += ' WHERE patient_id = ?'
    params.push(patient_id)
  } else if (staff_id) {
    sql += ' WHERE staff_id = ?'
    params.push(staff_id)
  }
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

// GET /appointments/:id - Get single appointment
app.get('/appointments/:id', (req, res) => {
  const sql = 'SELECT * FROM appointments WHERE id = ?'
  db.get(sql, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message })
    if (!row) return res.status(404).json({ error: 'Appointment not found' })
    res.json(row)
  })
})

// PUT /appointments/:id - Update appointment
app.put('/appointments/:id', (req, res) => {
  const { date, time, purpose } = req.body
  const sql =
    'UPDATE appointments SET date = ?, time = ?, purpose = ? WHERE id = ?'
  db.run(sql, [date, time, purpose, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ updated: this.changes })
  })
})

// DELETE /appointments/:id - Delete appointment
app.delete('/appointments/:id', (req, res) => {
  const sql = 'DELETE FROM appointments WHERE id = ?'
  db.run(sql, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ deleted: this.changes })
  })
})

// Start server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
