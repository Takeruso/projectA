const express = require('express')
const cors = require('cors')
const usersRouter = require('./routes/users')
const roomsRouter = require('./routes/rooms')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/rooms', roomsRouter)

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`)
})
