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
          <div
            class="medication-status"
            :class="{ due: med.dueNow, refill: med.needsRefill }"
          >
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
import { residents } from '@/data/residentsData.js' // Adjust the path as necessary

export default {
  data() {
    return {
      residents: residents,
      selectedResidentId: null
    }
  },
  methods: {
    getSelectedResident() {
      return this.residents.find(
        (resident) => resident.id === this.selectedResidentId
      )
    }
  },
  computed: {
    selectedResident() {
      const resident = this.residents.find(
        (resident) => resident.id === this.selectedResidentId
      )
      if (resident) {
        resident.medications.forEach((medication) => {
          medication.needsRefill = medication.stockLevel <= 5
        })
      }
      return resident
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
</style>
