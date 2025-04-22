<template>
  <div class="facility-page">
    <HeaderBar />
    <main class="container my-4 facility-page">
      <ResidentHeader :count="residents.length" />
      <ResidentTable :residents="residents" @remove="removeResident" />
      <ResidentForm @add="addResident" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeaderBar from '@/components/facility/HeaderBar.vue'
import ResidentHeader from '@/components/residentManagement/ResidentHeader.vue'
import ResidentTable from '@/components/residentManagement/ResidentTable.vue'
import ResidentForm from '@/components/residentManagement/ResidentForm.vue'

const residents = ref([
  {
    name: 'Taro Yamada',
    age: 82,
    room: '101',
    floor: '1F',
    status: 'present',
    approval: 'admitted'
  },
  {
    name: 'Hanako YAMAHA',
    age: 85,
    room: '102',
    floor: '1F',
    status: 'on_leave',
    approval: 'approved'
  }
])

const addResident = (newResident) => {
  residents.value.push({ ...newResident })
}

const removeResident = (index) => {
  residents.value.splice(index, 1)
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
