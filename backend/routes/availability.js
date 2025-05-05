const express = require('express')
const router = express.Router()
const db = require('../db')

// GET all availability
router.get('/', (req, res) => {
  db.all('SELECT * FROM staff_availability', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    console.log('RETURNING AVAILABILITY DATA:', rows)
    res.json(rows)
  })
})

// GET availability by staff ID
router.get('/:staffId', (req, res) => {
  const { staffId } = req.params
  db.all(
    'SELECT * FROM staff_availability WHERE staff_id = ?',
    [staffId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json(rows)
    }
  )
})

// POST new availability
router.post('/', (req, res) => {
  const { staff_id, date, shift_id, is_available } = req.body
  db.run(
    `
    INSERT INTO staff_availability (staff_id, date, shift_id, is_available)
    VALUES (?, ?, ?, ?)
    `,
    [staff_id, date, shift_id, is_available],
    function (err) {
      if (err) return res.status(500).json({ error: err.message })
      console.error('DB INSERT ERROR:', err)
      res.json({ success: true, id: this.lastID })
    }
  )
})

// PUT update availability
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { is_available } = req.body
  db.run(
    'UPDATE staff_availability SET is_available = ? WHERE id = ?',
    [is_available, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ success: true, changes: this.changes })
    }
  )
})

// DELETE availability by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params
  db.run('DELETE FROM staff_availability WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ success: true, changes: this.changes })
  })
})

// router.post('/bulk', (req, res) => {
//   const updates = req.body.updates

//   if (!Array.isArray(updates) || updates.length === 0) {
//     return res.status(400).json({ error: 'No updates provided.' })
//   }

//   const upsertStmt = db.prepare(`
//     INSERT INTO staff_availability (staff_id, date, shift_id, is_available)
//     VALUES (?, ?, ?, ?)
//     ON CONFLICT(staff_id, date, shift_id)
//     DO UPDATE SET is_available = excluded.is_available
//   `)

//   db.serialize(() => {
//     try {
//       updates.forEach((item) => {
//         upsertStmt.run(
//           item.staff_id,
//           item.date,
//           item.shift_id,
//           item.is_available ? 1 : 0
//         )
//       })

//       upsertStmt.finalize()

//       res.json({
//         success: true,
//         message: `${updates.length} records upserted`
//       })
//     } catch (err) {
//       console.error('Error in bulk upsert:', err)
//       res.status(500).json({ error: err.message })
//     }
//   })
// })

module.exports = router
