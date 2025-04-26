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
    <main class="container">
      <div class="reports-section">
        <h1>Patient Medical Reports</h1>
        <p>View and request medical reports for your assigned patients.</p>

        <!-- Select Resident Filter -->
        <label for="residentSelect" class="filter-label"
          >Select Resident:</label
        >
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

        <div v-if="selectedResidentId" class="dashboard-grid">
          <div class="card card-all-reports">
            <div class="card-icon">📝</div>
            <h2>All Reports</h2>
            <p>
              Browse through your complete medical history and all previous test
              results.
            </p>
            <button class="cta" @click="showModal('allModal')">
              View All Reports
            </button>
          </div>
          <div class="card card-request-reports">
            <div class="card-icon">🔍</div>
            <h2>Request Reports</h2>
            <p>
              Request a specific medical report or test result from our
              healthcare team.
            </p>
            <button class="cta" @click="showModal('requestModal')">
              Request Report
            </button>
          </div>
        </div>

        <!-- Health Summary Section -->

        <!-- Health Summary Section -->
        <div v-if="selectedResidentId" class="health-summary">
          <h2>{{ selectedResident.name }}'s Health Summary</h2>
          <div class="summary-grid">
            <div class="summary-card">
              <div class="summary-icon">❤️</div>
              <div class="summary-info">
                <h3>Blood Pressure</h3>
                <p class="summary-value">
                  {{ getHealthData('bloodPressure').value }}
                </p>
                <p class="summary-date">
                  Last checked: {{ getHealthData('bloodPressure').date }}
                </p>
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-icon">🩸</div>
              <div class="summary-info">
                <h3>Blood Sugar</h3>
                <p class="summary-value">
                  {{ getHealthData('bloodSugar').value }}
                </p>
                <p class="summary-date">
                  Last checked: {{ getHealthData('bloodSugar').date }}
                </p>
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-icon">⚖️</div>
              <div class="summary-info">
                <h3>Weight</h3>
                <p class="summary-value">{{ getHealthData('weight').value }}</p>
                <p class="summary-date">
                  Last checked: {{ getHealthData('weight').date }}
                </p>
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-icon">💊</div>
              <div class="summary-info">
                <h3>Medications</h3>
                <p class="summary-value">
                  {{
                    selectedResident.medications
                      ? selectedResident.medications.length
                      : 0
                  }}
                  active prescriptions
                </p>
                <p class="summary-link" @click="showModal('medicationModal')">
                  View details
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!selectedResidentId" class="no-selection">
          <p>Please select a resident to view their medical information</p>
        </div>
      </div>
    </main>

    <!-- Modals for viewing and requesting reports -->

    <div id="allModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal('allModal')">&times;</span>
        <!-- tailor report title based on Name -->
        <h2>
          {{ selectedResident ? selectedResident.name + "'s" : '' }} Medical
          Reports
        </h2>
        <div class="filter-bar">
          <label for="allReportType">Filter by type:</label>
          <select id="allReportType" v-model="allReportFilter">
            <option value="all">All Reports</option>
            <option value="blood">Blood Tests</option>
            <option value="imaging">Imaging</option>
            <option value="assessment">Assessments</option>
          </select>
          <label for="reportYear">Year:</label>
          <select id="reportYear" v-model="reportYear">
            <option value="all">All Years</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <ul class="reports-list">
          <li
            v-for="(report, index) in filteredAllReports"
            :key="index"
            class="report-item"
          >
            <div class="report-icon" :class="report.type">
              <span v-if="report.type === 'blood'">🩸</span>
              <span v-else-if="report.type === 'imaging'">🔬</span>
              <span v-else-if="report.type === 'assessment'">📋</span>
              <span v-else>📄</span>
            </div>
            <div class="report-details">
              <h3>{{ report.title }}</h3>
              <p class="report-date">{{ report.date }}</p>
              <p class="report-doctor">Dr. {{ report.doctor }}</p>
            </div>
            <button class="view-btn" @click="viewReport(report)">View</button>
          </li>
        </ul>
      </div>
    </div>

    <div id="requestModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal('requestModal')">&times;</span>

        <h2>
          Request Report for
          {{ selectedResident ? selectedResident.name : 'Resident' }}
        </h2>
        <form id="requestForm" @submit.prevent="requestReportForPatient">
          <label for="reportTitle">Report Title/Description:</label>
          <input
            type="text"
            id="reportTitle"
            v-model="newRequest.title"
            placeholder="e.g., Chest X-ray follow-up"
            required
          />
          <label for="reportType">Report Type:</label>
          <select id="reportType" v-model="newRequest.type" required>
            <option value="blood">Blood Test</option>
            <option value="imaging">Imaging/X-Ray</option>
            <option value="assessment">Health Assessment</option>
            <option value="other">Other</option>
          </select>
          <label for="requestNotes">Additional Notes:</label>
          <textarea
            id="requestNotes"
            v-model="newRequest.notes"
            placeholder="Include clinical notes, symptoms, or justification for request"
            rows="4"
          ></textarea>
          <button type="submit">Send Request to Doctor</button>
        </form>
      </div>
    </div>

    <div id="medicationModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal('medicationModal')"
          >&times;</span
        >
        <h2>
          {{ selectedResident ? selectedResident.name + "'s" : '' }} Current
          Medications
        </h2>
        <div
          v-if="
            selectedResident &&
            selectedResident.medications &&
            selectedResident.medications.length > 0
          "
        >
          <ul class="medication-list">
            <li
              v-for="(med, index) in selectedResident.medications"
              :key="index"
              class="medication-item"
            >
              <div class="medication-name">
                <h3>{{ med.name }} - {{ med.dosage }}</h3>
                <p>{{ med.frequency }}</p>
              </div>
              <div class="medication-info">
                <p><strong>Purpose:</strong> {{ med.purpose }}</p>
                <p><strong>Prescribed by:</strong> Dr. {{ med.doctor }}</p>
                <p><strong>Next Refill:</strong> {{ med.refill }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>No medications found for this resident.</p>
        </div>
      </div>
    </div>

    <div id="reportDetailModal" class="modal">
      <div class="modal-content report-detail-content">
        <span class="close" @click="closeModal('reportDetailModal')"
          >&times;</span
        >
        <div v-if="selectedReport">
          <div class="report-header">
            <h2>{{ selectedReport.title }}</h2>
            <p class="report-date">Date: {{ selectedReport.date }}</p>
            <p>Doctor: Dr. {{ selectedReport.doctor }}</p>
          </div>
          <div class="report-content">
            <div v-if="selectedReport.type === 'blood'" class="blood-report">
              <table class="report-table">
                <thead>
                  <tr>
                    <th>Test Name</th>
                    <th>Result</th>
                    <th>Reference Range</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in selectedReport.results"
                    :key="index"
                  >
                    <td>{{ item.name }}</td>
                    <td>{{ item.value }}</td>
                    <td>{{ item.range }}</td>
                    <td :class="item.status">{{ item.status }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              v-else-if="selectedReport.type === 'imaging'"
              class="imaging-report"
            >
              <div class="report-image"></div>
              <div class="report-findings">
                <h3>Findings</h3>
                <p>{{ selectedReport.findings }}</p>
              </div>
            </div>
            <div v-else class="assessment-report">
              <div
                v-for="(section, index) in selectedReport.sections"
                :key="index"
                class="assessment-section"
              >
                <h3>{{ section.title }}</h3>
                <p>{{ section.content }}</p>
              </div>
            </div>
          </div>
          <div class="report-summary">
            <h3>Summary</h3>
            <p>{{ selectedReport.summary }}</p>
          </div>
          <div class="report-actions">
            <button class="print-btn" @click="printReport">Print Report</button>
            <button class="download-btn" @click="downloadReport">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      id="notification"
      class="notification"
      :class="{
        danger: notificationType === 'danger',
        success: notificationType === 'success'
      }"
    >
      {{ notificationMessage }}
    </div>
  </div>
</template>

<script>
import { residents } from '@/data/residentsData.js' // Import the resident data

export default {
  data() {
    return {
      selectedResidentId: '',
      residents: residents,
      currentModal: null,
      allReportFilter: 'all',
      reportYear: 'all',
      healthData: {
        // Default health data that will be shown when resident is selected

        bloodPressure: {
          '00634': { value: '128/82 mmHg', date: 'Apr 5, 2025' },
          '00641': { value: '118/72 mmHg', date: 'Apr 10, 2025' },
          '00645': { value: '132/84 mmHg', date: 'Apr 7, 2025' },
          '00374': { value: '140/90 mmHg', date: 'Apr 2, 2025' },
          '00985': { value: '125/80 mmHg', date: 'Apr 8, 2025' },
          '01012': { value: '135/82 mmHg', date: 'Apr 1, 2025' },
          '01045': { value: '122/76 mmHg', date: 'Apr 9, 2025' },
          '01087': { value: '142/88 mmHg', date: 'Apr 3, 2025' },
          '01123': { value: '126/78 mmHg', date: 'Apr 12, 2025' }
        },
        bloodSugar: {
          '00634': { value: '112 mg/dL', date: 'Apr 5, 2025' },
          '00641': { value: '98 mg/dL', date: 'Apr 10, 2025' },
          '00645': { value: '104 mg/dL', date: 'Apr 7, 2025' },
          '00374': { value: '110 mg/dL', date: 'Apr 2, 2025' },
          '00985': { value: '95 mg/dL', date: 'Apr 8, 2025' },
          '01012': { value: '102 mg/dL', date: 'Apr 1, 2025' },
          '01045': { value: '100 mg/dL', date: 'Apr 9, 2025' },
          '01087': { value: '150 mg/dL', date: 'Apr 3, 2025' },
          '01123': { value: '105 mg/dL', date: 'Apr 12, 2025' }
        },
        weight: {
          '00634': { value: '68 kg', date: 'Apr 5, 2025' },
          '00641': { value: '72 kg', date: 'Apr 10, 2025' },
          '00645': { value: '65 kg', date: 'Apr 7, 2025' },
          '00374': { value: '70 kg', date: 'Apr 2, 2025' },
          '00985': { value: '75 kg', date: 'Apr 8, 2025' },
          '01012': { value: '62 kg', date: 'Apr 1, 2025' },
          '01045': { value: '58 kg', date: 'Apr 9, 2025' },
          '01087': { value: '80 kg', date: 'Apr 3, 2025' },
          '01123': { value: '64 kg', date: 'Apr 12, 2025' }
        }
      },
      allReports: [
        // Sample report data - in a real app this would come from an API
        {
          id: 2,
          type: 'imaging',
          title: 'Chest X-Ray',
          date: 'March 15, 2025',
          doctor: 'Michael Chen',
          findings:
            'No significant abnormalities detected. Lungs appear clear. Heart size normal.',
          summary:
            'Normal chest X-ray with no evidence of acute cardiopulmonary disease.'
        },
        {
          id: 3,
          type: 'assessment',
          title: 'Cognitive Assessment',
          date: 'February 10, 2025',
          doctor: 'Rebecca Wilson',
          sections: [
            {
              title: 'Memory Function',
              content:
                'Mild short-term memory impairment, long-term memory intact.'
            },
            {
              title: 'Executive Function',
              content: 'Normal planning and organization abilities.'
            },
            {
              title: 'Language',
              content: 'No difficulties with expression or comprehension.'
            }
          ],
          summary:
            'Mild cognitive impairment consistent with age. No significant concerns at this time.'
        }
      ],
      recentReports: [
        {
          id: 1,
          type: 'blood',
          title: 'Complete Blood Count',
          date: 'April 5, 2025',
          doctor: 'Sarah Johnson',
          summary:
            'Your blood test results show normal values across all measurements.',
          results: [
            {
              name: 'Hemoglobin',
              value: '13.5 g/dL',
              range: '12.0-16.0 g/dL',
              status: 'normal'
            },
            {
              name: 'White Blood Cells',
              value: '7.5 k/uL',
              range: '4.5-11.0 k/uL',
              status: 'normal'
            },
            {
              name: 'Platelets',
              value: '250 k/uL',
              range: '150-450 k/uL',
              status: 'normal'
            }
          ]
        }
      ],
      reportFilter: 'all',
      allReportFilter: 'all',
      reportYear: 'all',
      selectedReport: null,
      newRequest: {
        title: '',
        type: 'blood',
        notes: ''
      },
      notificationMessage: '',
      notificationType: ''
    }
  },
  computed: {
    selectedResident() {
      return (
        this.residents.find(
          (resident) => resident.id === this.selectedResidentId
        ) || null
      )
    },

    filteredRecentReports() {
      if (this.reportFilter === 'all') {
        return this.recentReports
      } else {
        return this.recentReports.filter(
          (report) => report.type === this.reportFilter
        )
      }
    },
    filteredAllReports() {
      let filtered = [...this.allReports, ...this.recentReports]

      // Filter by type
      if (this.allReportFilter !== 'all') {
        filtered = filtered.filter(
          (report) => report.type === this.allReportFilter
        )
      }

      // Filter by year
      if (this.reportYear !== 'all') {
        filtered = filtered.filter((report) =>
          report.date.includes(this.reportYear)
        )
      }

      // Sort by date (newest first)
      return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  },
  methods: {
    getHealthData(type) {
      if (!this.selectedResidentId) {
        return { value: 'N/A', date: 'N/A' }
      }

      return (
        this.healthData[type][this.selectedResidentId] || {
          value: 'Not recorded',
          date: 'N/A'
        }
      )
    },
    showModal(modalId) {
      document.getElementById(modalId).style.display = 'block'

      // Additional actions based on which modal is shown
      if (modalId === 'recentModal') {
        this.reportFilter = 'all'
      } else if (modalId === 'allModal') {
        this.allReportFilter = 'all'
        this.reportYear = 'all'
      }
    },
    closeModal(modalId) {
      document.getElementById(modalId).style.display = 'none'
    },
    viewReport(report) {
      this.selectedReport = report
      this.showModal('reportDetailModal')
    },
    requestReportForPatient() {
      if (!this.selectedResidentId) {
        this.showNotification('Please select a resident first', 'danger')
        return
      }

      // Add resident info to the request
      const requestWithPatient = {
        ...this.newRequest,
        residentId: this.selectedResidentId,
        residentName: this.selectedResident.name
      }

      // In a real app, you would send this to your API
      console.log('Submitting report request:', requestWithPatient)

      this.showNotification(
        `Report request for ${this.selectedResident.name} submitted successfully!`,
        'success'
      )
      this.closeModal('requestModal')
      this.newRequest = {
        title: '',
        type: 'blood',
        notes: ''
      }
    },
    printReport() {
      this.showNotification('Printing report...', 'success')
      // In a real application, this would trigger the print functionality
    },
    downloadReport() {
      this.showNotification('Downloading report as PDF...', 'success')
      // In a real application, this would trigger the download functionality
    },
    showNotification(message, type) {
      this.notificationMessage = message
      this.notificationType = type
      const notification = document.getElementById('notification')
      notification.style.display = 'block'
      setTimeout(() => {
        notification.style.display = 'none'
      }, 3000)
    }
  }
}
</script>

<style scoped>
:root {
  --primary: #ff2474;
  --primary-light: #ff5d98;
  --secondary: #f4b942;
  --dark: #2a3950;
  --light: #f9f9f9;
  --danger: #d64045;
  --success: #4caf50;
  --gray: #e5e9f0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: var(--light);
  color: var(--dark);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
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

main {
  padding: 2rem 0;
}

.reports-section {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.reports-section h1 {
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: var(--dark);
}

.reports-section p {
  color: #666;
  margin-bottom: 2rem;
}

.dashboard-grid {
  display: grid;
  /* grid-template-columns: repeat(2, 1fr);  */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.card {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
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
  width: 60px;
  height: 60px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: white;
}

.card-recent-reports .card-icon {
  background-color: var(--primary);
}

.card-all-reports .card-icon {
  background-color: var(--secondary);
}

.card-request-reports .card-icon {
  background-color: var(--success);
}

.card h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--dark);
}

.card p {
  color: #666;
  margin-bottom: 1rem;
  font-size: 1rem;
  flex-grow: 1;
}

.card .cta {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-light);
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  text-align: center;
  margin-top: auto;
  border: none;
}

.card .cta:hover {
  background-color: var(--primary);
}

/* Health Summary Section */
.health-summary {
  background-color: var(--light);
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 3rem;
}

.health-summary h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--dark);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.summary-card {
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.summary-icon {
  font-size: 2rem;
  margin-right: 1rem;
}

.summary-info {
  flex: 1;
}

.summary-info h3 {
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
  color: var(--dark);
}

.summary-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary);
  margin-bottom: 0.3rem;
}

.summary-date {
  font-size: 0.9rem;
  color: #777;
}

.summary-link {
  font-size: 0.9rem;
  color: var(--primary);
  text-decoration: underline;
  cursor: pointer;
}

.summary-link:hover {
  color: var(--primary-light);
}

/* Upcoming Checkups Section */
.upcoming-checkups {
  background-color: var(--light);
  border-radius: 10px;
  padding: 2rem;
}

.upcoming-checkups h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--dark);
}

.checkup-item {
  display: flex;
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.checkup-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 70px;
  background-color: var(--primary-light);
  color: white;
  border-radius: 8px;
  padding: 10px 15px;
  margin-right: 20px;
}

.checkup-date .day {
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 1;
}

.checkup-date .month {
  font-size: 0.9rem;
  text-transform: uppercase;
}

.checkup-details {
  flex: 1;
}

.checkup-details h3 {
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
  color: var(--dark);
}

.checkup-details p {
  font-size: 0.9rem;
  color: #777;
}

/* Footer Styles */
footer {
  background-color: var(--dark);
  color: white;
  padding: 2rem 0;
  margin-top: 3rem;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.copyright {
  font-size: 0.9rem;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--secondary);
}

/* Modal Styles */
.modal {
  display: none;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: white;
  margin: 5% auto;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 80%;
  max-width: 800px;
  position: relative;
  max-height: 85vh;
  overflow-y: auto;
}

.close {
  position: absolute;
  right: 1.5rem;
  top: 1rem;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  color: #aaa;
}

.close:hover {
  color: var(--dark);
}

/* Report List Styles */
.filter-bar {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.filter-bar label {
  margin-right: 0.5rem;
  font-weight: bold;
}

.filter-bar select {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: white;
  min-width: 150px;
}

.reports-list {
  list-style: none;
}

.report-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s ease;
}

.report-item:hover {
  background-color: #f9f9f9;
}

.report-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  font-size: 1.5rem;
  color: white;
}

.report-icon.blood {
  background-color: #d64045;
}

.report-icon.imaging {
  background-color: #4c6ef5;
}

.report-icon.assessment {
  background-color: #40c057;
}

.report-details {
  flex: 1;
}

.report-details h3 {
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
}

.report-date,
.report-doctor {
  font-size: 0.9rem;
  color: #777;
}

.view-btn {
  padding: 0.5rem 1rem;
  background-color: var(--primary-light);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-btn:hover {
  background-color: var(--primary);
}

/* Report Detail Styles */
.report-detail-content {
  width: 90%;
  max-width: 900px;
}

.report-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.report-content {
  margin-bottom: 2rem;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.report-table th {
  background-color: #f5f5f5;
  text-align: left;
  padding: 0.75rem;
  border: 1px solid #ddd;
  font-weight: bold;
}

.report-table td {
  padding: 0.75rem;
  border: 1px solid #ddd;
}

.report-table .normal {
  color: var(--success);
}

.report-table .elevated {
  color: var(--danger);
}

.report-image {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.report-findings,
.report-summary {
  margin-bottom: 1.5rem;
}

.report-findings h3,
.report-summary h3 {
  margin-bottom: 0.75rem;
  color: var(--dark);
}

.assessment-section {
  margin-bottom: 1.5rem;
}

.assessment-section h3 {
  margin-bottom: 0.5rem;
  color: var(--dark);
}

.report-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.print-btn,
.download-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.print-btn {
  background-color: var(--gray);
  color: var(--dark);
}

.download-btn {
  background-color: var(--primary-light);
  color: white;
}

.print-btn:hover,
.download-btn:hover {
  opacity: 0.9;
}

/* Form Styles */
form {
  display: flex;
  flex-direction: column;
}

form label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

form input,
form select,
form textarea {
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

form button {
  padding: 0.75rem 1.5rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: flex-start;
}

form button:hover {
  background-color: var(--primary-light);
}

/* Medication List Styles */
.medication-list {
  list-style: none;
}

.medication-item {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.medication-name {
  margin-bottom: 1rem;
}

.medication-name h3 {
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  color: var(--dark);
}

.medication-info p {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

/* Notification Styles */
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 1rem 2rem;
  border-radius: 5px;
  background-color: var(--dark);
  color: white;
  font-weight: bold;
  z-index: 1000;
  display: none;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}

.notification.success {
  background-color: var(--success);
}

.notification.danger {
  background-color: var(--danger);
}

/* Filter Label */
.filter-label {
  font-size: 1rem;
  font-weight: bold;
  color: var(--dark);
  margin-bottom: 0.5rem;
  display: block;
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

/* Add a custom dropdown arrow */
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
</style>
