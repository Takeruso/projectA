const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'))

db.serialize(() => {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `)

  // Rooms table
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

  // Staff table
  db.run(`
    CREATE TABLE IF NOT EXISTS staff (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      shift TEXT
    );
  `)

  // Patients table
  db.run(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      room_id TEXT,
      medical_notes TEXT,
      FOREIGN KEY (room_id) REFERENCES rooms(id)
    );
  `)

  // Staff availability / scheduling table
  db.run(`
    CREATE TABLE IF NOT EXISTS staff_schedule (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      staff_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      shift TEXT NOT NULL, -- e.g., morning, afternoon, night
      status TEXT NOT NULL, -- available, leave_requested, approved, etc.
      FOREIGN KEY (staff_id) REFERENCES staff(id)
    );
  `)

  // Appointments table
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

  // Sample data for rooms
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
