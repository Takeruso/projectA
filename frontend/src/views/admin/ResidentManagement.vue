<script setup>
import { ref, onMounted } from 'vue'
import HeaderBar from '@/components/facility/HeaderBar.vue'
import ResidentHeader from '@/components/residentManagement/ResidentHeader.vue'
import ResidentTable from '@/components/residentManagement/ResidentTable.vue'
import ResidentForm from '@/components/residentManagement/ResidentForm.vue'

const residents = ref([])

const fetchResidents = async () => {
  try {
    const res = await fetch('/api/patients')
    if (!res.ok) throw new Error('Failed to fetch')
    residents.value = await res.json()
  } catch (err) {
    console.error('Fetch error:', err)
  }
}

const addResident = async (newResident) => {
  try {
    const res = await fetch('/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newResident)
    })
    if (!res.ok) throw new Error('Failed to add')
    const created = await res.json()
    residents.value.push(created.patient)
  } catch (err) {
    console.error('Add error:', err)
  }
}

const saveResident = async (updatedResident) => {
  try {
    const res = await fetch(`/api/patients/${updatedResident.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedResident)
    })
    if (!res.ok) throw new Error('Failed to save')
    const idx = residents.value.findIndex((r) => r.id === updatedResident.id)
    if (idx !== -1) residents.value[idx] = updatedResident
  } catch (err) {
    console.error('Save error:', err)
  }
}

const removeResident = async (id) => {
  try {
    const response = await fetch(`/api/patients/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Failed to delete')
    residents.value = residents.value.filter((r) => r.id !== id)
  } catch (error) {
    console.error('Delete error:', error)
  }
}

onMounted(fetchResidents)
</script>

<template>
  <div class="facility-page">
    <HeaderBar />
    <main class="container my-4">
      <ResidentHeader :count="residents.length" />
      <ResidentTable
        :residents="residents"
        @save="saveResident"
        @remove="removeResident"
      />
      <ResidentForm @add="addResident" />
    </main>
  </div>
</template>

<style scoped>
.facility-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--light);
  color: var(--dark);
  min-height: 100vh;
  padding-bottom: 2rem;
}
</style>
