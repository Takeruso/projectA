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
      <!-- Staff Records Table -->
      <div id="table" class="container mt-4">
        <!-- Filters -->
        <div class="row g-2 mb-3">
          <div class="col">
            <input
              v-model="filters.firstName"
              class="form-control"
              placeholder="Filter by First Name"
            />
          </div>
          <div class="col">
            <input
              v-model="filters.lastName"
              class="form-control"
              placeholder="Filter by Last Name"
            />
          </div>
          <div class="col">
            <input
              v-model="filters.role"
              class="form-control"
              placeholder="Filter by Role"
            />
          </div>
          <div class="col">
            <input
              v-model="filters.qualification"
              class="form-control"
              placeholder="Filter by Qualification"
            />
          </div>
          <div class="col">
            <input
              v-model="filters.salary"
              class="form-control"
              placeholder="Filter by Annual Salary"
            />
          </div>
          <div class="col">
            <select v-model="filters.employment" class="form-control">
              <option value="">Filter by Employment Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Casual">Casual</option>
            </select>
          </div>
          <div class="col">
            <input
              v-model="filters.dob"
              type="date"
              class="form-control"
              placeholder="Filter by Date of Birth"
            />
          </div>
          <div class="col">
            <div>
              <label>
                <input type="radio" v-model="filters.gender" value="Male" />
                Male
              </label>
              <label>
                <input type="radio" v-model="filters.gender" value="Female" />
                Female
              </label>
              <label>
                <input type="radio" v-model="filters.gender" value="" />
                All
              </label>
            </div>
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th style="background-color: #ff2474">First Name</th>
              <th style="background-color: #ff2474">Last Name</th>
              <th style="background-color: #ff2474">Role</th>
              <th style="background-color: #ff2474">Qualification</th>
              <th style="background-color: #ff2474">Type of Employment</th>
              <th style="background-color: #ff2474">Annual Salary</th>
              <th style="background-color: #ff2474">Date of Birth</th>
              <th style="background-color: #ff2474">Gender</th>
              <th style="background-color: #ff2474">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(m, index) in filteredRecords" :key="index">
              <td>{{ m.first }}</td>
              <td>{{ m.last }}</td>
              <td>{{ m.role }}</td>
              <td>{{ m.qualification }}</td>
              <td>{{ m.employment }}</td>
              <td>{{ m.salary }}</td>
              <td>{{ m.dob }}</td>
              <td>{{ m.gender }}</td>
              <td>
                <button @click="removeRecord(index)" class="btn pink">
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Enhanced Staff Onboarding Form -->
        <div class="form-container">
          <h2 class="form-title">Staff Onboarding Form</h2>

          <div class="form-section">
            <h3>Personal Information</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="first">First Name*</label>
                <input
                  id="first"
                  v-model="aRecord.first"
                  class="form-control"
                  placeholder="First Name"
                />
              </div>
              <div class="form-group">
                <label for="last">Last Name*</label>
                <input
                  id="last"
                  v-model="aRecord.last"
                  class="form-control"
                  placeholder="Last Name"
                />
              </div>
              <div class="form-group">
                <label for="dob">Date of Birth*</label>
                <input
                  id="dob"
                  v-model="aRecord.dob"
                  type="date"
                  class="form-control"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="gender">Gender*</label>
                <select
                  id="gender"
                  v-model="aRecord.gender"
                  class="form-control"
                >
                  <option value="" disabled selected>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div class="form-group">
                <label for="nationality">Nationality*</label>
                <input
                  id="nationality"
                  v-model="aRecord.nationality"
                  class="form-control"
                  placeholder="Nationality"
                />
              </div>
              <div class="form-group">
                <label for="maritalStatus">Marital Status</label>
                <select
                  id="maritalStatus"
                  v-model="aRecord.maritalStatus"
                  class="form-control"
                >
                  <option value="" disabled selected>Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Contact Information</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="email">Email Address*</label>
                <input
                  id="email"
                  v-model="aRecord.email"
                  type="email"
                  class="form-control"
                  placeholder="Email Address"
                />
              </div>
              <div class="form-group">
                <label for="phone">Phone Number*</label>
                <input
                  id="phone"
                  v-model="aRecord.phone"
                  class="form-control"
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group full-width">
                <label for="address">Residential Address*</label>
                <input
                  id="address"
                  v-model="aRecord.address"
                  class="form-control"
                  placeholder="Full Address"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="city">City*</label>
                <input
                  id="city"
                  v-model="aRecord.city"
                  class="form-control"
                  placeholder="City"
                />
              </div>
              <div class="form-group">
                <label for="state">State/Province*</label>
                <input
                  id="state"
                  v-model="aRecord.state"
                  class="form-control"
                  placeholder="State/Province"
                />
              </div>
              <div class="form-group">
                <label for="postal">Postal Code*</label>
                <input
                  id="postal"
                  v-model="aRecord.postal"
                  class="form-control"
                  placeholder="Postal Code"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="emergencyContact">Emergency Contact Name*</label>
                <input
                  id="emergencyContact"
                  v-model="aRecord.emergencyContact"
                  class="form-control"
                  placeholder="Emergency Contact Name"
                />
              </div>
              <div class="form-group">
                <label for="emergencyPhone">Emergency Contact Phone*</label>
                <input
                  id="emergencyPhone"
                  v-model="aRecord.emergencyPhone"
                  class="form-control"
                  placeholder="Emergency Contact Phone"
                />
              </div>
              <div class="form-group">
                <label for="emergencyRelation">Relationship*</label>
                <input
                  id="emergencyRelation"
                  v-model="aRecord.emergencyRelation"
                  class="form-control"
                  placeholder="Relationship to Contact"
                />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Professional Information</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="role">Position/Role*</label>
                <input
                  id="role"
                  v-model="aRecord.role"
                  class="form-control"
                  placeholder="Position/Role"
                />
              </div>
              <div class="form-group">
                <label for="department">Department*</label>
                <select
                  id="department"
                  v-model="aRecord.department"
                  class="form-control"
                >
                  <option value="" disabled selected>Select Department</option>
                  <option value="Medical">Medical</option>
                  <option value="Nursing">Nursing</option>
                  <option value="Administration">Administration</option>
                  <option value="Support Staff">Support Staff</option>
                  <option value="Management">Management</option>
                </select>
              </div>
              <div class="form-group">
                <label for="employmentDate">Start Date*</label>
                <input
                  id="employmentDate"
                  v-model="aRecord.employmentDate"
                  type="date"
                  class="form-control"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="employment">Employment Type*</label>
                <select
                  id="employment"
                  v-model="aRecord.employment"
                  class="form-control"
                >
                  <option value="" disabled selected>Select Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Casual">Casual</option>
                </select>
              </div>
              <div class="form-group">
                <label for="workHours">Working Hours/Week*</label>
                <input
                  id="workHours"
                  v-model="aRecord.workHours"
                  type="number"
                  min="0"
                  class="form-control"
                  placeholder="Hours per Week"
                />
              </div>
              <div class="form-group">
                <label for="salary">Annual Salary*</label>
                <input
                  id="salary"
                  v-model="aRecord.salary"
                  class="form-control"
                  placeholder="Annual Salary"
                />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Qualifications & Experience</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="qualification">Highest Qualification*</label>
                <input
                  id="qualification"
                  v-model="aRecord.qualification"
                  class="form-control"
                  placeholder="Highest Qualification"
                />
              </div>
              <div class="form-group">
                <label for="institution">Institution*</label>
                <input
                  id="institution"
                  v-model="aRecord.institution"
                  class="form-control"
                  placeholder="Institution Name"
                />
              </div>
              <div class="form-group">
                <label for="gradYear">Year of Graduation*</label>
                <input
                  id="gradYear"
                  v-model="aRecord.gradYear"
                  type="number"
                  min="1950"
                  :max="new Date().getFullYear()"
                  class="form-control"
                  placeholder="Year of Graduation"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="experience">Years of Experience*</label>
                <input
                  id="experience"
                  v-model="aRecord.experience"
                  type="number"
                  min="0"
                  class="form-control"
                  placeholder="Years of Experience"
                />
              </div>
              <div class="form-group full-width">
                <label for="specialization">Specialization/Skills</label>
                <input
                  id="specialization"
                  v-model="aRecord.specialization"
                  class="form-control"
                  placeholder="Specialization/Skills"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="certification">Professional Certifications</label>
                <input
                  id="certification"
                  v-model="aRecord.certification"
                  class="form-control"
                  placeholder="Professional Certifications"
                />
              </div>
              <div class="form-group">
                <label for="license">License Number (if applicable)</label>
                <input
                  id="license"
                  v-model="aRecord.license"
                  class="form-control"
                  placeholder="License Number"
                />
              </div>
              <div class="form-group">
                <label for="licenseExpiry">License Expiry Date</label>
                <input
                  id="licenseExpiry"
                  v-model="aRecord.licenseExpiry"
                  type="date"
                  class="form-control"
                />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Banking & Identification</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="taxId">Tax ID/SSN*</label>
                <input
                  id="taxId"
                  v-model="aRecord.taxId"
                  class="form-control"
                  placeholder="Tax ID/SSN"
                />
              </div>
              <div class="form-group">
                <label for="bankName">Bank Name*</label>
                <input
                  id="bankName"
                  v-model="aRecord.bankName"
                  class="form-control"
                  placeholder="Bank Name"
                />
              </div>
              <div class="form-group">
                <label for="accountNumber">Account Number*</label>
                <input
                  id="accountNumber"
                  v-model="aRecord.accountNumber"
                  class="form-control"
                  placeholder="Account Number"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="idType">ID Type*</label>
                <select
                  id="idType"
                  v-model="aRecord.idType"
                  class="form-control"
                >
                  <option value="" disabled selected>Select ID Type</option>
                  <option value="Passport">Passport</option>
                  <option value="Driver's License">Driver's License</option>
                  <option value="National ID">National ID</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label for="idNumber">ID Number*</label>
                <input
                  id="idNumber"
                  v-model="aRecord.idNumber"
                  class="form-control"
                  placeholder="ID Number"
                />
              </div>
              <div class="form-group">
                <label for="idExpiry">ID Expiry Date*</label>
                <input
                  id="idExpiry"
                  v-model="aRecord.idExpiry"
                  type="date"
                  class="form-control"
                />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Additional Information</h3>
            <div class="form-row">
              <div class="form-group full-width">
                <label for="medicalConditions"
                  >Medical Conditions/Allergies</label
                >
                <textarea
                  id="medicalConditions"
                  v-model="aRecord.medicalConditions"
                  class="form-control"
                  placeholder="List any medical conditions or allergies"
                  rows="2"
                ></textarea>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="criminalRecord">Criminal Record Check</label>
                <select
                  id="criminalRecord"
                  v-model="aRecord.criminalRecord"
                  class="form-control"
                >
                  <option value="" disabled selected>Select Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Not Required">Not Required</option>
                </select>
              </div>
              <div class="form-group">
                <label for="referenceCheck">Reference Check</label>
                <select
                  id="referenceCheck"
                  v-model="aRecord.referenceCheck"
                  class="form-control"
                >
                  <option value="" disabled selected>Select Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Not Required">Not Required</option>
                </select>
              </div>
              <div class="form-group">
                <label for="vaccinationStatus"
                  >COVID-19 Vaccination Status*</label
                >
                <select
                  id="vaccinationStatus"
                  v-model="aRecord.vaccinationStatus"
                  class="form-control"
                >
                  <option value="" disabled selected>Select Status</option>
                  <option value="Fully Vaccinated">Fully Vaccinated</option>
                  <option value="Partially Vaccinated">
                    Partially Vaccinated
                  </option>
                  <option value="Not Vaccinated">Not Vaccinated</option>
                  <option value="Exempt">Exempt</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-footer">
            <div class="form-check">
              <input
                type="checkbox"
                id="termsCheck"
                v-model="aRecord.termsCheck"
              />
              <label for="termsCheck"
                >I confirm all information provided is accurate and
                complete*</label
              >
            </div>

            <div class="form-buttons">
              <button @click="resetForm" class="btn reset-btn">
                Reset Form
              </button>
              <button @click="addRecord" class="btn pink">
                Submit Staff Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, watch, computed } from 'vue'

onMounted(async () => {
  try {
    const response = await axios.get('/api/staff')
    allRecords.value = response.data.map((staff) => ({
      first: staff.first_name,
      last: staff.last_name,
      role: staff.role,
      qualification: staff.qualification,
      employment: staff.employment_type,
      salary: staff.annual_salary,
      dob: staff.date_of_birth,
      gender: staff.gender
    }))
  } catch (err) {
    console.error('Failed to load staff:', err)
  }
})

// Filters
const filters = ref({
  firstName: '',
  lastName: '',
  role: '',
  qualification: '',
  salary: '',
  employment: '',
  dob: '',
  gender: ''
})

// Extended data for staff records
const aRecord = ref({
  first: '',
  last: '',
  role: '',
  qualification: '',
  employment: '',
  salary: '',
  dob: '',
  gender: '',
  nationality: '',
  maritalStatus: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postal: '',
  emergencyContact: '',
  emergencyPhone: '',
  emergencyRelation: '',
  department: '',
  employmentDate: '',
  workHours: '',
  institution: '',
  gradYear: '',
  experience: '',
  specialization: '',
  certification: '',
  license: '',
  licenseExpiry: '',
  taxId: '',
  bankName: '',
  accountNumber: '',
  idType: '',
  idNumber: '',
  idExpiry: '',
  medicalConditions: '',
  criminalRecord: '',
  referenceCheck: '',
  vaccinationStatus: '',
  termsCheck: false
})

const allRecords = ref([
  {
    first: 'Bob',
    last: 'Builder',
    role: 'Doctor',
    qualification: 'Bachelor of Medicine',
    employment: 'Full Time',
    salary: '$100,000',
    dob: '1/1/1970',
    gender: 'Male'
  },
  {
    first: 'Wendy',
    last: 'Carpenter',
    role: 'Nurse',
    qualification: 'Bachelor of Nursing',
    employment: 'Part Time',
    salary: '$115,000',
    dob: '21/10/1985',
    gender: 'Female'
  }
])

// Computed property for filtered records
const filteredRecords = computed(() => {
  return allRecords.value.filter((record) => {
    return (
      (!filters.value.firstName ||
        record.first
          .toLowerCase()
          .includes(filters.value.firstName.toLowerCase())) &&
      (!filters.value.lastName ||
        record.last
          .toLowerCase()
          .includes(filters.value.lastName.toLowerCase())) &&
      (!filters.value.role ||
        record.role.toLowerCase().includes(filters.value.role.toLowerCase())) &&
      (!filters.value.qualification ||
        record.qualification
          .toLowerCase()
          .includes(filters.value.qualification.toLowerCase())) &&
      (!filters.value.salary ||
        record.salary
          .toLowerCase()
          .includes(filters.value.salary.toLowerCase())) &&
      (!filters.value.employment ||
        record.employment === filters.value.employment) &&
      (!filters.value.dob || record.dob === filters.value.dob) &&
      (!filters.value.gender || record.gender === filters.value.gender)
    )
  })
})

// Methods for adding, removing records and resetting form
const removeRecord = async (index) => {
  const staffId = allRecords.value[index].id
  try {
    await axios.delete(`/api/staff/${staffId}`)
    allRecords.value.splice(index, 1)
  } catch (err) {
    console.error('Failed to delete staff:', err)
  }
}

const addRecord = async () => {
  const requiredFields = [
    'first',
    'last',
    'role',
    'qualification',
    'employment',
    'salary',
    'dob',
    'gender',
    'email',
    'phone',
    'address'
  ]

  const missingFields = requiredFields.filter((field) => !aRecord.value[field])
  if (missingFields.length === 0 && aRecord.value.termsCheck) {
    try {
      const payload = {
        first_name: aRecord.value.first,
        last_name: aRecord.value.last,
        role: aRecord.value.role,
        qualification: aRecord.value.qualification,
        employment_type: aRecord.value.employment,
        annual_salary: aRecord.value.salary,
        date_of_birth: aRecord.value.dob,
        gender: aRecord.value.gender,
        phone: aRecord.value.phone,
        email: aRecord.value.email,
        shift: aRecord.value.shift
      }
      const response = await axios.post('/api/staff', payload)
      allRecords.value.push({
        first: response.data.first_name,
        last: response.data.last_name,
        role: response.data.role,
        qualification: response.data.qualification,
        employment: response.data.employment_type,
        salary: response.data.annual_salary,
        dob: response.data.date_of_birth,
        gender: response.data.gender
      })
      resetForm()
      alert('Staff record added successfully!')
    } catch (err) {
      console.error('Failed to add staff:', err)
    }
  } else {
    if (!aRecord.value.termsCheck) {
      alert('Please confirm that all information is accurate and complete.')
    } else {
      alert('Please fill in all required fields marked with *')
    }
  }
}

const resetForm = () => {
  // Reset all fields to default values
  aRecord.value = {
    first: '',
    last: '',
    role: '',
    qualification: '',
    employment: '',
    salary: '',
    dob: '',
    gender: '',
    nationality: '',
    maritalStatus: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postal: '',
    emergencyContact: '',
    emergencyPhone: '',
    emergencyRelation: '',
    department: '',
    employmentDate: '',
    workHours: '',
    institution: '',
    gradYear: '',
    experience: '',
    specialization: '',
    certification: '',
    license: '',
    licenseExpiry: '',
    taxId: '',
    bankName: '',
    accountNumber: '',
    idType: '',
    idNumber: '',
    idExpiry: '',
    medicalConditions: '',
    criminalRecord: '',
    referenceCheck: '',
    vaccinationStatus: '',
    termsCheck: false
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

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
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

/* Enhanced Staff Form Styles */
.form-container {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.form-title {
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid #ff2474;
  padding-bottom: 1rem;
}

.form-section {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.form-section h3 {
  color: #ff2474;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  flex: 1;
  min-width: 200px;
}

.form-group.full-width {
  flex-basis: 100%;
}

.form-control {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9rem;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #ff2474;
  outline: none;
}

textarea.form-control {
  resize: vertical;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 500;
  color: #555;
  font-size: 0.9rem;
}

.form-check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.form-check input[type='checkbox'] {
  width: 18px;
  height: 18px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.form-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.pink {
  background-color: #ff5d98;
  color: white;
  border: none;
}

.pink:hover {
  background-color: #ff2474;
}

.reset-btn {
  background-color: #f2f2f2;
  color: #555;
  border: 1px solid #ddd;
}

.reset-btn:hover {
  background-color: #e0e0e0;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }

  .form-group {
    min-width: 100%;
  }
}
</style>
