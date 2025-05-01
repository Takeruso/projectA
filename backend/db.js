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
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    role TEXT NOT NULL,
    qualification TEXT,
    employment_type TEXT,
    annual_salary REAL,
    date_of_birth TEXT,
    gender TEXT,
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
      type: 'single',
      floor: '1F',
      capacity: 1,
      occupied: 1,
      status: 'occupied'
    },
    {
      id: '102',
      type: 'shared',
      floor: '1F',
      capacity: 2,
      occupied: 1,
      status: 'occupied'
    },
    {
      id: '203',
      type: 'single',
      floor: '2F',
      capacity: 1,
      occupied: 1,
      status: 'occupied'
    },
    {
      id: '305',
      type: 'shared',
      floor: '2F',
      capacity: 2,
      occupied: 1,
      status: 'occupied'
    },
    {
      id: '111',
      type: 'shared',
      floor: '1F',
      capacity: 3,
      occupied: 1,
      status: 'occupied'
    },
    {
      id: '212',
      type: 'shared',
      floor: '2F',
      capacity: 2,
      occupied: 1,
      status: 'occupied'
    },
    {
      id: '220',
      type: 'shared',
      floor: '2F',
      capacity: 2,
      occupied: 1,
      status: 'occupied'
    },
    {
      id: '103',
      type: 'single',
      floor: '1F',
      capacity: 1,
      occupied: 0,
      status: 'reserved'
    },
    {
      id: '104',
      type: 'shared',
      floor: '1F',
      capacity: 2,
      occupied: 1,
      status: 'occupied'
    },
    {
      id: '110',
      type: 'single',
      floor: '1F',
      capacity: 1,
      occupied: 0,
      status: 'reserved'
    },
    {
      id: '112',
      type: 'shared',
      floor: '1F',
      capacity: 3,
      occupied: 0,
      status: 'vacant'
    },
    {
      id: '113',
      type: 'shared',
      floor: '1F',
      capacity: 3,
      occupied: 0,
      status: 'vacant'
    },
    {
      id: '114',
      type: 'single',
      floor: '1F',
      capacity: 1,
      occupied: 0,
      status: 'vacant'
    },
    {
      id: '115',
      type: 'shared',
      floor: '2F',
      capacity: 2,
      occupied: 0,
      status: 'vacant'
    },
    {
      id: '116',
      type: 'single',
      floor: '2F',
      capacity: 1,
      occupied: 0,
      status: 'vacant'
    },
    {
      id: '117',
      type: 'shared',
      floor: '2F',
      capacity: 2,
      occupied: 0,
      status: 'vacant'
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

  const sampleStaff = [
    {
      first_name: 'John',
      last_name: 'Doe',
      role: 'Nurse',
      qualification: 'Bachelor of Nursing',
      employment_type: 'Full Time',
      annual_salary: 60000,
      date_of_birth: '1985-06-15',
      gender: 'Male',
      phone: '123-456-7890',
      email: 'john@example.com',
      shift: 'Morning'
    },
    {
      first_name: 'Jane',
      last_name: 'Smith',
      role: 'Doctor',
      qualification: 'Doctor of Medicine',
      employment_type: 'Part Time',
      annual_salary: 120000,
      date_of_birth: '1978-09-22',
      gender: 'Female',
      phone: '987-654-3210',
      email: 'jane@example.com',
      shift: 'Afternoon'
    },
    {
      first_name: 'Bob',
      last_name: 'Brown',
      role: 'Caretaker',
      qualification: 'Diploma of Aged Care',
      employment_type: 'Full Time',
      annual_salary: 50000,
      date_of_birth: '1990-12-05',
      gender: 'Male',
      phone: '555-555-5555',
      email: 'bob@example.com',
      shift: 'Night'
    },
    {
      first_name: 'Alice',
      last_name: 'Johnson',
      role: 'Physiotherapist',
      qualification: 'Bachelor of Physiotherapy',
      employment_type: 'Part Time',
      annual_salary: 70000,
      date_of_birth: '1988-03-17',
      gender: 'Female',
      phone: '444-333-2222',
      email: 'alice@example.com',
      shift: 'Morning'
    },
    {
      first_name: 'Tom',
      last_name: 'Harris',
      role: 'Nurse',
      qualification: 'Bachelor of Nursing',
      employment_type: 'Full Time',
      annual_salary: 62000,
      date_of_birth: '1982-11-30',
      gender: 'Male',
      phone: '777-888-9999',
      email: 'tom@example.com',
      shift: 'Afternoon'
    },
    {
      first_name: 'Emily',
      last_name: 'Clark',
      role: 'Doctor',
      qualification: 'Doctor of Medicine',
      employment_type: 'Full Time',
      annual_salary: 130000,
      date_of_birth: '1975-07-10',
      gender: 'Female',
      phone: '666-777-8888',
      email: 'emily@example.com',
      shift: 'Night'
    },
    {
      first_name: 'George',
      last_name: 'White',
      role: 'Caretaker',
      qualification: 'Diploma of Aged Care',
      employment_type: 'Part Time',
      annual_salary: 48000,
      date_of_birth: '1992-04-01',
      gender: 'Male',
      phone: '333-444-5555',
      email: 'george@example.com',
      shift: 'Morning'
    },
    {
      first_name: 'Sophia',
      last_name: 'Miller',
      role: 'Physiotherapist',
      qualification: 'Bachelor of Physiotherapy',
      employment_type: 'Full Time',
      annual_salary: 75000,
      date_of_birth: '1986-08-20',
      gender: 'Female',
      phone: '222-333-4444',
      email: 'sophia@example.com',
      shift: 'Afternoon'
    },
    {
      first_name: 'Kevin',
      last_name: 'Taylor',
      role: 'Nurse',
      qualification: 'Bachelor of Nursing',
      employment_type: 'Part Time',
      annual_salary: 61000,
      date_of_birth: '1989-01-25',
      gender: 'Male',
      phone: '111-222-3333',
      email: 'kevin@example.com',
      shift: 'Night'
    },
    {
      first_name: 'Olivia',
      last_name: 'Anderson',
      role: 'Doctor',
      qualification: 'Doctor of Medicine',
      employment_type: 'Full Time',
      annual_salary: 140000,
      date_of_birth: '1970-05-14',
      gender: 'Female',
      phone: '999-888-7777',
      email: 'olivia@example.com',
      shift: 'Morning'
    }
  ]

  sampleStaff.forEach((staff) => {
    db.run(
      `
      INSERT OR IGNORE INTO staff 
      (first_name, last_name, role, qualification, employment_type, annual_salary, date_of_birth, gender, phone, email, shift)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        staff.first_name,
        staff.last_name,
        staff.role,
        staff.qualification,
        staff.employment_type,
        staff.annual_salary,
        staff.date_of_birth,
        staff.gender,
        staff.phone,
        staff.email,
        staff.shift
      ]
    )
  })
  module.exports = db
})
