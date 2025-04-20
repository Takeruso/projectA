<template>
  <div>
    <header>
      <div class="container header-container">
        <div class="logo">
          <span>Swin Care</span>
        </div>
        <div class="user-info">
          <button class="notifications-btn" aria-label="Notifications">
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
        <h1>{{ patientName }}'s Medical Reports</h1>
        <p>
          Access and review the medical reports, test results, and health
          assessments in one convenient location.
        </p>
        <div class="dashboard-grid">
          <div class="card card-all-reports">
            <div class="card-icon">📝</div>
            <h2>All Reports</h2>
            <p>
              Browse through the complete medical history and all previous test
              results.
            </p>
            <button
              class="cta"
              @click="visibleModal = 'allModal'"
              aria-label="View all reports"
            >
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
            <button
              class="cta"
              @click="visibleModal = 'requestModal'"
              aria-label="Request report"
            >
              Request Report
            </button>
          </div>
        </div>

        <!-- Health Summary Section -->
        <div class="health-summary">
          <h2>Health Summary</h2>
          <div class="summary-grid">
            <div class="summary-card">
              <div class="summary-icon">❤️</div>
              <div class="summary-info">
                <h3>Blood Pressure</h3>
                <p class="summary-value">128/82 mmHg</p>
                <p class="summary-date">Last checked: Apr 5, 2025</p>
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-icon">🩸</div>
              <div class="summary-info">
                <h3>Blood Sugar</h3>
                <p class="summary-value">112 mg/dL</p>
                <p class="summary-date">Last checked: Apr 5, 2025</p>
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-icon">⚖️</div>
              <div class="summary-info">
                <h3>Weight</h3>
                <p class="summary-value">68 kg</p>
                <p class="summary-date">Last checked: Apr 5, 2025</p>
              </div>
            </div>
            <div class="summary-card">
              <div class="summary-icon">💊</div>
              <div class="summary-info">
                <h3>Medications</h3>
                <p class="summary-value">4 active prescriptions</p>
                <p
                  class="summary-link"
                  @click="visibleModal = 'medicationModal'"
                >
                  View details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modals for viewing and requesting reports -->
    <div class="modal" v-show="visibleModal === 'allModal'">
      <div class="modal-content">
        <span class="close" @click="closeModal" aria-label="Close modal"
          >&times;</span
        >
        <h2>All Medical Reports</h2>
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
            <button
              class="view-btn"
              @click="viewReport(report)"
              aria-label="View report"
            >
              View
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div class="modal" v-show="visibleModal === 'requestModal'">
      <div class="modal-content">
        <span class="close" @click="closeModal" aria-label="Close modal"
          >&times;</span
        >
        <h2>Request Medical Report</h2>
        <form id="requestForm" @submit.prevent="requestReport">
          <label for="reportTitle">Report Title/Description:</label>
          <input
            type="text"
            id="reportTitle"
            v-model="newRequest.title"
            placeholder="e.g., Blood Test Results from March 2025"
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
            placeholder="Please provide any additional details that might help us locate your report."
            rows="4"
          ></textarea>
          <button type="submit" aria-label="Submit request">
            Submit Request
          </button>
        </form>
      </div>
    </div>

    <div class="modal" v-show="visibleModal === 'medicationModal'">
      <div class="modal-content">
        <span class="close" @click="closeModal" aria-label="Close modal"
          >&times;</span
        >
        <h2>Current Medications</h2>
        <ul class="medication-list">
          <li
            v-for="(med, index) in medications"
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
    </div>

    <div class="modal" v-show="visibleModal === 'reportDetailModal'">
      <div class="modal-content report-detail-content">
        <span class="close" @click="closeModal" aria-label="Close modal"
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
            <button
              class="print-btn"
              @click="printReport"
              aria-label="Print report"
            >
              Print Report
            </button>
            <button
              class="download-btn"
              @click="downloadReport"
              aria-label="Download report"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="notification"
      :class="{
        show: showNotification,
        danger: notificationType === 'danger',
        success: notificationType === 'success'
      }"
    >
      {{ notificationMessage }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visibleModal: null,
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
        },
        {
          id: 2,
          type: 'assessment',
          title: 'Monthly Health Assessment',
          date: 'April 2, 2025',
          doctor: 'James Wilson',
          summary:
            'Overall health is stable with some improvement in mobility.',
          sections: [
            {
              title: 'Vital Signs',
              content:
                'Blood pressure: 128/82 mmHg, Heart rate: 72 bpm, Temperature: 36.8°C'
            },
            {
              title: 'Mobility',
              content:
                'Showing improved mobility in walking exercises. Can now walk 100 meters without assistance.'
            },
            {
              title: 'Cognitive Function',
              content:
                'Mental acuity remains excellent. Scored 28/30 on cognitive assessment.'
            }
          ]
        },
        {
          id: 3,
          type: 'imaging',
          title: 'Chest X-Ray',
          date: 'March 28, 2025',
          doctor: 'Emily Chen',
          summary: 'No significant abnormalities detected in chest X-ray.',
          findings:
            'Lungs are clear with no evidence of infiltrates or consolidation. Heart size is normal. No pleural effusion or pneumothorax. Bony structures show mild degenerative changes consistent with age.'
        }
      ],
      allReports: [
        // Recent reports would be included here as well, plus older ones
        {
          id: 4,
          type: 'blood',
          title: 'Lipid Panel',
          date: 'February 15, 2025',
          doctor: 'Sarah Johnson',
          summary:
            'Cholesterol levels are within normal range with slight elevation in LDL.',
          results: [
            {
              name: 'Total Cholesterol',
              value: '195 mg/dL',
              range: '<200 mg/dL',
              status: 'normal'
            },
            {
              name: 'HDL',
              value: '55 mg/dL',
              range: '>40 mg/dL',
              status: 'normal'
            },
            {
              name: 'LDL',
              value: '130 mg/dL',
              range: '<100 mg/dL',
              status: 'elevated'
            },
            {
              name: 'Triglycerides',
              value: '140 mg/dL',
              range: '<150 mg/dL',
              status: 'normal'
            }
          ]
        },
        {
          id: 5,
          type: 'assessment',
          title: 'Quarterly Health Assessment',
          date: 'January 10, 2025',
          doctor: 'James Wilson',
          summary:
            'Overall health status is stable. Minor concerns addressed with medication adjustment.',
          sections: [
            {
              title: 'Vital Signs',
              content:
                'Blood pressure: 130/85 mmHg, Heart rate: 75 bpm, Temperature: 36.7°C'
            },
            {
              title: 'Mobility',
              content:
                'Mobility has remained consistent. Able to walk with assistance. Recommended daily walking exercises.'
            },
            {
              title: 'Medication Review',
              content:
                'Adjusted blood pressure medication dosage. Continue with current medications for other conditions.'
            }
          ]
        },
        {
          id: 6,
          type: 'imaging',
          title: 'Bone Density Scan',
          date: 'December 5, 2024',
          doctor: 'Emily Chen',
          summary:
            'Mild osteopenia detected. Recommended calcium and vitamin D supplements.',
          findings:
            'Bone mineral density measurements show mild osteopenia in the hip and spine. No evidence of fractures. Recommend calcium and vitamin D supplementation and regular weight-bearing exercises.'
        },
        {
          id: 7,
          type: 'blood',
          title: 'Comprehensive Metabolic Panel',
          date: 'November 22, 2024',
          doctor: 'Robert Garcia',
          summary:
            'Kidney and liver function tests are normal. Glucose levels slightly elevated.',
          results: [
            {
              name: 'Glucose',
              value: '112 mg/dL',
              range: '70-99 mg/dL',
              status: 'elevated'
            },
            {
              name: 'BUN',
              value: '15 mg/dL',
              range: '7-20 mg/dL',
              status: 'normal'
            },
            {
              name: 'Creatinine',
              value: '0.9 mg/dL',
              range: '0.6-1.2 mg/dL',
              status: 'normal'
            },
            {
              name: 'ALT',
              value: '25 U/L',
              range: '7-56 U/L',
              status: 'normal'
            }
          ]
        }
      ],
      medications: [
        {
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily',
          purpose: 'Blood pressure management',
          doctor: 'Sarah Johnson',
          refill: 'April 25, 2025'
        },
        {
          name: 'Metformin',
          dosage: '500mg',
          frequency: 'Twice daily with meals',
          purpose: 'Blood sugar control',
          doctor: 'Robert Garcia',
          refill: 'May 10, 2025'
        },
        {
          name: 'Simvastatin',
          dosage: '20mg',
          frequency: 'Once daily at bedtime',
          purpose: 'Cholesterol management',
          doctor: 'Sarah Johnson',
          refill: 'April 30, 2025'
        },
        {
          name: 'Calcium + Vitamin D',
          dosage: '600mg/800IU',
          frequency: 'Once daily with food',
          purpose: 'Bone health',
          doctor: 'Emily Chen',
          refill: 'June 5, 2025'
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
      notificationType: '',
      showNotification: false
    }
  },
  computed: {
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
    viewReport(report) {
      this.selectedReport = report
      this.visibleModal = 'reportDetailModal'
    },
    closeModal() {
      this.visibleModal = null
    },
    requestReport() {
      this.displayNotification(
        'Report request submitted successfully!',
        'success'
      )
      this.closeModal()
      this.newRequest = {
        title: '',
        type: 'blood',
        notes: ''
      }
    },
    printReport() {
      this.displayNotification('Printing report...', 'success')
      // In a real application, this would trigger the print functionality
    },
    downloadReport() {
      this.displayNotification('Downloading report as PDF...', 'success')
      // In a real application, this would trigger the download functionality
    },
    displayNotification(message, type) {
      this.notificationMessage = message
      this.notificationType = type
      this.showNotification = true

      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        this.showNotification = false
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
  position: sticky;
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

/* Modal Styles */
.modal {
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
</style>
