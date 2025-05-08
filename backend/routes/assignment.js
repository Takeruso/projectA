const express = require('express')
const router = express.Router()
const db = require('../db')

// const dummyDetails = [
//   {
//     title: 'Morning Medication Rounds',
//     location: 'All Resident Rooms',
//     time: '8:00am - 9:00am'
//   },
//   {
//     title: 'Wound Care Checkup',
//     location: 'Medical Wing, Room 12',
//     time: '2:00pm - 2:30pm'
//   },
//   {
//     title: 'Routine Health Assessments',
//     location: 'Common Area',
//     time: '9:30am - 11:00am'
//   },
//   {
//     title: 'Family Visit Coordination',
//     location: 'Front Desk',
//     time: '2:00pm - 3:00pm'
//   }
// ]

// router.get('/enriched', (req, res) => {
//   db.all(
//     'SELECT * FROM staff_assignment WHERE staff_id = ?',
//     [1],
//     (err, rows) => {
//       if (err) return res.status(500).json({ error: err.message })

//       const enriched = rows.map((item) => {
//         const randomDetail =
//           dummyDetails[Math.floor(Math.random() * dummyDetails.length)]
//         return {
//           id: item.id,
//           date: item.date,
//           staff_id: item.staff_id,
//           shift_id: item.shift_id,
//           title: randomDetail.title,
//           location: randomDetail.location,
//           time: randomDetail.time
//         }
//       })

//       res.json(enriched)
//     }
//   )
// })

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

router.post('/', (req, res) => {
  const { staff_id, date, shift_id } = req.body
  if (!staff_id || !date || !shift_id) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  db.get(
    'SELECT COUNT(*) AS count FROM staff_assignment WHERE staff_id = ? AND date = ? AND shift_id = ?',
    [staff_id, date, shift_id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message })
      if (row.count > 0) {
        return res.status(400).json({ error: 'Duplicate assignment exists' })
      }

      db.run(
        'INSERT INTO staff_assignment (staff_id, date, shift_id) VALUES (?, ?, ?)',
        [staff_id, date, shift_id],
        function (err) {
          if (err) return res.status(500).json({ error: err.message })
          res.json({ success: true, id: this.lastID })
        }
      )
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
