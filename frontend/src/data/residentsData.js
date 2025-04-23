export const residents = [
  {
    id: '00634',
    name: 'Floyd Miles',
    gender: 'Male',
    age: 82,
    roomId: '101',
    // careNeeds: 'High-level support, daily monitoring',
    allergies: ['Penicillin', 'Dust'],
    medications: [
      {
        name: 'Aspirin',
        dosage: '10mg',
        frequency: 'Once daily',
        time: '8:00 AM',
        purpose: 'Reduce fever and inflammation',
        doctor: '   Kim Chang',
        refill: 'April 24, 2025',
        stockLevel: 1
      },
      {
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice a day',
        time: '8:00 AM',
        notes: 'with breakfast',
        purpose: 'Blood sugar control',
        doctor: '   Robert Garcia',
        refill: 'May 10, 2025',
        stockLevel: 30
      },
      {
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice a day',
        time: '6:00 PM',
        notes: 'with dinner',
        purpose: 'Blood sugar control',
        doctor: '   Robert Garcia',
        refill: 'May 10, 2025',
        stockLevel: 30
      }
    ],
    carePlan: {
      Morning: [
        {
          time: '7:30 AM',
          task: 'Assist with hygiene, dressing, and mobility'
        },
        {
          time: '7:45 AM',
          task: 'Monitor blood glucose',
          notes: 'pre-breakfast'
        },
        {
          time: '8:00 AM',
          task: 'Give medication',
          medications: ['Metformin', 'Aspirin']
        },
        { task: 'Encourage hydration and walk to common area' },
        { task: 'Document bowel movements and mobility notes' },
        { task: 'Encourage social interaction during morning tea' }
      ],
      Evening: [
        { task: 'Monitor mood and behavior' },
        { time: '5:30 PM', task: 'Assist with dinner' },
        {
          time: '6:00 PM',
          task: 'Give medication',
          medications: ['Metformin']
        },
        { time: '8:00 PM', task: 'Assist with toileting and oral care' },
        { time: '9:00 PM', task: 'Prep for bedtime' }
      ],
      Night: [
        { task: 'Overnight checks for comfort and incontinence' },
        {
          task: 'Report if glucose logs or hydration were low during day'
        }
      ]
    },
    emergencyContact: 'Jane Miles (Daughter) - 555-1234'
  },
  {
    id: '00641',
    name: 'Harold Finch',
    gender: 'Male',
    age: 79,
    roomId: '102',
    // careNeeds: 'Independent, weekly wellness checks',
    allergies: ['Pollen'],
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        time: '9:00 AM',
        notes: 'with breakfast',
        purpose: 'Blood pressure management',
        doctor: '   Sarah Johnson',
        refill: 'April 25, 2025',
        stockLevel: 20
      }
    ],
    carePlan: {
      Morning: [
        { time: '8:30 AM', task: 'Weekly BP check', day: 'Monday' },
        {
          time: '9:00 AM',
          task: 'Give medication',
          medications: ['Lisinopril']
        },
        { task: 'Review food intake and hydration' }
      ],
      Evening: [
        {
          task: 'Remind resident to take walks',
          notes: 'if weather permits'
        },
        { task: 'Weekly wellness chat and notes on mood, appetite' },
        { task: 'Encourage social activities' }
      ],
      Night: [{ task: 'No special monitoring required unless requested' }]
    },
    emergencyContact: 'John Finch (Son) - 555-5678'
  },
  {
    id: '00645',
    name: 'Devon Lane',
    gender: 'Male',
    age: 91,
    roomId: '203',
    // careNeeds: 'Full support, night supervision',
    allergies: ['Latex'],
    medications: [
      {
        name: 'Warfarin',
        dosage: '5mg',
        frequency: 'daily',
        time: '6:00 PM',
        purpose: 'Prevent blood clots',
        doctor: '   Amelia Blake',
        refill: 'May 5, 2025',
        stockLevel: 47
      },
      {
        name: 'Atorvastatin',
        dosage: '20mg',
        frequency: 'night',
        time: '9:00 PM',
        purpose: 'Cholesterol control',
        doctor: '   Olivia Singh',
        refill: 'May 12, 2025',
        stockLevel: 25
      },
      {
        name: 'Metoprolol',
        dosage: '50mg',
        frequency: 'Twice a day',
        time: '8:00 AM',
        purpose: 'Heart rate and blood pressure',
        doctor: '   Ethan Park',
        refill: 'April 28, 2025',
        stockLevel: 33
      },
      {
        name: 'Metoprolol',
        dosage: '50mg',
        frequency: 'Twice a day',
        time: '8:00 PM',
        purpose: 'Heart rate and blood pressure',
        doctor: '   Ethan Park',
        refill: 'April 28, 2025',
        stockLevel: 33
      }
    ],
    carePlan: {
      Morning: [
        {
          time: '7:00 AM',
          task: 'Total assistance with hygiene and dressing'
        },
        {
          time: '8:00 AM',
          task: 'Give medication',
          medications: ['Metoprolol']
        },
        {
          task: 'Encourage mobility exercise',
          notes: 'with 2-person assist'
        },
        {
          time: '8:30 AM',
          task: 'Light breakfast with nurse supervision'
        }
      ],
      Evening: [
        {
          task: 'Monitor for bruising or bleeding',
          notes: '(due to Warfarin)'
        },
        { time: '5:30 PM', task: 'Assist with dinner' },
        {
          time: '6:00 PM',
          task: 'Give medication',
          medications: ['Warfarin']
        },
        {
          time: '8:00 PM',
          task: 'Give medication',
          medications: ['Metoprolol']
        },
        {
          time: '9:00 PM',
          task: 'Give medication',
          medications: ['Atorvastatin']
        },
        { task: 'Reposition every 2 hours' }
      ],
      Night: [
        { task: '2-hourly checks' },
        { task: 'Monitor sleep patterns and incontinence' },
        {
          task: 'Maintain dry bedding and catheter line',
          notes: 'if used'
        }
      ]
    },
    emergencyContact: 'Emily Lane (Daughter) - 555-2345'
  },
  {
    id: '00374',
    name: 'Cody Fisher',
    gender: 'Male',
    age: 83,
    roomId: '305',
    allergies: ['Peanuts'],
    medications: [
      {
        name: 'Warfarin',
        dosage: '5mg',
        frequency: 'daily',
        time: '6:00 PM',
        purpose: 'Prevent blood clots',
        doctor: '   Olivia Singh',
        refill: 'May 5, 2025',
        stockLevel: 47
      },
      {
        name: 'Atorvastatin',
        dosage: '20mg',
        frequency: 'night',
        time: '9:00 PM',
        purpose: 'Cholesterol control',
        doctor: '   Angela Lee',
        refill: 'May 14, 2025',
        stockLevel: 25
      },
      {
        name: 'Metoprolol',
        dosage: '50mg',
        frequency: 'Twice a day',
        time: '8:00 AM / 8:00 PM',
        purpose: 'Heart rate and blood pressure',
        doctor: '   Ethan Park',
        refill: 'May 1, 2025',
        stockLevel: 33
      }
    ],
    carePlan: {
      Morning: [
        { time: '7:30 AM', task: 'Assistance with hygiene and dressing' },
        {
          time: '8:00 AM',
          task: 'Give medication',
          medications: ['Metoprolol']
        },
        { time: '8:30 AM', task: 'Supervised breakfast' }
      ],
      Evening: [
        { time: '5:30 PM', task: 'Assist with dinner' },
        {
          time: '6:00 PM',
          task: 'Give medication',
          medications: ['Warfarin']
        },
        {
          time: '8:00 PM',
          task: 'Give medication',
          medications: ['Metoprolol']
        },
        {
          time: '9:00 PM',
          task: 'Give medication',
          medications: ['Atorvastatin']
        },
        { task: 'Monitor for signs of bleeding or bruising' }
      ],
      Night: [
        { task: 'Night supervision with hourly checks' },
        { task: 'Reposition every 2 hours if in bed' },
        { task: 'Assist to toilet as required' }
      ]
    },
    emergencyContact: 'Ryan Fisher (Son) - 555-3456'
  },
  {
    id: '00985',
    name: 'Cameron Williamson',
    gender: 'Male',
    age: 90,
    roomId: '111',
    allergies: ['None'],
    medications: [
      {
        name: 'Donepezil',
        dosage: '10mg',
        frequency: 'daily',
        time: '8:00 AM',
        purpose: 'Alzheimer’s treatment',
        doctor: '   Sophie Nguyen',
        refill: 'May 9, 2025',
        stockLevel: 20
      },
      {
        name: 'Memantine',
        dosage: '10mg',
        frequency: 'daily',
        time: '8:00 PM',
        purpose: 'Memory and cognition',
        doctor: '   Sophie Nguyen',
        refill: 'May 9, 2025',
        stockLevel: 17
      }
    ],
    carePlan: {
      Morning: [
        {
          time: '8:00 AM',
          task: 'Give medication',
          medications: ['Donepezil']
        },
        { task: 'Supervise hygiene and grooming' },
        { task: 'Cognitive activities (puzzle, memory game)' },
        { time: '8:30 AM', task: 'Breakfast with monitoring' }
      ],
      Evening: [
        { task: 'Calm environment and structured routine' },
        {
          time: '8:00 PM',
          task: 'Give medication',
          medications: ['Memantine']
        },
        { task: 'Reminders for orientation (date/time)' }
      ],
      Night: [
        { task: 'Secure room and monitor wandering risk' },
        { task: 'Nighttime reassurance and check every 2 hours' }
      ]
    },
    emergencyContact: 'Rachel Williamson (Daughter) - 555-7890'
  },
  {
    id: '01012',
    name: 'Eleanor Pena',
    gender: 'Female',
    age: 87,
    roomId: '212',
    allergies: ['None'],
    medications: [
      {
        name: 'Calcium',
        dosage: '500mg',
        frequency: 'daily',
        time: '8:00 AM',
        purpose: 'Bone health',
        doctor: '   Carla Mitchell',
        refill: 'May 1, 2025',
        stockLevel: 60
      },
      {
        name: 'Vitamin D',
        dosage: '1000 IU',
        frequency: 'daily',
        time: '8:00 AM',
        purpose: 'Calcium absorption',
        doctor: '   Carla Mitchell',
        refill: 'May 1, 2025',
        stockLevel: 60
      },
      {
        name: 'Alendronate',
        dosage: '70mg',
        frequency: 'weekly',
        time: 'Monday, 7:00 AM',
        purpose: 'Osteoporosis prevention',
        doctor: '   Carla Mitchell',
        refill: 'May 15, 2025',
        stockLevel: 4
      }
    ],
    carePlan: {
      Morning: [
        {
          time: '7:00 AM',
          task: 'Give medication (Alendronate)',
          notes: 'weekly on Monday, upright position'
        },
        {
          time: '8:00 AM',
          task: 'Give daily medications',
          medications: ['Calcium', 'Vitamin D']
        },
        { task: 'Supervised walking and mobility exercises' },
        { task: 'Bathroom assistance with fall precautions' }
      ],
      Evening: [
        { task: 'Ensure room is clutter-free and well-lit' },
        { task: 'Encourage fluid intake and light walking' }
      ],
      Night: [
        { task: 'Bedside light accessible and fall alarms on' },
        { task: 'Hourly monitoring for safety' }
      ]
    },
    emergencyContact: 'Maria Pena (Daughter) - 555-9012'
  },
  {
    id: '01045',
    name: 'Theresa Webb',
    gender: 'Female',
    age: 85,
    roomId: '220',
    allergies: ['Peanuts'],
    medications: [
      {
        name: 'Gabapentin',
        dosage: '300mg',
        frequency: 'three times a day',
        time: '8:00 AM / 2:00 PM / 8:00 PM',
        purpose: 'Nerve pain relief',
        doctor: '  Jonathan Rhodes',
        refill: 'April 30, 2025',
        stockLevel: 28
      },
      {
        name: 'Tramadol',
        dosage: '50mg',
        frequency: 'as needed',
        time: 'when needed',
        purpose: 'Pain relief',
        doctor: '   Jonathan Rhodes',
        refill: 'May 7, 2025',
        stockLevel: 15
      }
    ],
    carePlan: {
      Morning: [
        {
          time: '8:00 AM',
          task: 'Give medication',
          medications: ['Gabapentin']
        },
        { task: 'Assist with stretching and warm compress' },
        { task: 'Monitor pain level and document' }
      ],
      Evening: [
        {
          time: '2:00 PM',
          task: 'Give medication',
          medications: ['Gabapentin']
        },
        {
          task: 'Provide Tramadol if pain score > 5',
          notes: 'PRN, max 3 doses/day'
        },
        { task: 'Repositioning and massage if needed' },
        {
          time: '8:00 PM',
          task: 'Give medication',
          medications: ['Gabapentin']
        }
      ],
      Night: [
        { task: 'Pain reassessment every 4 hours' },
        { task: 'Ensure supportive pillows and comfort measures' }
      ]
    },
    emergencyContact: 'Steven Webb (Son) - 555-4567'
  }
].map((resident) => {
  resident.medications = resident.medications.map((medication) => {
    const refillDate = new Date(medication.refill)
    const today = new Date()
    const timeDiff = refillDate.getTime() - today.getTime()
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24))

    let dailyDosage = 0
    if (medication.frequency.toLowerCase().includes('daily')) {
      if (medication.frequency.toLowerCase().includes('twice')) {
        dailyDosage = 2
      } else if (medication.frequency.toLowerCase().includes('three times')) {
        dailyDosage = 3
      } else {
        dailyDosage = 1
      }
    } else if (medication.frequency.toLowerCase().includes('weekly')) {
      dailyDosage = 1 / 7
    }

    const estimatedConsumption = daysLeft * dailyDosage

    if (medication.name === 'Tramadol') {
      return medication
    }
    if (estimatedConsumption > medication.stockLevel) {
      medication.needsRefill = true
    }

    return medication
  })
  return resident
})
