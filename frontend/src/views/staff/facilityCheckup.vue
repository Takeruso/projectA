<template>
  <div class="staff-page">
    <header>
      <div class="container header-container">
        <router-link to="/staff" class="logo">
          <span>Swin Care</span>
        </router-link>
        <div class="user-info">
          <button class="notifications-btn">
            🏥
            <span class="alert-count">2</span>
          </button>
          <div class="user-name">Serena Tr</div>
          <div class="user-avatar">ST</div>
        </div>
      </div>
    </header>

    <main class="container">
      <div class="row align-items-center">
        <div class="welcome-banner col-8 mx-2">
          <h1>Facility Checkup</h1>
          <p>
            Today is {{ todayDate }}. Below is the current room usage status.
          </p>
        </div>
        <div class="welcome-banner col-3">
          <p><b>Total Rooms</b></p>
          <p class="text-2xl font-bold mt-1">
            Count: {{ filteredFacilities.length }}
          </p>
        </div>
      </div>

      <div class="mb-4 text-center">
        <button @click="resetFilters" class="refresh-btn">Reset Filters</button>
      </div>

      <div class="flex flex-wrap gap-4 justify-center items-center mb-6">
        <select v-model="selectedStatus" class="filter-dropdown">
          <option value="">All Statuses</option>
          <option>Occupied</option>
          <option>Reserved</option>
          <option>Available</option>
        </select>

        <select v-model="selectedType" class="filter-dropdown">
          <option value="">All Room Types</option>
          <option>Private</option>
          <option>Shared</option>
          <option>2-Bedroom Standard</option>
          <option>3-Bedroom Standard</option>
        </select>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full table-auto bordered-table">
          <thead class="facility-table-header">
            <tr>
              <th class="px-4 py-2 text-left">Room No</th>
              <th class="px-4 py-2 text-left">Type</th>
              <th class="px-4 py-2 text-left">Occupant</th>
              <th class="px-4 py-2 text-left">Status</th>
              <th class="px-4 py-2 text-left">Last Checkup</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="room in filteredFacilities"
              :key="room.roomNo + room.occupant"
            >
              <td class="px-4 py-2">{{ room.roomNo }}</td>
              <td class="px-4 py-2">{{ room.type }}</td>
              <td class="px-4 py-2">{{ room.occupant || '—' }}</td>
              <td class="px-4 py-2">
                <span
                  :class="{
                    'text-green-500 font-semibold': room.status === 'Available',
                    'text-yellow-400 font-semibold': room.status === 'Reserved',
                    'text-red-500 font-semibold': room.status === 'Occupied'
                  }"
                >
                  {{ room.status }}
                </span>
              </td>
              <td class="px-4 py-2">{{ room.lastChecked }}</td>
            </tr>

            <!-- Show message if no rooms match -->
            <tr v-if="filteredFacilities.length === 0">
              <td colspan="5" class="px-4 py-4 text-center text-gray-500">
                No rooms match your current filter.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <footer class="mt-10 py-4 text-center bg-gray-900 text-white">
      © 2025 Swin Care - All rights reserved.
    </footer>
  </div>
</template>

<script>
export default {
  name: 'FacilityCheckup',
  data() {
    return {
      selectedStatus: '',
      selectedType: '',
      facilityData: [
        {
          roomNo: '101',
          type: 'Private',
          occupant: 'Floyd Miles',
          status: 'Occupied',
          lastChecked: '2025-04-26 02:00 PM'
        },
        {
          roomNo: '102',
          type: 'Shared',
          occupant: 'Harold Finch',
          status: 'Occupied',
          lastChecked: '2025-04-26 02:05 PM'
        },
        {
          roomNo: '203',
          type: 'Private',
          occupant: 'Devon Lane',
          status: 'Occupied',
          lastChecked: '2025-04-26 02:10 PM'
        },
        {
          roomNo: '305',
          type: 'Shared',
          occupant: 'Cody Fisher',
          status: 'Occupied',
          lastChecked: '2025-04-26 02:15 PM'
        },
        {
          roomNo: '111',
          type: '3-Bedroom Standard',
          occupant: 'Cameron Williamson',
          status: 'Occupied',
          lastChecked: '2025-04-26 02:20 PM'
        },
        {
          roomNo: '212',
          type: '2-Bedroom Standard',
          occupant: 'Eleanor Pena',
          status: 'Occupied',
          lastChecked: '2025-04-26 02:25 PM'
        },
        {
          roomNo: '220',
          type: '2-Bedroom Standard',
          occupant: 'Theresa Webb',
          status: 'Occupied',
          lastChecked: '2025-04-26 02:30 PM'
        },
        {
          roomNo: '103',
          type: 'Private',
          occupant: '',
          status: 'Reserved',
          lastChecked: '2025-04-26 02:35 PM'
        },
        {
          roomNo: '104',
          type: 'Shared',
          occupant: 'Emily Smith',
          status: 'Occupied',
          lastChecked: '2025-04-26 02:40 PM'
        },
        {
          roomNo: '110',
          type: 'Private',
          occupant: '',
          status: 'Reserved',
          lastChecked: '2025-04-26 02:45 PM'
        },
        {
          roomNo: '112',
          type: '3-Bedroom Standard',
          occupant: '',
          status: 'Available',
          lastChecked: '2025-04-26 02:50 PM'
        },
        {
          roomNo: '113',
          type: '3-Bedroom Standard',
          occupant: '',
          status: 'Available',
          lastChecked: '2025-04-26 02:55 PM'
        },
        {
          roomNo: '114',
          type: 'Private',
          occupant: '',
          status: 'Available',
          lastChecked: '2025-04-26 03:00 PM'
        },
        {
          roomNo: '115',
          type: '2-Bedroom Standard',
          occupant: '',
          status: 'Available',
          lastChecked: '2025-04-26 03:05 PM'
        },
        {
          roomNo: '116',
          type: 'Private',
          occupant: '',
          status: 'Available',
          lastChecked: '2025-04-26 03:10 PM'
        },
        {
          roomNo: '117',
          type: '2-Bedroom Standard',
          occupant: '',
          status: 'Available',
          lastChecked: '2025-04-26 03:15 PM'
        }
      ]
    }
  },
  computed: {
    todayDate() {
      return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    filteredFacilities() {
      // Filter by status and type first
      let filtered = this.facilityData.filter((room) => {
        const matchesStatus =
          !this.selectedStatus ||
          room.status.toLowerCase() === this.selectedStatus.toLowerCase()
        const matchesType =
          !this.selectedType ||
          room.type.toLowerCase() === this.selectedType.toLowerCase()

        return matchesStatus && matchesType
      })

      // Return only one entry per unique roomNo (first match)
      const seen = new Set()
      return filtered.filter((room) => {
        if (seen.has(room.roomNo)) return false
        seen.add(room.roomNo)
        return true
      })
    }
  },
  methods: {
    resetFilters() {
      this.selectedStatus = '' // Reset status filter
      this.selectedType = '' // Reset type filter
    }
  }
}
</script>

<style scoped>
/* Styles copied and adapted from your AppointmentCarer.vue */
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
.facility-table-header {
  background-color: #ff2474; /* Pink */
  color: white; /* White text */
}
.filter-dropdown {
  padding: 0.75rem;
  border: 1px solid var(--gray);
  border-radius: 0.5rem;
  background-color: white;
  color: var(--dark);
  min-width: 200px;
  cursor: pointer;
}

.bordered-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.bordered-table th,
.bordered-table td {
  border: 1px solid #ddd; /* Light gray borders */
  padding: 0.75rem;
  text-align: left;
}

.bordered-table th {
  background-color: #ff2474; /* Pink background */
  color: white; /* White text */
}

.container {
  width: 80vw;
  max-width: 1200px;
  margin: 0 auto;
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

.text-2xl {
  font-size: 1.5rem;
}

.refresh-btn {
  background-color: #ff2474;
  color: white;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.refresh-btn:hover {
  background-color: var(--primary-light);
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

.notifications-btn {
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
}
</style>
