<template>
  <div class="staff-page">
    <header>
      <div class="container header-container">
        <router-link to="/staff" class="logo"
          ><span>Swin Care</span></router-link
        >
        <div class="user-info">
          <button class="notifications-btn">
            📋<span class="alert-count">3</span>
          </button>
          <div class="user-name">Serena Tr</div>
          <div class="user-avatar">ST</div>
        </div>
      </div>
    </header>

    <main class="container">
      <div class="row align-items-center">
        <div class="welcome-banner col-8 mx-2">
          <h1>Resident Information</h1>
          <p>Today is {{ todayDate }}.</p>
        </div>
        <div class="welcome-banner col-3 mx-2 text-center">
          <p><b>Total Residents</b></p>
          <p class="text-2xl font-bold mt-1">
            Count: {{ filteredResidents.length }}
          </p>
        </div>
      </div>

      <div class="flex flex-col items-center gap-4 mb-8">
        <div class="flex items-center gap-2">
          <input
            type="text"
            v-model="search"
            placeholder="Search residents..."
            class="search-input"
          />
          <button @click="refreshData" class="refresh-btn">Refresh 🔄</button>
        </div>
      </div>

      <!-- Shift selector -->
      <div class="mb-4 flex items-center gap-4">
        <label for="shift" class="font-medium">Select Shift:</label>
        <select v-model="nurseShift" id="shift" class="border p-2 rounded">
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
          <option value="Night">Night</option>
        </select>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full table-auto border rounded shadow bg-pink-800">
          <thead class="bg-pink-500">
            <tr>
              <th class="px-4 py-2 text-left">ID</th>
              <th class="px-4 py-2 text-left">Name</th>
              <th class="px-4 py-2 text-left">Age</th>
              <th class="px-4 py-2 text-left">Room Allocated</th>
              <th class="px-4 py-2 text-left">Care Plan</th>
              <th class="px-4 py-2 text-left">Medications</th>
              <th class="px-4 py-2 text-left">View Details</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="resident in paginatedResidents"
              :key="resident.id"
              class="border-t"
            >
              <td class="px-4 py-1">
                <b>{{ resident.id }}</b>
              </td>
              <td class="px-4 py-1">{{ resident.name }}</td>
              <td class="px-4 py-1">{{ resident.age }}</td>
              <td class="px-4 py-1">{{ resident.roomId }}</td>
              <!-- <td class="px-4 py-1">{{ resident.carePlan }}</td>
              <td class="px-4 py-1">{{ resident.medications.join(', ') }}</td> -->

              <td class="px-4 py-1">
                <div v-if="typeof resident.carePlan === 'string'">
                  {{ resident.carePlan }}
                </div>
                <div>
                  <ul>
                    <li
                      v-for="(task, i) in getShiftTasks(resident.carePlan)"
                      :key="nurseShift + '-' + i"
                    >
                      {{ task.time ? task.time + ' - ' : '' }}{{ task.task }}
                    </li>
                  </ul>
                </div>
              </td>

              <td class="px-4 py-1">
                <div v-if="Array.isArray(resident.medications)">
                  <ul>
                    <li
                      v-for="(medication, index) in resident.medications"
                      :key="'medication-' + index"
                    >
                      <span class="list-content">
                        <strong>{{ medication.name }}</strong> -
                        {{ medication.dosage }} ({{ medication.frequency }} at
                        {{ medication.time }})
                      </span>
                    </li>
                  </ul>
                </div>
              </td>
              <td class="py-1">
                <button @click="viewDetails(resident)" class="details-btn">
                  <i
                    class="fa-solid fa-book-open-reader"
                    style="color: #ffffff"
                  ></i>
                  Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- pagination navigation -->
        <nav class="d-flex justify-content-center mt-4">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button
                class="page-link"
                @click="currentPage--"
                :disabled="currentPage === 1"
              >
                Previous
              </button>
            </li>

            <li
              class="page-item"
              v-for="page in totalPages"
              :key="page"
              :class="{ active: page === currentPage }"
            >
              <button class="page-link" @click="currentPage = page">
                {{ page }}
              </button>
            </li>

            <li
              class="page-item"
              :class="{ disabled: currentPage === totalPages }"
            >
              <button
                class="page-link"
                @click="currentPage++"
                :disabled="currentPage === totalPages"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>

        <!-- resident details card -->
        <div v-if="showDetails" class="overlay" @click="closeDetails">
          <div class="resident-card-container" @click.stop>
            <div class="resident-card bg-white p-6 rounded shadow">
              <h2 class="text-xl font-bold mb-2">Resident Details</h2>

              <p><strong>Name:</strong> {{ selectedResident.name }}</p>
              <p><strong>Gender:</strong> {{ selectedResident.gender }}</p>
              <p><strong>Age:</strong> {{ selectedResident.age }}</p>
              <p><strong>Room:</strong> {{ selectedResident.roomId }}</p>
              <!-- <p><strong>Care Plan:</strong> {{ selectedResident.carePlan }}</p> -->
              <div v-if="typeof selectedResident.carePlan === 'string'">
                <p>
                  <strong>Care Plan:</strong> {{ selectedResident.carePlan }}
                </p>
              </div>
              <div v-else>
                <p><strong>Morning Tasks:</strong></p>
                <ul>
                  <li
                    v-for="(task, i) in selectedResident.carePlan.Morning"
                    :key="'Morning-' + i"
                  >
                    {{ task.time ? task.time + ' - ' : '' }}{{ task.task }}
                  </li>
                </ul>

                <p><strong>Afternoon & Evening Tasks:</strong></p>
                <ul>
                  <li
                    v-for="(task, i) in selectedResident.carePlan.Evening"
                    :key="'Evening-' + i"
                  >
                    {{ task.time ? task.time + ' - ' : '' }}{{ task.task }}
                  </li>
                </ul>

                <p><strong>Night Tasks:</strong></p>
                <ul>
                  <li
                    v-for="(task, i) in selectedResident.carePlan.Night"
                    :key="'Night-' + i"
                  >
                    {{ task.time ? task.time + ' - ' : '' }}{{ task.task }}
                  </li>
                </ul>
              </div>

              <!-- display emergenc contact, allergies, etc -->
              <p>
                <strong>Emergency Contact:</strong>
                {{ selectedResident.emergencyContact }}
              </p>
              <p>
                <strong>Allergies:</strong>
                {{ selectedResident.allergies.join(',') }}
              </p>
              <p>
                <strong>Medications:</strong>
              </p>
              <ul class="styled-list">
                <li
                  v-for="(medication, index) in selectedResident.medications"
                  :key="'medication-' + index"
                >
                  <span class="list-icon">💊</span>
                  <span class="list-content">
                    <strong>{{ medication.name }}</strong> -
                    {{ medication.dosage }} ({{ medication.frequency }} at
                    {{ medication.time }})
                  </span>
                </li>
              </ul>
              <button @click="closeDetails" class="refresh-btn mt-4">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ResidentInfo',
  data() {
    return {
      search: '',
      // vars for resident details card
      showDetails: false,
      selectedResident: null,
      // pagination
      currentPage: 1,
      residentsPerPage: 5,
      totalResidents: 0,
      nurseShift: 'Morning',
      residents: [
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
              dosage: '81mg',
              frequency: 'Daily',
              time: '8:00 AM',
              notes: 'with food'
            },
            {
              name: 'Metformin',
              dosage: '500mg',
              frequency: 'Twice a day',
              time: '8:00 AM',
              notes: 'with breakfast'
            },
            {
              name: 'Metformin',
              dosage: '500mg',
              frequency: 'Twice a day',
              time: '6:00 PM',
              notes: 'with dinner'
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
              notes: 'with breakfast'
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
              time: '6:00 PM'
            },
            {
              name: 'Atorvastatin',
              dosage: '20mg',
              frequency: 'night',
              time: '9:00 PM'
            },
            {
              name: 'Metoprolol',
              dosage: '50mg',
              frequency: 'Twice a day',
              time: '8:00 AM'
            },
            {
              name: 'Metoprolol',
              dosage: '50mg',
              frequency: 'Twice a day',
              time: '8:00 PM'
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
              time: '6:00 PM'
            },
            {
              name: 'Atorvastatin',
              dosage: '20mg',
              frequency: 'night',
              time: '9:00 PM'
            },
            {
              name: 'Metoprolol',
              dosage: '50mg',
              frequency: 'Twice a day',
              time: '8:00 AM / 8:00 PM'
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
              time: '8:00 AM'
            },
            {
              name: 'Memantine',
              dosage: '10mg',
              frequency: 'daily',
              time: '8:00 PM'
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
              time: '8:00 AM'
            },
            {
              name: 'Vitamin D',
              dosage: '1000 IU',
              frequency: 'daily',
              time: '8:00 AM'
            },
            {
              name: 'Alendronate',
              dosage: '70mg',
              frequency: 'weekly',
              time: 'Monday, 7:00 AM'
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
              time: '8:00 AM / 2:00 PM / 8:00 PM'
            },
            {
              name: 'Tramadol',
              dosage: '50mg',
              frequency: 'as needed',
              time: 'PRN'
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
        },
        {
          id: '01087',
          name: 'Albert Flores',
          gender: 'Male',
          age: 80,
          roomId: '306',
          allergies: ['None'],
          medications: [
            {
              name: 'Metformin',
              dosage: '500mg',
              frequency: 'twice a day',
              time: '8:00 AM / 6:00 PM'
            },
            {
              name: 'Insulin',
              dosage: 'as prescribed',
              frequency: 'before meals',
              time: 'AC meals'
            }
          ],
          carePlan: {
            Morning: [
              {
                time: '8:00 AM',
                task: 'Give Metformin and Insulin before breakfast',
                medications: ['Metformin', 'Insulin']
              },
              { task: 'Monitor blood glucose levels' },
              { task: 'Diet-controlled breakfast' }
            ],
            Evening: [
              {
                time: '6:00 PM',
                task: 'Give Metformin and Insulin before dinner',
                medications: ['Metformin', 'Insulin']
              },
              { task: 'Recheck blood sugar and record' },
              { task: 'Encourage water intake and light walking' }
            ],
            Night: [
              { task: 'Monitor for hypoglycemia symptoms' },
              { task: 'Blood sugar check at midnight' }
            ]
          },
          emergencyContact: 'Carlos Flores (Brother) - 555-3450'
        },
        {
          id: '01123',
          name: 'Arlene McCoy',
          gender: 'Female',
          age: 76,
          roomId: '108',
          allergies: ['Milk'],
          medications: [
            {
              name: 'Donepezil',
              dosage: '10mg',
              frequency: 'daily',
              time: '8:00 AM'
            }
          ],
          carePlan: {
            Morning: [
              {
                time: '8:00 AM',
                task: 'Give medication',
                medications: ['Donepezil']
              },
              { task: 'Cognitive stimulation (storytelling, art activities)' },
              { task: 'Supervised grooming and breakfast' }
            ],
            Evening: [
              { task: 'Reminiscence activities (photo books, music)' },
              { task: 'Encourage communication and journaling' }
            ],
            Night: [
              { task: 'Quiet environment with relaxing music' },
              { task: 'Monitor for confusion or restlessness' }
            ]
          },
          emergencyContact: 'Paul McCoy (Husband) - 555-5670'
        }
      ]
    }
  },
  computed: {
    filteredResidents() {
      const term = this.search.toLowerCase()
      return this.residents.filter(
        (res) => res.name.toLowerCase().includes(term) || res.id.includes(term)
      )
    },
    todayDate() {
      return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    // pagination logic
    paginatedResidents() {
      const start = (this.currentPage - 1) * this.residentsPerPage
      const end = start + this.residentsPerPage
      return this.filteredResidents.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredResidents.length / this.residentsPerPage)
    }
  },
  methods: {
    refreshData() {
      window.location.reload()
    },
    viewDetails(resident) {
      this.selectedResident = resident
      this.showDetails = true
    },
    closeDetails() {
      this.selectedResident = null
      this.showDetails = false
    },
    getShiftTasks(carePlan) {
      return carePlan[this.nurseShift] || []
    }
  },
  watch: {
    search() {
      this.currentPage = 1
    }
  },
  mounted() {
    this.totalResidents = this.residents.length
  }
}
</script>

<style scoped>
.staff-page {
  --primary: #ff2474;
  --primary-light: #ff5d98;
  --secondary: #f4b942;
  --dark: #2a3950;
  --light: #f9f9f9;
  --danger: #d64045;
  --success: #4caf50;
  --gray: #e5e9f0;
  background-color: var(--light);
  color: var(--dark);
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
}

.container {
  width: 80vw;
  max-width: 1200px; /* Set a max width for larger screens */
  margin: 0 auto; /* Center the container */
  padding: 0 20px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--primary);
  text-decoration: none;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's above other content */
}
.details-btn {
  background-color: var(--primary-light); /* Customize button color */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.details-btn:hover {
  background-color: hsl(338, 100%, 58%);
}

.resident-card-container {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  max-height: 90%; /* Set a maximum height */
  overflow-y: auto; /* Enable vertical scrolling */
  position: relative;
}

.resident-card {
  padding: 3rem;
  border-radius: 10px;
  background-color: white;
  text-align: left;
}
.resident-card h2 {
  margin-bottom: 1rem;
  color: var(--primary);
  text-align: center;
}

.refresh-btn {
  background-color: var(--primary); /* Customize button color */
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: auto;
  display: block; /* Center the button */
}

.refresh-btn:hover {
  background-color: #ff5d98; /* Lighter color on hover */
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--gray);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: var(--dark);
}

.welcome-banner {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.welcome-banner h1 {
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: var(--dark);
}

.welcome-banner p {
  color: #666;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.gap-4 {
  gap: 1rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.text-center {
  text-align: center;
}

.text-gray-400 {
  color: #666;
}

.text-2xl {
  font-size: 1.5rem; /* Adjusted for consistency */
}

.table-auto {
  width: 100%;
  border-collapse: collapse;
}

.table-auto th,
.table-auto td {
  padding: 0.75rem;
  border: 1px solid var(--gray);
}

.table-auto th {
  background-color: #ff2474;
  color: white;
}

.table-auto tbody tr:nth-child(even) {
  background-color: var(--light);
}

.table-auto tbody tr:hover {
  background-color: hsl(338, 100%, 87%);
}
.table-auto td {
  text-align: left;
}
.bg-gray-800 {
  background-color: var(--dark);
}

.bg-gray-700 {
  background-color: var(--primary);
}

.bg-pink-600 {
  background-color: #ff6b81; /* Tailwind blue */
}

.bg-blue-500 {
  background-color: #ff6b81; /* Tailwind blue */
}

.rounded {
  border-radius: 0.5rem;
}

.shadow {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.alert-count {
  background-color: var(--danger);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  position: absolute;
  top: -5px;
  right: -5px;
}
.page-link {
  background-color: var(--primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin: 0 0.25rem;
}

.pagination .page-item.active .page-link {
  background-color: var(--primary) !important; /* Darker pink for active page */
  color: white !important; /* Ensure text is white */
  box-shadow: 0 0 20px var(--primary);
  border: none;
}
.page-link:hover {
  background-color: #d81b60; /* Darker pink on hover */
  color: white; /* White text on hover */
}

.notifications-btn {
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
}

textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--gray);
  border-radius: 0.5rem;
  background-color: #ffebee;
  color: var(--dark);
}

textarea:focus {
  outline: none;
  border-color: var(--primary);
}

@media (max-width: 768px) {
  .welcome-banner {
    margin-bottom: 1rem;
  }

  .header-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .user-info {
    margin-top: 1rem;
  }
}

@media (max-width: 480px) {
  .welcome-banner {
    padding: 1rem;
  }

  .text-2xl {
    font-size: 1.25rem; /* Adjust for smaller screens */
  }
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links a {
  color: var(--primary);
  margin-left: 1rem;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}
/* Search Input Styles */
.search-input {
  background-color: #ff2474; /* Pink background */
  color: white; /* White text color */
  border: 1px solid var(--primary-light); /* Light pink border */
  border-radius: 0.5rem; /* Rounded corners */
  padding: 0.75rem; /* Padding for better spacing */
  width: 250px; /* Fixed width for consistency */
  transition: border-color 0.3s ease; /* Smooth transition for focus */
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7); /* Light white for placeholder text */
}

.search-input:focus {
  outline: none; /* Remove default outline */
  border-color: white; /* Change border color to white on focus */
}

/* Refresh Button Styles */
.refresh-btn {
  background-color: #ff2474; /* Pink background */
  color: white; /* White text */
  padding: 0.75rem 1rem; /* Padding for better spacing */
  border: none; /* Remove default border */
  border-radius: 0.5rem; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s ease; /* Smooth transition for hover */
}

.refresh-btn:hover {
  background-color: var(--primary-light); /* Lighter pink on hover */
}
.styled-list {
  list-style: none; /* Remove default bullets */
  padding: 0; /* Remove default padding */
  margin: 0; /* Remove default margin */
}

.styled-list li {
  display: flex; /* Align icon and content horizontally */
  align-items: center; /* Vertically center the icon and text */
  padding: 0.5rem 0; /* Add spacing between list items */
  border-bottom: 1px solid var(--gray); /* Add a subtle divider */
}

.styled-list li:last-child {
  border-bottom: none; /* Remove divider for the last item */
}

.list-icon {
  margin-right: 0.5rem; /* Add spacing between the icon and text */
  font-size: 1.2rem; /* Adjust icon size */
  color: var(--primary); /* Use the primary color for the icon */
}

.list-content {
  flex: 1; /* Allow the content to take up remaining space */
  color: var(--dark); /* Use the dark color for text */
}
</style>
