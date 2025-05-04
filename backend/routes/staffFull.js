const express = require('express')
const router = express.Router()
const db = require('../db')

// GET full staff data with availability and assignments
router.get('/full', (req, res) => {
  const staffSql = 'SELECT * FROM staff'
  db.all(staffSql, [], (err, staffRows) => {
    if (err) {
      console.error('Error fetching staff:', err)
      return res.status(500).json({ error: err.message })
    }

    const availabilitySql = 'SELECT * FROM staff_availability'
    db.all(availabilitySql, [], (err, availabilityRows) => {
      if (err) {
        console.error('Error fetching availability:', err)
        return res.status(500).json({ error: err.message })
      }

      const assignmentSql = 'SELECT * FROM staff_assignment'
      db.all(assignmentSql, [], (err, assignmentRows) => {
        if (err) {
          console.error('Error fetching assignments:', err)
          return res.status(500).json({ error: err.message })
        }

        const fullData = staffRows.map((staff) => {
          const staffAvail = availabilityRows.filter(
            (a) => a.staff_id === staff.id
          )
          const staffAssign = assignmentRows.filter(
            (a) => a.staff_id === staff.id
          )

          // Group availability by date → shift1–shift4
          const availabilityByDate = {}
          staffAvail.forEach((a) => {
            const shiftKey = a.shift_id
            if (!availabilityByDate[a.date]) {
              availabilityByDate[a.date] = {
                shift1: { is_available: false, id: null },
                shift2: { is_available: false, id: null },
                shift3: { is_available: false, id: null },
                shift4: { is_available: false, id: null }
              }
            }
            availabilityByDate[a.date][shiftKey] = {
              is_available: Boolean(a.is_available),
              id: a.id
            }
          })

          // Group assignments by date → shift1–shift4
          const assignmentsByDate = {}
          staffAssign.forEach((a) => {
            const shiftKey = a.shift_id
            if (!assignmentsByDate[a.date]) {
              assignmentsByDate[a.date] = {
                shift1: false,
                shift2: false,
                shift3: false,
                shift4: false
              }
            }
            assignmentsByDate[a.date][shiftKey] = true
          })

          return {
            id: staff.id,
            first_name: staff.first_name,
            last_name: staff.last_name,
            name: `${staff.first_name} ${staff.last_name}`,
            role: staff.role,
            qualification: staff.qualification,
            employment_type: staff.employment_type,
            annual_salary: staff.annual_salary,
            date_of_birth: staff.date_of_birth,
            gender: staff.gender,
            phone: staff.phone,
            email: staff.email,
            shift: staff.shift,
            availability: availabilityByDate,
            assignments: assignmentsByDate
          }
        })

        res.json(fullData)
      })
    })
  })
})

module.exports = router
