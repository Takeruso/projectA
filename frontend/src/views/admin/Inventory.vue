<template>
  <div class="resident-page">
    <header>
      <div class="container header-container">
        <div class="logo">
          <span>Swin Care</span>
        </div>
        <div class="user-info">
          <button class="notifications-btn">
            📋
            <span class="alert-count">3</span>
          </button>
          <div class="user-name">Martha Johnson</div>
          <div class="user-avatar">MJ</div>
        </div>
      </div>
    </header>

    <main class="container">
      <!-- Inventory -->
      <div id="table" class="container mt-4">
        <!-- Filter Input -->
        <div class="row g-2 mb-3">
          <div class="col">
            <input
              v-model="filterText"
              class="form-control"
              placeholder="Filter by name"
            />
          </div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th style="background-color: #ff2474">Name</th>
              <th style="background-color: #ff2474">Stock</th>
              <th style="background-color: #ff2474">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(m, index) in filteredRecords" :key="index">
              <td>{{ m.name }}</td>
              <td>
                <input type="number" v-model="m.stock" min="0" max="100" />
              </td>
              <td>
                <button @click="removeRecord(index)" class="btn pink">
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row g-2">
          <div class="col">
            <input
              v-model="aRecord.name"
              class="form-control"
              placeholder="Name"
            />
          </div>
          <div class="col">
            <input
              type="number"
              v-model.number="aRecord.stock"
              class="form-control"
              placeholder="Stock"
              min="1"
              step="1"
            />
          </div>
          <div class="col">
            <button @click="addRecord" class="btn pink">Submit</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Data for staff records
const aRecord = ref({
  name: '',
  quantity: ''
})

const allRecords = ref([
  {
    name: 'Melatonin 500mg',
    stock: '5'
  },
  {
    name: 'Paracetamol 500mg',
    stock: '3'
  },
  {
    name: 'Ibuprofen 200mg',
    stock: '1'
  }
])

const filterText = ref('')

// Computed property for filtered records
const filteredRecords = computed(() => {
  return allRecords.value.filter((record) =>
    record.name.toLowerCase().includes(filterText.value.toLowerCase())
  )
})

const removeRecord = (index) => {
  allRecords.value.splice(index, 1)
}

const addRecord = () => {
  const { name, stock } = aRecord.value
  const stockNum = Number(stock)

  if (name.trim() && Number.isInteger(stockNum) && stockNum >= 1) {
    allRecords.value.push({ name: name.trim(), stock: stockNum })
    aRecord.value = { name: '', stock: '' }
  } else {
    alert('Please enter a valid name and stock (must be integer ≥ 1).')
  }
}

onMounted(() => {
  const cards = document.querySelectorAll('.card')
  cards.forEach((card) => {
    card.addEventListener('click', function (e) {
      if (!e.target.classList.contains('cta')) {
        const cta = this.querySelector('.cta')
        if (cta) window.location.href = cta.getAttribute('href')
      }
    })
  })

  const notificationsBtn = document.querySelector('.notifications-btn')
  if (notificationsBtn) {
    notificationsBtn.addEventListener('click', function () {
      alert(
        'You have 3 notifications:\n- Medication refill ready for pickup\n- New medical report available\n- Your bill payment is due in 5 days'
      )
    })
  }
})
</script>

<style scoped>
:deep(.resident-page *) {
  all: unset;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
}
.resident-page main {
  padding: 2rem 0;
}

.resident-page header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  width: 80vw;
  max-width: none;
  margin: 0;
  padding: 0 20px;
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

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.card {
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.1);
}

.card-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  background-color: #e6e6e6;
  color: #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
}

.card-appointments .card-icon {
  background-color: var(--primary);
}

.card-bills .card-icon {
  background-color: var(--secondary);
}

.card-medical .card-icon {
  background-color: var(--success);
}

.card-medication .card-icon {
  background-color: var(--danger);
}

.card h2 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--dark);
}

.card p {
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  flex-grow: 1;
}

.card .cta {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--primary-light);
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
  text-align: center;
  margin-top: auto;
}

.card .cta:hover {
  background-color: var(--primary);
}

.quick-access {
  margin-top: 2rem;
}

.quick-access h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: var(--dark);
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.quick-link {
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  color: var(--dark);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.quick-link:hover {
  transform: translateY(-3px);
}

.quick-link-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.9rem;
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

.upcoming-section {
  margin-top: 2rem;
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.upcoming-section h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: var(--dark);
}

.upcoming-list {
  list-style-type: none;
}

.upcoming-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--gray);
}

.upcoming-item:last-child {
  border-bottom: none;
}

.upcoming-date {
  min-width: 80px;
  text-align: center;
  padding: 0.5rem;
  background-color: var(--gray);
  border-radius: 5px;
  font-weight: bold;
}

.upcoming-details {
  flex: 1;
}

.upcoming-details h3 {
  font-size: 1rem;
  margin-bottom: 0.3rem;
}

.pink {
  background-color: #ff5d98;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.pink:hover {
  background-color: #ff2474;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 0.8rem;
  text-align: left;
}

.table th {
  color: white;
}

.table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table tr:hover {
  background-color: #f1f1f1;
}

.form-control {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.row {
  margin-top: 1rem;
}
</style>
