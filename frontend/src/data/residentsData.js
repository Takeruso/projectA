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
          time: '6:45 AM',
          task: 'Wake-up check'
        },
        {
          time: '7:00 AM',
          task: 'Blood glucose monitoring'
        },
        {
          time: '7:15 AM',
          task: 'Toileting and personal hygiene assistance',
          notes: 'Use standing aid, allow privacy when safe'
        },
        {
          time: '7:45 AM',
          task: 'Dressing assistance',
          notes:
            'Allow choice of clothing when possible, assist with buttons and socks'
        },
        {
          time: '8:00 AM',
          task: 'Medication administration',
          medications: ['Metformin', 'Aspirin'],
          notes: 'Ensure taken with water, remain present until swallowed'
        },
        {
          time: '8:30 AM',
          task: 'Breakfast assistance',
          notes: 'Cut food as needed, encourage independence, monitor intake'
        },
        {
          time: '9:30 AM',
          task: 'Morning activity: Walking program in garden or hallway'
        },
        {
          time: '10:00 AM',
          task: 'Hydration break (200ml water)'
        },
        {
          time: '10:30 AM',
          task: 'Social activity: Escort to group activity (if booked)'
        },
        {
          time: '11:45 AM',
          task: 'Toileting assistance',
          notes: 'Document bowel movements using Bristol stool chart'
        }
      ],
      Afternoon: [
        {
          time: '12:00 PM',
          task: 'Lunch assistance',
          notes: 'Monitor for choking, encourage independence'
        },
        {
          time: '12:45 PM',
          task: 'Medication check',
          notes: 'Confirm morning medications were taken and documented'
        },
        {
          time: '1:00 PM',
          task: 'Rest period: assist to room, position comfortably',
          notes: 'Assist to room, position comfortably in chair or bed'
        },
        {
          time: '2:30 PM',
          task: 'Hydration round (200ml fluid of choice)',
          notes: 'Offer 200ml fluid of choice, document intake'
        },
        {
          time: '3:00 PM',
          task: 'Toileting assistance: check for incontinence, change products if needed',
          notes: 'Check for incontinence, change products if needed'
        },
        {
          time: '3:30 PM',
          task: 'Afternoon tea',
          notes: 'Monitor dietary compliance, offer diabetic options'
        },
        {
          time: '4:00 PM',
          task: 'Blood glucose monitoring',
          notes: 'Pre-dinner check, document readings'
        },
        {
          time: '5:30 PM',
          task: 'Dinner assistance',
          notes:
            'Ensure proper positioning, monitor intake, diabetes-friendly options'
        }
      ],
      Evening: [
        {
          time: '6:00 PM',
          task: 'Medication administration',
          medications: ['Metformin'],
          notes: 'Ensure taken with water or appropriate fluid'
        },
        {
          time: '6:45 PM',
          task: 'Evening walking',
          notes: '10-minute supervised hallway walk with walker'
        },
        {
          time: '7:15 PM',
          task: 'Hydration round',
          notes: 'Offer 150ml fluid, document intake'
        },
        {
          time: '8:00 PM',
          task: 'Evening toileting, check for signs of UTI',
          notes: 'Document output'
        },
        {
          time: '8:30 PM',
          task: 'Oral care & hygiene',
          notes: 'Assist with face washing, denture care, hand hygiene'
        },
        {
          time: '8:45 PM',
          task: 'Change into nightwear'
        },
        {
          time: '9:00 PM',
          task: 'Prepare for sleep'
        },
        {
          time: '10:00 PM',
          task: 'Night check: check incontinence products',
          notes: 'Ensure comfortable, check incontinence products'
        }
      ],
      Night: [
        {
          time: '12:00 AM',
          task: 'Repositioning if awake, check for skin integrity',
          notes: 'Gentle repositioning if awake, check for skin integrity'
        },
        {
          time: '2:00 AM',
          task: 'Silent check, assist if awake, check incontinence',
          notes: 'Silent check, assist if awake, check incontinence'
        },
        {
          time: '4:00 AM',
          task: 'Position change',
          notes: 'Minimize disruption, document if awake'
        },
        {
          time: '5:30 AM',
          task: 'Prepare for morning shift, document sleep quality',
          notes: 'Prepare for morning shift, document sleep quality'
        }
      ]
    },
    emergencyContact: 'Jane Miles (Daughter) - 555-1234',
    doctorNotes: [
      'Notify doctors if Blood Glucose <4.0 or >15.0 mmol/L',
      'Monitor dietary compliance, offer diabetic options'
    ]
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
        {
          time: '7:30 AM',
          task: 'Morning wellness check',
          notes: 'Knock and greet, brief assessment of well-being'
        },
        {
          time: '8:00 AM',
          task: 'Blood pressure check',
          notes: 'Mondays only, document readings, alert if >150/90'
        },
        {
          time: '8:30 AM',
          task: 'Breakfast assistance',
          notes: 'Verbal reminder about dining room opening'
        },
        {
          time: '9:00 AM',
          task: 'Medication administration',
          medications: ['Lisinopril'],
          notes: 'Supervised self-administration with breakfast'
        },
        {
          time: '9:30 AM',
          task: 'Room tidiness check',
          notes: 'Offer assistance with bed-making if needed'
        },
        {
          time: '10:00 AM',
          task: 'Hydration encouragement (offer water or tea)',
          notes: 'Verbal reminder, offer water or tea'
        },
        {
          time: '11:30 AM',
          task: 'Pre-lunch check-in',
          notes: 'Brief visit to confirm plans for lunch'
        }
      ],
      Afternoon: [
        {
          time: '12:30 PM',
          task: 'Weekly wellness discussion',
          notes: 'Wednesdays - 15-minute chat about needs and concerns'
        },
        {
          time: '2:00 PM',
          task: 'Encourage outdoor walking if weather permits',
          notes: 'Encourage outdoor walking if weather permits'
        },
        {
          time: '3:30 PM',
          task: 'Hydration round: Offer beverage, observe for signs of dehydration',
          notes: 'Offer beverage, observe for signs of dehydration'
        },
        {
          time: '5:45 PM',
          task: 'Dinner attendance check',
          notes: 'Confirm resident is present at dinner, follow up if absent'
        }
      ],
      Evening: [
        {
          time: '7:00 PM',
          task: 'Evening wellness check: Brief visit, confirm medication was taken',
          notes: 'Brief visit, confirm medication was taken'
        },
        {
          time: '8:30 PM',
          task: 'Evening reminder',
          notes: 'Reminder about locking door, using call bell if needed'
        },
        {
          time: '10:00 PM',
          task: 'Night check',
          notes: 'Confirm light is off, resident is settled'
        }
      ],
      Night: [
        {
          time: '2:00 AM',
          task: 'Welfare check: Only if call bell used or concerns noted',
          notes: 'Only if call bell used or concerns noted'
        }
      ]
    },
    emergencyContact: 'John Finch (Son) - 555-5678',
    doctorNotes: [
      'Only monitor blood pressure on Mondays, alert if >150/90',
      'Encourage hydration throughout the day',
      'Beware of pollen allergies during spring'
    ]
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
          time: '6:45 AM',
          task: 'Vital signs: BP, pulse, temperature, document and report if abnormal',
          notes: 'BP, pulse, temperature, document and report if abnormal'
        },
        {
          time: '7:00 AM',
          task: 'Total assistance with hygiene',
          notes: 'Bed bath with two staff, change incontinence products'
        },
        {
          time: '7:45 AM',
          task: 'Dressing assistance',
          notes: 'Full assistance with clothing, ensure non-restrictive attire'
        },
        {
          time: '8:00 AM',
          task: 'Medication administration',
          medications: ['Metoprolol'],
          notes: 'Crushed in pureed food if swallowing difficulties present'
        },
        {
          time: '8:30 AM',
          task: 'Breakfast assistance',
          notes:
            'Full feeding assistance, upright position, thickened fluids if prescribed'
        },
        {
          time: '9:30 AM',
          task: 'Mobility exercise',
          notes: 'Passive ROM exercises for all limbs, 10 minutes'
        },
        {
          time: '10:00 AM',
          task: 'Hydration: Assist with 150ml thickened fluid',
          notes: 'Assist with 150ml thickened fluid, document intake'
        },
        {
          time: '11:00 AM',
          task: 'Toileting/continence check',
          notes: 'Change products if needed, perineal care'
        },
        {
          time: '11:30 AM',
          task: 'Transfer back to bed',
          notes: 'Use mechanical lift with two staff if fatigued'
        }
      ],
      Afternoon: [
        {
          time: '12:00 PM',
          task: 'Lunch: Full feeding support, monitor for aspiration',
          notes: 'Full feeding support, monitor for aspiration'
        },
        {
          time: '12:45 PM',
          task: 'Oral hygiene',
          notes: 'Mouth care after meal'
        },
        {
          time: '1:00 PM',
          task: 'Position change',
          notes: 'Reposition in bed using slide sheet, 30° tilt'
        },
        {
          time: '2:30 PM',
          task: 'Continence check',
          notes: 'Change products if needed, document output'
        },
        {
          time: '3:00 PM',
          task: 'Hydration (offer 150ml thickened fluid)',
          notes: 'Offer 150ml thickened fluid, document intake'
        },
        {
          time: '3:30 PM',
          task: 'Transfer to chair',
          notes: 'If rested, transfer for afternoon activities'
        },
        {
          time: '4:00 PM',
          task: 'Sensory stimulation',
          notes: 'Music therapy or tactile activities for 15 minutes'
        },
        {
          time: '4:30 PM',
          task: 'Vital signs check',
          notes: 'Pre-dinner BP and pulse, document'
        },
        {
          time: '5:00 PM',
          task: 'Bruise check',
          notes: 'Document any new bruising (Warfarin monitoring)'
        },
        {
          time: '5:30 PM',
          task: 'Dinner assistance',
          notes: 'Full feeding support, upright position'
        }
      ],
      Evening: [
        {
          time: '6:00 PM',
          task: 'Medication administration',
          medications: ['Warfarin'],
          notes: 'Ensure correct dosage, double-check with colleague'
        },
        {
          time: '6:30 PM',
          task: 'Evening hygiene',
          notes: 'Face, hands, oral care'
        },
        {
          time: '7:00 PM',
          task: 'Transfer to bed',
          notes: 'Mechanical lift with two staff, position comfortably'
        },
        {
          time: '7:30 PM',
          task: 'Pressure area care',
          notes: 'Reapply barrier cream, massage bony prominences'
        },
        {
          time: '8:00 PM',
          task: 'Medication administration',
          medications: ['Metoprolol'],
          notes: 'Ensure correct administration'
        },
        {
          time: '8:30 PM',
          task: 'Continence care',
          notes: 'Change products, provide perineal care'
        },
        {
          time: '9:00 PM',
          task: 'Medication administration',
          medications: ['Atorvastatin'],
          notes: 'Final evening medication'
        },
        {
          time: '9:15 PM',
          task: 'Ensure comfortable position for night',
          notes: ' pillows between knees if side-lying'
        },
        {
          time: '9:30 PM',
          task: 'Environment check',
          notes: 'Room temperature, night light, call bell in reach'
        },
        {
          time: '10:00 PM',
          task: 'Initial night check',
          notes: 'Assess breathing, comfort, incontinence'
        }
      ],
      Night: [
        {
          time: '12:00 AM',
          task: 'Position change',
          notes: 'Reposition using two staff, minimal disturbance'
        },
        {
          time: '2:00 AM',
          task: 'Continence check',
          notes: 'Change products if needed, document'
        },
        {
          time: '4:00 AM',
          task: 'Position change',
          notes: 'Reposition to alternate side, skin check'
        },
        {
          time: '6:00 AM',
          task: 'Pre-morning preparation',
          notes: 'Final position change, prepare for morning care'
        }
      ]
    },
    emergencyContact: 'Emily Lane (Daughter) - 555-2345',
    doctorNotes: [
      'Medicines crushed in pureed food if swallowing difficulties present',
      'Full feeding support, position upright',
      'Monitor for aspiration during meals',
      'Document any new bruising (Warfarin monitoring)',
      'Reapply barrier cream, massage bony prominences'
    ]
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
        { time: '7:15 AM', task: 'Assistance with hygiene and dressing' },
        {
          time: '7:45 AM',
          task: 'Vital signs',
          notes: 'BP, pulse, temperature, document if outside parameters'
        },
        {
          time: '8:00 AM',
          task: 'Medication administration',
          medications: ['Metoprolol'],
          notes: 'Provide with water, observe swallowing'
        },
        {
          time: '8:15 AM',
          task: 'Dressing assistance',
          notes: 'Help with buttons, shoes, ensure appropriate clothing'
        },
        {
          time: '8:30 AM',
          task: 'Escort to dining room',
          notes: 'Use walking frame, ensure proper gait'
        },
        {
          time: '8:45 AM',
          task: 'Breakfast supervision',
          notes: 'Ensure food is cut, monitor eating pattern'
        },
        {
          time: '10:00 AM',
          task: 'Morning activity: Escort to group activity',
          notes: 'Escort to group activity, ensure comfort'
        },
        {
          time: '10:45 AM',
          task: 'Hydration round (200ml water)',
          notes: 'Offer 200ml water, document intake'
        },
        {
          time: '11:15 AM',
          task: 'Toileting assistance',
          notes: 'Offer bathroom break, document if refused'
        }
      ],
      Afternoon: [
        {
          time: '12:00 PM',
          task: 'Lunch supervision',
          notes: 'Cut food as needed, encourage independence'
        },
        {
          time: '1:00 PM',
          task: 'Rest period',
          notes: 'Assist to comfortable position in chair or bed'
        },
        {
          time: '2:30 PM',
          task: 'Mobility exercise: Walking in corridor for 5 minutes, with supervision',
          notes: 'Walking in corridor for 5 minutes, with supervision'
        },
        {
          time: '3:00 PM',
          task: 'Hydration support (tea or water',
          notes: 'Offer tea or water, document intake'
        },
        {
          time: '3:30 PM',
          task: 'Toileting assistance',
          notes: 'Escort to bathroom, provide privacy when safe'
        },
        {
          time: '4:00 PM',
          task: 'Assist to common area for social activity',
          notes: 'Assist to common area for social activity'
        },
        {
          time: '5:30 PM',
          task: 'Escort to dining room',
          notes: 'Assist with walking frame, ensure proper gait'
        },
        {
          time: '5:45 PM',
          task: 'Dinner supervision',
          notes: 'Monitor intake, assist with cutting food'
        }
      ],
      Evening: [
        {
          time: '6:00 PM',
          task: 'Medication administration',
          medications: ['Warfarin'],
          notes: 'Ensure correct dosage, monitor for 5 minutes after'
        },
        {
          time: '7:30 PM',
          task: 'Evening hydration (150ml water)',
          notes: 'Offer 150ml water, document intake'
        },
        {
          time: '8:00 PM',
          task: 'Medication administration',
          medications: ['Metoprolol'],
          notes: 'Provide with water, ensure taken'
        },
        {
          time: '8:30 PM',
          task: 'Toileting assistance',
          notes: 'Final bathroom visit before bed'
        },
        {
          time: '8:45 PM',
          task: 'Evening hygiene',
          notes: 'Face washing, oral care, hand hygiene'
        },
        {
          time: '9:00 PM',
          task: 'Medication administration',
          medications: ['Atorvastatin'],
          notes: 'Final evening medication'
        },
        {
          time: '9:15 PM',
          task: 'Prepare for sleep',
          notes: 'Change into nightwear, position comfortably'
        },
        {
          time: '9:30 PM',
          task: 'Room check: Ensure call bell in reach, water accessible',
          notes: 'Ensure call bell in reach, water accessible'
        },
        {
          time: '10:30 PM',
          task: 'Check incontinence',
          notes: 'Ensure comfortable, check incontinence'
        }
      ],
      Night: [
        {
          time: '12:30 AM',
          task: 'Repositioning if awake',
          notes: 'If awake, assist with position change'
        },
        {
          time: '2:30 AM',
          task: 'Welfare check',
          notes: 'Silent check, assist if awake'
        },
        {
          time: '4:30 AM',
          task: 'Final night check: Ensure comfort, toileting if needed',
          notes: 'Ensure comfort, toileting if needed'
        }
      ]
    },
    emergencyContact: 'Ryan Fisher (Son) - 555-3456',
    doctorNotes: [
      'Monitor intake, assist with cutting food',
      'Document any new bruises (Warfarin monitoring)',
      'Assist with walking frame, ensure safety'
    ]
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
        purpose: 'Alzheimer treatment',
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
          time: '7:15 AM',
          task: 'Personal hygiene and dressing supervision',
          notes: 'Guide to bathroom, maintain dignity, verbal cues'
        },
        {
          time: '8:00 AM',
          task: 'Medication administration',
          medications: ['Donepezil'],
          notes: 'Ensure taken with water, minimize distractions'
        },
        {
          time: '8:30 AM',
          task: 'Escort to dining room',
          notes:
            'Hold arm, provide verbal guidance on route, avoid overwhelming stimuli'
        },
        {
          time: '8:45 AM',
          task: 'Breakfast assistance',
          notes:
            'Remind how to use utensils, one food at a time, verbal prompts'
        },
        {
          time: '10:30 AM',
          task: 'Hydration break',
          notes: 'Visual and verbal cues to drink, document intake'
        },
        {
          time: '11:00 AM',
          task: 'Toileting reminder',
          notes: 'Use same bathroom cues, maintain routine'
        }
      ],
      Afternoon: [
        {
          time: '12:00 PM',
          task: 'Lunch assistance',
          notes:
            'Minimize distractions, cut food if needed, encourage independence'
        },
        {
          time: '12:45 PM',
          task: 'Post-meal walk',
          notes: 'Short corridor walk with staff, simple directions'
        },
        {
          time: '1:00 PM',
          task: 'Rest period in room',
          notes: 'Minimize stimulation, familiar objects visible'
        },
        {
          time: '3:30 PM',
          task: 'Hydration break',
          notes: 'Offer water in familiar cup, document intake'
        },
        {
          time: '4:00 PM',
          task: 'Toileting assistance',
          notes: 'Follow established routine, watch for non-verbal cues'
        },
        {
          time: '5:30 PM',
          task: 'Escort to dining room',
          notes: 'Same path each time, reassurance if agitated'
        },
        {
          time: '5:45 PM',
          task: 'Dinner assistance',
          notes: 'Provide cues, remove distractions, monitor intake'
        }
      ],
      Evening: [
        {
          time: '6:30 PM',
          task: 'Return to room',
          notes: 'Begin calming evening routine, dim lights slightly'
        },
        {
          time: '7:00 PM',
          task: 'Evening relaxation',
          notes: 'Familiar TV show or music, comfort items available'
        },
        {
          time: '7:30 PM',
          task: 'Toileting assistance',
          notes: 'Use consistent language and approach'
        },
        {
          time: '8:00 PM',
          task: 'Medication administration',
          medications: ['Memantine'],
          notes: 'Calm environment, simple instructions'
        },
        {
          time: '8:15 PM',
          task: 'Evening hygiene',
          notes: 'Face washing, oral care with step-by-step guidance'
        },
        {
          time: '8:30 PM',
          task: 'Change into nightwear',
          notes: 'One item at a time, follow consistent routine'
        },
        {
          time: '8:45 PM',
          task: 'Bedroom preparation',
          notes: 'Set out familiar objects, night light, remove trip hazards'
        },
        {
          time: '9:00 PM',
          task: 'Bedtime routine',
          notes: 'Calm reassurance, familiar blanket, minimize changes'
        },
        {
          time: '10:00 PM',
          task: 'Initial night check',
          notes: 'Ensure settled, door alarm activated'
        }
      ],
      Night: [
        {
          time: '12:00 AM',
          task: 'Midnight check',
          notes: 'Silent observation, assist if awake or wandering'
        },
        {
          time: '2:00 AM',
          task: 'Overnight monitoring: check for wandering behavior',
          notes: 'Check for wandering behavior, gentle redirection'
        },
        {
          time: '4:00 AM',
          task: 'Early morning check',
          notes: 'Silent check, assist if awake, monitor sleep pattern'
        },
        {
          time: '5:30 AM',
          task: 'Pre-morning preparation',
          notes: 'Prepare for day if early rising pattern present'
        }
      ]
    },
    emergencyContact: 'Rachel Williamson (Daughter) - 555-7890',
    doctorNotes: [
      'Monitor for wandering behavior',
      'Use familiar objects to reduce anxiety',
      'Provide verbal cues and reassurance'
    ]
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
          task: 'Medication administration (Alendronate)',
          medications: ['Alendronate'],
          notes:
            'Ensure upright position, plain water only, remain upright 30 mins'
        },
        {
          time: '7:30 AM',
          task: 'Fall risk assessment',
          notes: 'Check if dizzy upon waking, ensure proper footwear'
        },
        {
          time: '8:00 AM',
          task: 'Medication administration',
          medications: ['Calcium', 'Vitamin D'],
          notes: 'Give with breakfast, ensure sitting upright'
        },
        {
          time: '8:15 AM',
          task: 'Personal hygiene supervision',
          notes: 'Non-slip mat, shower chair, check water temperature'
        },
        {
          time: '8:45 AM',
          task: 'Escort to dining area',
          notes: 'Use walking frame, ensure proper gait pattern'
        },
        {
          time: '9:00 AM',
          task: 'Breakfast supervision',
          notes: 'Encourage dairy intake for calcium, monitor swallowing'
        },
        {
          time: '9:45 AM',
          task: 'Morning exercise',
          notes: 'Attend seated exercise class, focus on weight-bearing'
        },
        {
          time: '10:30 AM',
          task: 'Balance assessment',
          notes: 'Conduct weekly balance test on Wednesdays, document results'
        }
      ],
      Afternoon: [
        {
          time: '12:00 PM',
          task: 'Lunch supervision',
          notes: 'Encourage calcium-rich foods, ensure sitting upright'
        },
        {
          time: '12:45 PM',
          task: 'Post-meal walk',
          notes: 'Short walk to room with supervision'
        },
        {
          time: '1:00 PM',
          task: 'Rest period',
          notes: 'Ensure proper posture if seated or lying down'
        },
        {
          time: '2:30 PM',
          task: 'Hydration round (200ml water) ',
          notes: 'Offer 200ml water, encourage fluid intake'
        },
        {
          time: '3:00 PM',
          task: 'Toileting assistance',
          notes: 'Escort to bathroom, monitor for steady gait'
        },
        {
          time: '3:30 PM',
          task: 'Social activity: Escort to activity room, ensure safe seating',
          notes: 'Escort to activity room, ensure safe seating'
        },
        {
          time: '5:45 PM',
          task: 'Dinner supervision',
          notes: 'Encourage protein and calcium intake, proper posture'
        }
      ],
      Evening: [
        {
          time: '6:30 PM',
          task: 'Evening walk',
          notes: 'Short corridor walk with supervision'
        },
        {
          time: '8:00 PM',
          task: 'Evening hygiene',
          notes: 'Face washing, oral care, seated during tasks'
        },
        {
          time: '8:30 PM',
          task: 'Prepare for bed',
          notes: 'Assist with nightwear, ensure non-slip footwear at bedside'
        },
        {
          time: '8:45 PM',
          task: 'Toileting assistance',
          notes: 'Final bathroom visit, ensure proper lighting'
        },
        {
          time: '9:00 PM',
          task: 'Fall prevention check',
          notes: 'Bed height appropriate, personal items within reach'
        },
        {
          time: '9:15 PM',
          task: 'Nighttime setup',
          notes: 'Night light on, clear pathway to bathroom, call bell in reach'
        },
        {
          time: '10:00 PM',
          task: 'Night check',
          notes: 'Ensure fall alarm in place if used'
        }
      ],
      Night: [
        {
          time: '12:00 AM',
          task: 'Midnight check',
          notes: 'Silent check, ensure safe positioning'
        },
        {
          time: '2:00 AM',
          task: 'Early morning check: Monitor for attempts to get up unassisted',
          notes: 'Monitor for attempts to get up unassisted'
        },
        {
          time: '4:00 AM',
          task: 'Bathroom assistance if needed',
          notes:
            'Respond promptly to call bell, full lighting for bathroom visits'
        },
        {
          time: '6:00 AM',
          task: 'Early morning check',
          notes: 'Prepare for Monday medication if applicable'
        }
      ]
    },
    emergencyContact: 'Maria Pena (Daughter) - 555-9012',
    doctorNotes: [
      'Give Alendronate weekly on Monday, upright position',
      'Give Calcium and vitamin D daily with breakfast',
      'Monitor for dizziness upon waking',
      'Encourage calcium-rich foods at meals'
    ]
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
          time: '7:45 AM',
          task: 'Gentle morning stretches',
          notes: 'Assist with prescribed ROM exercises, observe for pain'
        },
        {
          time: '8:00 AM',
          task: 'Medication administration',
          medications: ['Gabapentin'],
          notes: 'Give with food to minimize side effects'
        },
        {
          time: '8:15 AM',
          task: 'PRN pain assessment',
          notes: 'Assess need for Tramadol, give if pain >5/10'
        },
        {
          time: '8:30 AM',
          task: 'Breakfast assistance',
          notes: 'Help to dining room, observe posture and movement'
        },
        {
          time: '9:15 AM',
          task: 'Morning hygiene',
          notes: 'Assist with shower, use shower chair, check water temperature'
        },
        {
          time: '11:30 AM',
          task: 'Position change',
          notes: 'Assist to different seating, check pressure areas'
        },
        {
          time: '11:45 AM',
          task: 'Pre-lunch pain check',
          notes: 'Document pain level, notify RN if increased'
        }
      ],
      Afternoon: [
        {
          time: '12:00 PM',
          task: 'Lunch supervision',
          notes: 'Monitor for signs of discomfort while eating'
        },
        {
          time: '12:45 PM',
          task: 'Return to room',
          notes: 'Assist with walking, observe gait and posture'
        },
        {
          time: '1:00 PM',
          task: 'Pain assessment',
          notes: 'Reassess pain level before afternoon medication'
        },
        {
          time: '1:15 PM',
          task: 'Positioning for comfort',
          notes: 'Assist to most comfortable position, use support cushions'
        },
        {
          time: '2:00 PM',
          task: 'Medication administration',
          medications: ['Gabapentin'],
          notes: 'Ensure taken with food or snack'
        },
        {
          time: '2:15 PM',
          task: 'PRN pain assessment',
          notes: 'Assess need for Tramadol, give if pain >5/10'
        },
        {
          time: '2:30 PM',
          task: 'Gentle massage',
          notes: '10-minute gentle massage to painful areas if desired'
        },
        {
          time: '3:15 PM',
          task: 'Hydration round (water or tea)',
          notes: 'Offer water, ensure adequate fluid intake'
        },
        {
          time: '3:45 PM',
          task: 'Afternoon activity',
          notes: 'Escort to appropriate activity, ensure comfortable seating'
        },
        {
          time: '5:30 PM',
          task: 'Dinner assistance',
          notes: 'Help to dining room, ensure comfortable seating'
        }
      ],
      Evening: [
        {
          time: '6:15 PM',
          task: 'Evening walk',
          notes: 'Short walk if pain permits, observe mobility'
        },
        {
          time: '7:45 PM',
          task: 'Evening hygiene',
          notes: 'Face washing, oral care, observe for discomfort'
        },
        {
          time: '8:00 PM',
          task: 'Medication administration',
          medications: ['Gabapentin'],
          notes: 'Final scheduled pain medication'
        },
        {
          time: '8:15 PM',
          task: 'PRN pain assessment',
          notes: 'Assess need for Tramadol before bed, give if needed'
        },
        {
          time: '8:30 PM',
          task: 'Night clothes assistance',
          notes: 'Help change into comfortable nightwear'
        },
        {
          time: '8:45 PM',
          task: 'Bed preparation',
          notes: 'Ensure supportive pillows, proper positioning'
        },
        {
          time: '9:00 PM',
          task: 'Final comfort check',
          notes: 'Ensure positioned for comfort, pain controlled'
        },
        {
          time: '10:00 PM',
          task: 'Night pain check',
          notes: 'Assess comfort, reposition if needed'
        }
      ],
      Night: [
        {
          time: '12:00 AM',
          task: 'Midnight assessment',
          notes: 'Check pain level if awake, offer PRN if needed'
        },
        {
          time: '2:00 AM',
          task: 'Position change',
          notes: 'Gentle repositioning if awake, check pressure areas'
        },
        {
          time: '4:00 AM',
          task: 'Pain reassessment',
          notes: 'Offer PRN medication if awake and in pain >5/10'
        },
        {
          time: '6:00 AM',
          task: 'Early morning check',
          notes: 'Assess pain level, prepare for morning routine'
        }
      ]
    },
    emergencyContact: 'Steven Webb (Son) - 555-4567',
    doctorNotes: [
      'Monitor pain levels closely',
      'Assist with mobility and comfort',
      ' Take Tramadol - 50mg as needed for pain relief'
    ]
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
