<template>
  <div>
    <header>
      <div class="container header-container">
        <div class="logo">
          <router-link to="/staff" class="logo"
            ><span>Swin Care</span></router-link
          >
        </div>
        <div class="user-info">
          <button class="notifications-btn">
            📋
            <span class="alert-count">2</span>
          </button>
          <div class="user-name">Serena Tr</div>
          <div class="user-avatar">ST</div>
        </div>
      </div>
    </header>
  </div>
  <main class="medications-section">
    <div v-if="medicationsNeedingRefill.length > 0" class="refill-overview">
      <h2>Medications Needing Refill</h2>
      <ul class="refill-list">
        <li v-for="med in medicationsNeedingRefill" :key="med.name">
          {{ med.name }} (for {{ getResidentName(med.residentId) }})
        </li>
      </ul>
    </div>

    <h2>Resident Medications</h2>

    <div class="select-container">
      <select
        id="residentSelect"
        v-model="selectedResidentId"
        class="custom-select"
      >
        <option value="">-- Select a resident --</option>
        <option
          v-for="resident in residents"
          :key="resident.id"
          :value="resident.id"
        >
          {{ resident.name }}
        </option>
      </select>
    </div>

    <div v-if="selectedResident">
      <h3>Medications for {{ selectedResident.name }}</h3>
      <ul class="medications-list">
        <li
          class="medication-item"
          v-for="med in selectedResident.medications"
          :key="med.name"
          :class="{ 'needs-refill': med.needsRefill }"
        >
          <div class="medication-info">
            <h3>{{ med.name }}</h3>
            <p>Dosage: {{ med.dosage }} — {{ med.frequency }}</p>
            <p>Stock: {{ med.stockLevel }}</p>
            <p>Refill Date: {{ med.refill }}</p>
          </div>
          <div class="medication-status" :class="{ refill: med.needsRefill }">
            {{
              med.needsRefill
                ? 'Refill'
                : med.dueNow
                  ? 'Needs refill'
                  : 'Upcoming'
            }}
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Select a resident to view medications.</p>
    </div>
  </main>
</template>

<script>
import { residents as initialResidents } from '@/data/residentsData.js' // Import your initial data

export default {
  data() {
    return {
      residents: initialResidents, // Use the imported data here
      selectedResidentId: null
    }
  },
  created() {
    // Loop through the initial residents data and set needsRefill flag
    this.residents.forEach((resident) => {
      if (resident.medications) {
        resident.medications.forEach((medication) => {
          medication.needsRefill = medication.stockLevel <= 5 // Your refill threshold
          medication.residentId = resident.id // Add residentId to medication object
        })
      }
    })
  },
  methods: {
    getSelectedResident() {
      return this.residents.find(
        (resident) => resident.id === this.selectedResidentId
      )
    },
    getResidentName(residentId) {
      const resident = this.residents.find((r) => r.id === residentId)
      return resident ? resident.name : 'Unknown Resident'
    }
  },
  computed: {
    selectedResident() {
      return this.residents.find(
        (resident) => resident.id === this.selectedResidentId
      )
    },
    medicationsNeedingRefill() {
      const allMedications = []
      this.residents.forEach((resident) => {
        if (resident.medications) {
          allMedications.push(...resident.medications)
        }
      })
      return allMedications.filter((med) => med.needsRefill)
    }
  }
}
</script>

<style scoped>
.medications-section {
  margin-top: 2rem;
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.medications-section h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: var(--dark);
}

.medications-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.medication-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--gray);
}

.medication-item:last-child {
  border-bottom: none;
}

.medication-info h3 {
  font-size: 1rem;
  margin-bottom: 0.3rem;
  color: var(--dark);
}

.medication-info p {
  color: #666;
  font-size: 0.9rem;
}

.medication-status {
  font-weight: bold;
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  background-color: var(--gray);
  color: var(--dark);
}

.medication-status.due {
  background-color: var(--danger);
  color: white;
}

header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: relative;
  width: 100%;
  top: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notifications-btn {
  position: relative;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.alert-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--primary);
  color: white;
  font-size: 0.7rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
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

/* Select Container */
.select-container {
  position: relative;
  width: 100%;
  max-width: 300px; /* Adjust width as needed */
  margin: auto; /* Center the select container */
  margin-bottom: 20px;
}

/* Custom Select */
.custom-select {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: var(--dark);
  background-color: white;
  border: 1px solid var(--gray);
  border-radius: 5px;
  appearance: none; /* Remove default dropdown arrow */
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

/* Custom Select Hover and Focus */
.custom-select:hover {
  border-color: var(--primary-light);
}

.custom-select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 5px rgba(255, 36, 116, 0.5);
  outline: none;
}

.select-container::after {
  content: '▼';
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  font-size: 0.8rem;
  color: var(--dark);
  pointer-events: none;
}
.needs-refill {
  background-color: var(--danger-light);
}

.needs-refill .medication-info h3 {
  color: var(--danger);
  font-weight: 700;
}
.medication-status.refill {
  background-color: var(--danger);
  color: white;
  font-weight: 700;
}
.medication-status.refill::before {
  content: '⚠️';
  margin-right: 0.5rem;
  font-size: 1rem;
}

.refill-overview {
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  border: 1px solid #e74c3c; /* Subtle red border */
  box-shadow: 0 2px 5px rgba(231, 76, 60, 0.1); /* Soft red shadow */
}

.refill-overview h2 {
  font-size: 1.3rem;
  color: #c0392b; /* Darker red text */
  margin-bottom: 1rem;
  border-bottom: 2px solid #e74c3c; /* Red underline */
  padding-bottom: 0.5rem;
}

.refill-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.refill-list li {
  padding: 0.5rem 0;
  font-size: 1rem;
  color: #333; /* Dark gray text for list items */
  display: flex;
  align-items: center;
}

.refill-list li::before {
  content: '💊'; /* Pill emoji for visual cue */
  margin-right: 0.8rem;
  font-size: 1.1rem;
  color: #e74c3c;
}

.refill-list li span {
  font-weight: bold; /* Make the medication name bold */
  color: #2c3e50; /* Dark blue for emphasis */
}

.refill-list li .resident-name {
  font-style: italic; /* Italicize the resident's name */
  color: #777;
  margin-left: 0.5rem;
}
</style>
