// FacilityManagement.vue
<template>
  <div class="facility-page">
    <HeaderBar />
    <main class="container my-4 facility-page">
      <FacilityHeader :count="allFacilities.length" />
      <FacilityTable :facilities="allFacilities" @remove="removeFacility" />
      <FacilityForm :facility="aFacility" @add="addFacility" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'

import HeaderBar from '@/components/facility/HeaderBar.vue'
import FacilityHeader from '@/components/facility/FacilityHeader.vue'
import FacilityTable from '@/components/facility/FacilityTable.vue'
import FacilityForm from '@/components/facility/FacilityForm.vue'

const aFacility = ref({
  name: '',
  location: '',
  type: '',
  capacity: '',
  manager: '',
  status: ''
})

const allFacilities = ref([])

onMounted(async () => {
  try {
    const response = await api.get('/rooms')
    allFacilities.value = response.data
  } catch (err) {
    console.error('Failed to load facilities:', err)
  }

  const notificationsBtn = document.querySelector('.notifications-btn')
  if (notificationsBtn) {
    notificationsBtn.addEventListener('click', function () {
      alert(
        'You have 2 facility alerts:\n- Facility inspection pending\n- Capacity limit exceeded'
      )
    })
  }
})

const addFacility = async (facility) => {
  if (!facility.id) {
    facility.id = generateRoomId(facility)
  }
  try {
    const response = await api.post('/rooms', facility)
    allFacilities.value.push(response.data)
    aFacility.value = {
      id: '',
      name: '',
      location: '',
      type: '',
      capacity: '',
      manager: '',
      status: ''
    }
  } catch (err) {
    console.error('Failed to add facility:', err)
  }
}

function generateRoomId(facility) {
  return `${facility.floor}-${Date.now()}`
}

const removeFacility = async (index) => {
  const target = allFacilities.value[index]
  try {
    await api.delete(`/rooms/${target.id}`)
    allFacilities.value.splice(index, 1)
  } catch (err) {
    console.error('Failed to delete facility:', err)
  }
}
</script>

<style scoped>
.facility-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--light);
  color: var(--dark);
  min-height: 100vh;
  padding-bottom: 2rem;
}
</style>
