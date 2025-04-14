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
import HeaderBar from '@/components/facility/HeaderBar.vue'
import FacilityHeader from '@/components/residentManagement/ResidentHeader.vue'
import FacilityTable from '@/components/residentManagement/ResidentTable.vue'
// import FacilityForm from '@/components/residentManagement/FacilityForm.vue'

const aFacility = ref({
  name: '',
  location: '',
  type: '',
  capacity: '',
  manager: '',
  status: ''
})

const allFacilities = ref([
  {
    name: 'Sunrise Home',
    location: 'Melbourne CBD',
    type: 'Aged Care',
    capacity: 120,
    manager: 'Sarah Wilson',
    status: 'Open'
  },
  {
    name: 'Riverpark',
    location: 'Richmond',
    type: 'Disability Support',
    capacity: 80,
    manager: 'Tom Evans',
    status: 'Under Maintenance'
  }
])

const removeFacility = (index) => {
  allFacilities.value.splice(index, 1)
}

const addFacility = (facility) => {
  allFacilities.value.push({ ...facility })
  aFacility.value = {
    name: '',
    location: '',
    type: '',
    capacity: '',
    manager: '',
    status: ''
  }
}

onMounted(() => {
  const notificationsBtn = document.querySelector('.notifications-btn')
  if (notificationsBtn) {
    notificationsBtn.addEventListener('click', function () {
      alert(
        'You have 2 facility alerts:\n- Facility inspection pending\n- Capacity limit exceeded'
      )
    })
  }
})
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
