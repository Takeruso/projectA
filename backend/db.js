const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'))

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS rooms (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      floor TEXT NOT NULL,
      capacity INTEGER NOT NULL,
      occupied INTEGER NOT NULL,
      status TEXT NOT NULL
    );
  `)

  const sampleRooms = [
    {
      id: '101',
      type: 'shared',
      floor: '1F',
      capacity: 2,
      occupied: 2,
      status: 'reserved'
    },
    {
      id: '102',
      type: 'shared',
      floor: '1F',
      capacity: 2,
      occupied: 1,
      status: 'vacant'
    },
    {
      id: '201',
      type: 'single',
      floor: '2F',
      capacity: 1,
      occupied: 0,
      status: 'reserved'
    },
    {
      id: '202',
      type: 'shared',
      floor: '2F',
      capacity: 2,
      occupied: 2,
      status: 'cleaning'
    }
  ]

  sampleRooms.forEach((room) => {
    db.run(
      `
      INSERT OR IGNORE INTO rooms (id, type, floor, capacity, occupied, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [
        room.id,
        room.type,
        room.floor,
        room.capacity,
        room.occupied,
        room.status
      ]
    )
  })
})

module.exports = db
