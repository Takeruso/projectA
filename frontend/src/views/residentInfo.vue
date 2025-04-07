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
              <td class="px-4 py-1">{{ resident.carePlan }}</td>
              <td class="px-4 py-1">{{ resident.medications.join(', ') }}</td>
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
              <p><strong>Care Plan:</strong> {{ selectedResident.carePlan }}</p>
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
                {{ selectedResident.medications.join(', ') }}
              </p>
              <button @click="closeDetails" class="refresh-btn mt-4">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div class="container footer-container">
        <div class="copyright">© 2025 Swin Care. All rights reserved.</div>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Contact Us</a>
          <a href="#">Feedback</a>
        </div>
      </div>
    </footer>
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
      residents: [
        {
          id: '00634',
          name: 'Floyd Miles',
          gender: 'Male',
          age: 82,
          roomId: '101',
          carePlan: 'High-level support, daily visits',
          medications: ['Aspirin', 'Metformin'],
          emergencyContact: 'Jane Miles (Daughter) - 555-1234',
          allergies: ['Penicillin', 'Dust']
        },
        {
          id: '00641',
          name: 'Harold Finch',
          gender: 'Male',
          age: 79,
          roomId: '102',
          carePlan: 'Independent living with weekly check-ins',
          medications: ['Lisinopril'],
          emergencyContact: 'John Finch (Son) - 555-5678',
          allergies: ['Pollen']
        },
        {
          id: '00645',
          name: 'Devon Lane',
          gender: 'Male',
          age: 91,
          roomId: '203',
          carePlan: '24/7 in-home care with night supervision',
          medications: ['Warfarin', 'Atorvastatin', 'Metoprolol'],
          emergencyContact: 'Emily Lane (Daughter) - 555-2345',
          allergies: ['Latex']
        },
        {
          id: '00443',
          name: 'Marvin McKinney',
          gender: 'Male',
          age: 78,
          roomId: '203',
          carePlan: 'Routine Check-up and Monitoring',
          medications: ['Amlodipine', 'Simvastatin'],
          emergencyContact: 'Lisa McKinney (Wife) - 555-6789',
          allergies: ['N/A']
        },
        {
          id: '00374',
          name: 'Cody Fisher',
          gender: 'Male',
          age: 83,
          roomId: '305',
          carePlan: '24/7 in-home care with night supervision',
          medications: ['Warfarin', 'Atorvastatin', 'Metoprolol'],
          emergencyContact: 'Ryan Fisher (Son) - 555-3456',
          allergies: ['Peanuts']
        },
        {
          id: '00985',
          name: 'Cameron Williamson',
          gender: 'Male',
          age: 90,
          roomId: '111',
          carePlan: 'Dementia Care Plan',
          medications: ['Donepezil', 'Memantine'],
          emergencyContact: 'Rachel Williamson (Daughter) - 555-7890',
          allergies: ['None']
        },
        {
          id: '01012',
          name: 'Eleanor Pena',
          gender: 'Female',
          age: 87,
          roomId: '212',
          carePlan: 'Fall Prevention Program',
          medications: ['Calcium', 'Vitamin D', 'Alendronate'],
          emergencyContact: 'Maria Pena (Daughter) - 555-9012',
          allergies: ['None']
        },
        {
          id: '01045',
          name: 'Theresa Webb',
          gender: 'Female',
          age: 85,
          roomId: '220',
          carePlan: 'Chronic Pain Management',
          medications: ['Gabapentin', 'Tramadol'],
          emergencyContact: 'Steven Webb (Son) - 555-4567',
          allergies: ['Peanuts']
        },
        {
          id: '01087',
          name: 'Albert Flores',
          gender: 'Male',
          age: 80,
          roomId: '306',
          carePlan: 'Diabetes Management Plan',
          medications: ['Metformin', 'Insulin'],
          emergencyContact: 'Carlos Flores (Brother) - 555-3450',
          allergies: ['None']
        },
        {
          id: '01123',
          name: 'Arlene McCoy',
          gender: 'Female',
          age: 76,
          roomId: '108',
          carePlan: 'Cognitive Stimulation Activities',
          medications: ['Donepezil'],
          emergencyContact: 'Paul McCoy (Husband) - 555-5670',
          allergies: ['Milk']
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
</style>
