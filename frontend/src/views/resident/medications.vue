<template>
  <main class="medications-section">
    <h2>Current Medications</h2>
    <ul class="medications-list">
      <li class="medication-item" v-for="med in medications" :key="med.name">
        <div class="medication-info">
          <h3>{{ med.name }}</h3>
          <p>Dosage: {{ med.dosage }} — {{ med.frequency }}</p>
        </div>
        <div class="medication-status" :class="{ due: med.dueNow }">
          {{ med.dueNow ? 'Take Now' : 'Upcoming' }}
        </div>
      </li>
    </ul>
  </main>
</template>

<script setup>
const medications = [
  {
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily (Morning)',
    dueNow: true
  },
  {
    name: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily (Night)',
    dueNow: false
  },
  {
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    dueNow: false
  }
]
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
</style>
