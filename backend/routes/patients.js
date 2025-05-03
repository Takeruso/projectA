const express = require('express')
const router = express.Router()
const db = require('../db')

// CREATE: Add a new patient (POST /api/patients)
router.post('/', (req, res) => {
  const {
    name,
    age,
    room_id = null,
    medical_notes = null,
    allergies = [],
    medications = [],
    care_plan = {},
    emergency_contact = null
  } = req.body

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      error: 'Patient name is required and must be a non-empty string.'
    })
  }
  if (!age || typeof age !== 'number' || !Number.isInteger(age) || age <= 0) {
    return res.status(400).json({
      error: 'Patient age is required and must be a positive integer.'
    })
  }

  const sql = `
    INSERT INTO patients (name, age, room_id, medical_notes, allergies, medications, care_plan, emergency_contact)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `
  db.run(
    sql,
    [
      name.trim(),
      age,
      room_id,
      medical_notes,
      JSON.stringify(allergies),
      JSON.stringify(medications),
      JSON.stringify(care_plan),
      emergency_contact
    ],
    function (err) {
      if (err) {
        console.error('Database error inserting patient:', err.message)
        return res.status(500).json({ error: 'Database insertion error.' })
      }
      res.status(201).json({
        message: 'Patient created successfully.',
        patient: {
          id: this.lastID,
          name: name.trim(),
          age,
          room_id,
          medical_notes,
          allergies,
          medications,
          care_plan,
          emergency_contact
        }
      })
    }
  )
})

// READ: Get all patients (GET /api/patients)
router.get('/', (req, res) => {
  const sql = `
    SELECT p.*, r.type as room_type, r.floor as room_floor
    FROM patients p
    LEFT JOIN rooms r ON p.room_id = r.id
  `
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Database error fetching patients:', err.message)
      return res.status(500).json({ error: 'Database fetch error.' })
    }

    const parsedRows = rows.map((row) => ({
      ...row,
      allergies: row.allergies ? JSON.parse(row.allergies) : [],
      medications: row.medications ? JSON.parse(row.medications) : [],
      care_plan: row.care_plan
        ? JSON.parse(row.care_plan)
        : { Morning: [], Evening: [], Night: [] }
    }))

    res.status(200).json(parsedRows)
  })
})

// READ: Get a specific patient (GET /api/patients/:id)
router.get('/:id', (req, res) => {
  const patientId = parseInt(req.params.id, 10)
  if (isNaN(patientId)) {
    return res.status(400).json({ error: 'Invalid patient ID format.' })
  }

  const sql = `
    SELECT p.*, r.type as room_type, r.floor as room_floor
    FROM patients p
    LEFT JOIN rooms r ON p.room_id = r.id
    WHERE p.id = ?
  `

  db.get(sql, [patientId], (err, row) => {
    if (err) {
      console.error('Database error fetching patient:', err.message)
      return res.status(500).json({ error: 'Database fetch error.' })
    }
    if (!row) {
      return res
        .status(404)
        .json({ error: `Patient with ID ${patientId} not found.` })
    }

    const parsedRow = {
      ...row,
      allergies: JSON.parse(row.allergies || '[]'),
      medications: JSON.parse(row.medications || '[]'),
      care_plan: JSON.parse(row.care_plan || '{}')
    }

    res.status(200).json(parsedRow)
  })
})

// UPDATE: Update a specific patient (PUT /api/patients/:id)
router.put('/:id', (req, res) => {
  const patientId = parseInt(req.params.id, 10)
  const {
    name,
    age,
    room_id,
    medical_notes,
    allergies = [],
    medications = [],
    care_plan = {},
    emergency_contact
  } = req.body

  if (isNaN(patientId)) {
    return res.status(400).json({ error: 'Invalid patient ID format.' })
  }
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      error: 'Patient name is required and must be a non-empty string.'
    })
  }
  if (!age || typeof age !== 'number' || !Number.isInteger(age) || age <= 0) {
    return res.status(400).json({
      error: 'Patient age is required and must be a positive integer.'
    })
  }

  const sql = `
    UPDATE patients
    SET name = ?, age = ?, room_id = ?, medical_notes = ?, allergies = ?, medications = ?, care_plan = ?, emergency_contact = ?
    WHERE id = ?
  `
  db.run(
    sql,
    [
      name.trim(),
      age,
      room_id,
      medical_notes,
      JSON.stringify(allergies),
      JSON.stringify(medications),
      JSON.stringify(care_plan),
      emergency_contact,
      patientId
    ],
    function (err) {
      if (err) {
        console.error('Database error updating patient:', err.message)
        return res.status(500).json({ error: 'Database update error.' })
      }
      if (this.changes === 0) {
        return res.status(404).json({
          error: `Patient with ID ${patientId} not found or no changes made.`
        })
      }
      res
        .status(200)
        .json({ message: `Patient with ID ${patientId} updated successfully.` })
    }
  )
})

// DELETE: Delete a specific patient (DELETE /api/patients/:id)
router.delete('/:id', (req, res) => {
  const patientId = parseInt(req.params.id, 10)
  if (isNaN(patientId)) {
    return res.status(400).json({ error: 'Invalid patient ID format.' })
  }

  db.get(`SELECT * FROM patients WHERE id = ?`, [patientId], (err, row) => {
    if (err) {
      console.error('Database error checking patient:', err.message)
      return res.status(500).json({ error: 'Database check error.' })
    }

    if (!row) {
      return res
        .status(404)
        .json({ error: `Patient with ID ${patientId} not found.` })
    }

    const sql = `DELETE FROM patients WHERE id = ?`
    db.run(sql, [patientId], function (err) {
      if (err) {
        console.error('Database error deleting patient:', err.message)
        return res.status(500).json({ error: 'Database delete error.' })
      }

      res.status(200).json({
        message: `Patient with ID ${patientId} deleted successfully.`,
        deletedPatient: row
      })
    })
  })
})

module.exports = router
