const express = require('express')
const cors = require('cors')
const db = require('./db')

const app = express()
const PORT = 3000

db.run('PRAGMA foreign_keys = ON', (err) => {
  if (err) {
    console.error('Failed to enable foreign keys:', err.message)
  } else {
    console.log('Foreign keys enabled.')
  }
})

app.use(cors())
app.use(express.json())

const usersRouter = require('./routes/users')
const roomsRouter = require('./routes/rooms')
const staffRouter = require('./routes/staff')
const patientRouter = require('./routes/patients')
const availabilityRoutes = require('./routes/availability')
const staffAssignment = require('./routes/assignment')
const staffFull = require('./routes/staffFull')

app.use('/api/users', usersRouter)
app.use('/api/rooms', roomsRouter)
app.use('/api/staff', staffRouter)
app.use('/api/patients', patientRouter)
app.use('/api/availability', availabilityRoutes)
app.use('/api/assignment', staffAssignment)
app.use('/api/staffFull', staffFull)

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`)
})
