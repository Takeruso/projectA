<template>
  <div class="recreation">
    <header>
      <div class="container header-container">
        <div class="logo">
          <span>Swin Care</span>
        </div>
        <div class="user-info">
          <button class="notifications-btn">
            📅
            <span class="alert-count">3</span>
          </button>
          <div class="user-name">Eleanor Smith</div>
          <div class="user-avatar">ES</div>
        </div>
      </div>
    </header>
    <main class="container">
      <div class="activities-section">
        <h1>Recreational Activities</h1>
        <p>
          Explore and participate in a variety of engaging activities designed
          to promote wellness, socialization, and enjoyment for our residents.
        </p>
        <div class="dashboard-grid">
          <div class="card card-browse-activities">
            <div class="card-icon">🎭</div>
            <h2>Browse Activities</h2>
            <p>
              Discover our wide range of recreational, educational, and wellness
              activities.
            </p>
            <button class="cta" @click="showModal('activitiesModal')">
              View Activities
            </button>
          </div>
          <div class="card card-my-bookings">
            <div class="card-icon">📅</div>
            <h2>My Bookings</h2>
            <p>View your upcoming activity bookings and attendance schedule.</p>
            <button class="cta" @click="showModal('bookingsModal')">
              View Bookings
            </button>
          </div>
        </div>

        <!-- Featured Activities Section -->
        <div class="featured-activities">
          <h2>Featured Activities This Week</h2>
          <div class="activities-grid">
            <div
              v-for="(activity, index) in featuredActivities"
              :key="index"
              class="activity-card"
            >
              <div class="activity-date">
                <span class="day">{{ activity.dayNumber }}</span>
                <span class="month">{{ activity.month }}</span>
              </div>
              <div class="activity-info">
                <h3>{{ activity.title }}</h3>
                <p class="activity-time">{{ activity.time }}</p>
                <p class="activity-location">{{ activity.location }}</p>
                <div class="activity-tags">
                  <span
                    v-for="(tag, tagIndex) in activity.tags"
                    :key="tagIndex"
                    :class="'tag-' + tag.toLowerCase()"
                    >{{ tag }}</span
                  >
                </div>
              </div>
              <button
                class="book-btn"
                @click="bookActivity(activity)"
                :disabled="
                  activity.capacity <= 0 || isActivityBooked(activity.id)
                "
              >
                {{
                  isActivityBooked(activity.id)
                    ? 'Booked'
                    : activity.capacity <= 0
                      ? 'Full'
                      : 'Book'
                }}
              </button>
            </div>
          </div>
          <button class="view-all-btn" @click="showModal('activitiesModal')">
            View All Activities
          </button>
        </div>

        <!-- Upcoming Bookings Preview -->
        <div class="upcoming-bookings-preview">
          <h2>Your Upcoming Activities</h2>
          <div v-if="userBookings.length > 0">
            <div
              v-for="(booking, index) in previewBookings"
              :key="index"
              class="booking-preview-item"
            >
              <div class="booking-date">
                <span class="day">{{ booking.dayNumber }}</span>
                <span class="month">{{ booking.month }}</span>
              </div>
              <div class="booking-details">
                <h3>{{ booking.title }}</h3>
                <p>{{ booking.time }} | {{ booking.location }}</p>
              </div>
              <button class="cancel-btn" @click="cancelBooking(booking.id)">
                Cancel
              </button>
            </div>
            <button
              v-if="userBookings.length > 3"
              class="view-all-btn"
              @click="showModal('bookingsModal')"
            >
              View All Bookings
            </button>
          </div>
          <div v-else class="no-bookings">
            <p>
              You have no upcoming activities booked. Browse our activities and
              make a reservation!
            </p>
            <button class="browse-btn" @click="showModal('activitiesModal')">
              Browse Activities
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- All Activities Modal -->
    <div id="activitiesModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal('activitiesModal')"
          >&times;</span
        >
        <h2>All Activities</h2>
        <div class="filter-bar">
          <label for="activityType">Filter by type:</label>
          <select id="activityType" v-model="activityFilter">
            <option value="all">All Activities</option>
            <option value="physical">Physical</option>
            <option value="creative">Creative</option>
            <option value="social">Social</option>
            <option value="educational">Educational</option>
            <option value="wellness">Wellness</option>
          </select>
          <label for="activityDay">Day:</label>
          <select id="activityDay" v-model="dayFilter">
            <option value="all">All Days</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
        </div>
        <ul class="activities-list">
          <li
            v-for="(activity, index) in filteredActivities"
            :key="index"
            class="activity-item"
          >
            <div class="activity-icon" :class="getActivityClass(activity)">
              <span v-if="activity.category === 'physical'">🏋️</span>
              <span v-else-if="activity.category === 'creative'">🎨</span>
              <span v-else-if="activity.category === 'social'">👥</span>
              <span v-else-if="activity.category === 'educational'">📚</span>
              <span v-else-if="activity.category === 'wellness'">🧘</span>
              <span v-else>🎯</span>
            </div>
            <div class="activity-details">
              <h3>{{ activity.title }}</h3>
              <p class="activity-day">
                {{ activity.day }}, {{ activity.month }}
                {{ activity.dayNumber }}
              </p>
              <p class="activity-time">{{ activity.time }}</p>
              <p class="activity-location">{{ activity.location }}</p>
              <div class="activity-tags">
                <span
                  v-for="(tag, tagIndex) in activity.tags"
                  :key="tagIndex"
                  :class="'tag-' + tag.toLowerCase()"
                  >{{ tag }}</span
                >
              </div>
              <p class="activity-description">{{ activity.description }}</p>
              <p class="activity-capacity">
                Spots available: {{ activity.capacity }}
              </p>
            </div>
            <button
              class="book-btn"
              @click="bookActivity(activity)"
              :disabled="
                activity.capacity <= 0 || isActivityBooked(activity.id)
              "
            >
              {{
                isActivityBooked(activity.id)
                  ? 'Booked'
                  : activity.capacity <= 0
                    ? 'Full'
                    : 'Book'
              }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- My Bookings Modal -->
    <div id="bookingsModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal('bookingsModal')">&times;</span>
        <h2>My Activity Bookings</h2>
        <div v-if="userBookings.length > 0">
          <ul class="bookings-list">
            <li
              v-for="(booking, index) in userBookings"
              :key="index"
              class="booking-item"
            >
              <div class="booking-date">
                <span class="day">{{ booking.dayNumber }}</span>
                <span class="month">{{ booking.month }}</span>
              </div>
              <div class="booking-details">
                <h3>{{ booking.title }}</h3>
                <p class="booking-time">{{ booking.time }}</p>
                <p class="booking-location">{{ booking.location }}</p>
                <div class="activity-tags">
                  <span
                    v-for="(tag, tagIndex) in booking.tags"
                    :key="tagIndex"
                    :class="'tag-' + tag.toLowerCase()"
                    >{{ tag }}</span
                  >
                </div>
              </div>
              <button class="cancel-btn" @click="cancelBooking(booking.id)">
                Cancel
              </button>
            </li>
          </ul>
        </div>
        <div v-else class="no-bookings">
          <p>
            You have no upcoming activities booked. Browse our activities and
            make a reservation!
          </p>
          <button
            class="browse-btn"
            @click="
              closeModal('bookingsModal')
              showModal('activitiesModal')
            "
          >
            Browse Activities
          </button>
        </div>
      </div>
    </div>

    <!-- Activity Detail Modal -->
    <div id="activityDetailModal" class="modal">
      <div class="modal-content activity-detail-content">
        <span class="close" @click="closeModal('activityDetailModal')"
          >&times;</span
        >
        <div v-if="selectedActivity">
          <div class="activity-header">
            <h2>{{ selectedActivity.title }}</h2>
            <div class="activity-tags">
              <span
                v-for="(tag, tagIndex) in selectedActivity.tags"
                :key="tagIndex"
                :class="'tag-' + tag.toLowerCase()"
                >{{ tag }}</span
              >
            </div>
          </div>
          <div class="activity-content">
            <div class="activity-details-full">
              <p>
                <strong>Date:</strong> {{ selectedActivity.day }},
                {{ selectedActivity.month }} {{ selectedActivity.dayNumber }}
              </p>
              <p><strong>Time:</strong> {{ selectedActivity.time }}</p>
              <p><strong>Location:</strong> {{ selectedActivity.location }}</p>
              <p>
                <strong>Spots Available:</strong>
                {{ selectedActivity.capacity }}
              </p>
              <p><strong>Host:</strong> {{ selectedActivity.host }}</p>
              <p class="activity-description-full">
                {{ selectedActivity.description }}
              </p>
              <div class="benefits-section">
                <h3>Benefits</h3>
                <ul>
                  <li
                    v-for="(benefit, index) in selectedActivity.benefits"
                    :key="index"
                  >
                    {{ benefit }}
                  </li>
                </ul>
              </div>
              <div
                class="requirements-section"
                v-if="
                  selectedActivity.requirements &&
                  selectedActivity.requirements.length > 0
                "
              >
                <h3>Requirements</h3>
                <ul>
                  <li
                    v-for="(
                      requirement, index
                    ) in selectedActivity.requirements"
                    :key="index"
                  >
                    {{ requirement }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="activity-actions">
            <button
              class="book-btn large"
              @click="bookActivity(selectedActivity)"
              :disabled="
                selectedActivity.capacity <= 0 ||
                isActivityBooked(selectedActivity.id)
              "
            >
              {{
                isActivityBooked(selectedActivity.id)
                  ? 'Already Booked'
                  : selectedActivity.capacity <= 0
                    ? 'Fully Booked'
                    : 'Book This Activity'
              }}
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
export default {
  data() {
    return {
      activities: [
        {
          id: 1,
          title: 'Morning Yoga',
          day: 'Monday',
          month: 'Apr',
          dayNumber: 21,
          time: '9:00 AM - 10:00 AM',
          location: 'Activity Room 1',
          category: 'wellness',
          tags: ['Wellness', 'Physical'],
          capacity: 10,
          description:
            'Start your day with gentle stretching and mindful movements. This yoga class is adapted for all mobility levels and will help improve flexibility and balance.',
          host: 'Sarah Jones',
          benefits: [
            'Improves flexibility and balance',
            'Reduces stress and anxiety',
            'Enhances mental clarity',
            'Supports joint health'
          ],
          requirements: ['Comfortable clothing', 'Water bottle']
        },
        {
          id: 2,
          title: 'Art & Painting',
          day: 'Monday',
          month: 'Apr',
          dayNumber: 21,
          time: '2:00 PM - 3:30 PM',
          location: 'Craft Room',
          category: 'creative',
          tags: ['Creative', 'Social'],
          capacity: 8,
          description:
            'Express your creativity through painting and drawing. No experience necessary - our instructor will guide you through creating a beautiful piece of art to take home.',
          host: 'Michael Thompson',
          benefits: [
            'Encourages creative expression',
            'Improves fine motor skills',
            'Promotes relaxation',
            'Builds confidence'
          ],
          requirements: []
        },
        {
          id: 3,
          title: 'Memory Games',
          day: 'Tuesday',
          month: 'Apr',
          dayNumber: 22,
          time: '10:30 AM - 11:30 AM',
          location: 'Social Lounge',
          category: 'educational',
          tags: ['Educational', 'Cognitive'],
          capacity: 12,
          description:
            'Engage your mind with fun memory games and puzzles designed to keep your brain active and sharp. Join us for an hour of mental stimulation and friendly competition.',
          host: 'Dr. Robert Chen',
          benefits: [
            'Stimulates cognitive function',
            'Improves memory recall',
            'Encourages social interaction',
            'Enhances problem-solving skills'
          ],
          requirements: []
        },
        {
          id: 4,
          title: 'Garden Club',
          day: 'Tuesday',
          month: 'Apr',
          dayNumber: 22,
          time: '3:00 PM - 4:00 PM',
          location: 'Community Garden',
          category: 'social',
          tags: ['Social', 'Outdoor'],
          capacity: 10,
          description:
            'Join our garden club to plant, tend, and harvest seasonal vegetables and flowers. Connect with nature and fellow residents while creating beauty in our community garden.',
          host: 'Emma Wilson',
          benefits: [
            'Provides light physical activity',
            'Connects with nature',
            'Builds community',
            'Offers a sense of accomplishment'
          ],
          requirements: ['Sun hat (weather permitting)', 'Water bottle']
        },
        {
          id: 5,
          title: 'Chair Exercises',
          day: 'Wednesday',
          month: 'Apr',
          dayNumber: 23,
          time: '9:30 AM - 10:15 AM',
          location: 'Activity Room 2',
          category: 'physical',
          tags: ['Physical', 'Wellness'],
          capacity: 15,
          description:
            'Maintain strength, flexibility and circulation with our seated exercise program. This low-impact workout is designed for all mobility levels and focuses on functional movements.',
          host: 'David Park, PT',
          benefits: [
            'Improves strength and flexibility',
            'Enhances circulation',
            'Maintains joint mobility',
            'Boosts energy levels'
          ],
          requirements: ['Water bottle']
        },
        {
          id: 6,
          title: 'Music & Memories',
          day: 'Wednesday',
          month: 'Apr',
          dayNumber: 23,
          time: '2:00 PM - 3:00 PM',
          location: 'Social Lounge',
          category: 'social',
          tags: ['Social', 'Entertainment'],
          capacity: 20,
          description:
            'Enjoy an hour of classic songs and musical reminiscence. Sing along to favorite tunes from across the decades and share the memories associated with special songs.',
          host: 'Lisa Rodriguez',
          benefits: [
            'Evokes positive memories',
            'Promotes emotional wellbeing',
            'Encourages socialization',
            'Stimulates cognitive function'
          ],
          requirements: []
        },
        {
          id: 7,
          title: 'Book Club',
          day: 'Thursday',
          month: 'Apr',
          dayNumber: 24,
          time: '10:30 AM - 11:30 AM',
          location: 'Library',
          category: 'educational',
          tags: ['Educational', 'Social'],
          capacity: 12,
          description:
            "Join our monthly book discussion where we explore different authors and genres. This month we're discussing 'The Secret Garden' by Frances Hodgson Burnett.",
          host: 'Barbara Nelson',
          benefits: [
            'Stimulates intellectual discussion',
            'Maintains reading habits',
            'Provides social connection',
            'Expands literary horizons'
          ],
          requirements: []
        },
        {
          id: 8,
          title: 'Bingo Night',
          day: 'Thursday',
          month: 'Apr',
          dayNumber: 24,
          time: '6:30 PM - 8:00 PM',
          location: 'Dining Hall',
          category: 'social',
          tags: ['Social', 'Entertainment'],
          capacity: 30,
          description:
            'Join us for a fun evening of Bingo with prizes! Refreshments will be served, and family members are welcome to attend this popular weekly event.',
          host: 'Thomas Brown',
          benefits: [
            'Promotes concentration',
            'Encourages social interaction',
            'Provides entertainment',
            'Offers opportunity for family involvement'
          ],
          requirements: []
        },
        {
          id: 9,
          title: 'Tai Chi',
          day: 'Friday',
          month: 'Apr',
          dayNumber: 25,
          time: '10:00 AM - 11:00 AM',
          location: 'Activity Room 1',
          category: 'wellness',
          tags: ['Wellness', 'Physical'],
          capacity: 15,
          description:
            'Practice the gentle movements of Tai Chi to improve balance, reduce stress, and enhance wellbeing. This class is adapted for all mobility levels and can be done seated or standing.',
          host: 'Master Wong',
          benefits: [
            'Improves balance and coordination',
            'Reduces stress',
            'Enhances mental focus',
            'Gentle on joints'
          ],
          requirements: ['Comfortable clothing', 'Water bottle']
        },
        {
          id: 10,
          title: 'Movie Matinee',
          day: 'Friday',
          month: 'Apr',
          dayNumber: 25,
          time: '2:30 PM - 4:30 PM',
          location: 'Theater Room',
          category: 'social',
          tags: ['Social', 'Entertainment'],
          capacity: 25,
          description:
            "Enjoy a classic film screening with fellow residents. This week's feature is 'Singin' in the Rain'. Popcorn and refreshments will be provided.",
          host: 'Cindy Williams',
          benefits: [
            'Provides entertainment',
            'Encourages social gathering',
            'Stimulates discussion',
            'Evokes nostalgia'
          ],
          requirements: []
        },
        {
          id: 11,
          title: 'Cooking Demo',
          day: 'Saturday',
          month: 'Apr',
          dayNumber: 26,
          time: '11:00 AM - 12:00 PM',
          location: 'Kitchen',
          category: 'educational',
          tags: ['Educational', 'Creative'],
          capacity: 10,
          description:
            'Watch our chef prepare seasonal specialties and learn cooking tips and techniques. Samples will be available to taste!',
          host: 'Chef Anthony',
          benefits: [
            'Shares culinary knowledge',
            'Stimulates senses',
            'Provides social interaction',
            'Offers nutritional insights'
          ],
          requirements: []
        },
        {
          id: 12,
          title: 'Sunday Concert',
          day: 'Sunday',
          month: 'Apr',
          dayNumber: 27,
          time: '3:00 PM - 4:00 PM',
          location: 'Main Lounge',
          category: 'social',
          tags: ['Social', 'Entertainment'],
          capacity: 40,
          description:
            'Enjoy live music performed by local musicians. This week features the String Quartet from the Community Music School playing classical favorites.',
          host: 'Activities Team',
          benefits: [
            'Provides quality entertainment',
            'Stimulates auditory senses',
            'Creates community atmosphere',
            'Enhances quality of life'
          ],
          requirements: []
        }
      ],
      userBookings: [],
      activityFilter: 'all',
      dayFilter: 'all',
      selectedActivity: null,
      notificationMessage: '',
      notificationType: ''
    }
  },
  computed: {
    featuredActivities() {
      // Return the next 3 upcoming activities
      return this.activities.slice(0, 3)
    },
    filteredActivities() {
      let filtered = [...this.activities]

      // Filter by type
      if (this.activityFilter !== 'all') {
        filtered = filtered.filter(
          (activity) =>
            activity.category === this.activityFilter ||
            activity.tags.some(
              (tag) => tag.toLowerCase() === this.activityFilter.toLowerCase()
            )
        )
      }

      // Filter by day
      if (this.dayFilter !== 'all') {
        filtered = filtered.filter(
          (activity) =>
            activity.day.toLowerCase() === this.dayFilter.toLowerCase()
        )
      }

      // Sort by date and time
      return filtered.sort((a, b) => {
        const dayOrder = [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ]
        const dayDiff = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)

        if (dayDiff !== 0) return dayDiff

        // If same day, sort by time
        return a.time.localeCompare(b.time)
      })
    },
    previewBookings() {
      // Get first 3 bookings for preview
      return this.userBookings.slice(0, 3)
    }
  },
  methods: {
    showModal(modalId) {
      document.getElementById(modalId).style.display = 'block'
    },
    closeModal(modalId) {
      document.getElementById(modalId).style.display = 'none'
    },
    getActivityClass(activity) {
      return `activity-icon-${activity.category}`
    },
    viewActivityDetails(activity) {
      this.selectedActivity = activity
      this.showModal('activityDetailModal')
    },
    bookActivity(activity) {
      // Check if activity is already booked
      if (this.isActivityBooked(activity.id)) {
        this.showNotification("You've already booked this activity!", 'danger')
        return
      }

      // Check if activity is full
      if (activity.capacity <= 0) {
        this.showNotification('This activity is fully booked.', 'danger')
        return
      }

      // Book the activity
      const bookedActivity = { ...activity }
      this.userBookings.push(bookedActivity)

      // Reduce available capacity
      const activityIndex = this.activities.findIndex(
        (a) => a.id === activity.id
      )
      if (activityIndex !== -1) {
        this.activities[activityIndex].capacity -= 1
      }

      this.showNotification('Activity booked successfully!', 'success')
      this.closeModal('activityDetailModal')
      this.closeModal('activitiesModal')
    },
    cancelBooking(activityId) {
      const bookingIndex = this.userBookings.findIndex(
        (booking) => booking.id === activityId
      )

      if (bookingIndex !== -1) {
        // Remove from bookings
        this.userBookings.splice(bookingIndex, 1)

        // Increase available capacity
        const activityIndex = this.activities.findIndex(
          (a) => a.id === activityId
        )
        if (activityIndex !== -1) {
          this.activities[activityIndex].capacity += 1
        }

        this.showNotification('Booking cancelled successfully', 'success')
      }
    },
    isActivityBooked(activityId) {
      return this.userBookings.some((booking) => booking.id === activityId)
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
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

body {
  background-color: #f8f9fa;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.recreation {
  --primary: #e24a7a;
  --primary-light: #f73d9d;
  --primary-dark: #d02a7d;
  --accent: #ff6b6b;
  --dark: #2a3950;
  --light: #f9f9f9;
  --gray: #e5e9f0;
  --text: #404759;
  --border-radius: 8px;
  --shadow: 0 4px 15px rgba(0, 0, 0, 0.08);

  background-color: var(--light);
  color: var(--text);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
}

/* Header Styles */
header {
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px 0;
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
  font-size: 24px;
  font-weight: bold;
  color: var(--primary);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.notifications-btn {
  background: none;
  border: none;
  font-size: 20px;
  position: relative;
  cursor: pointer;
}

.alert-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--accent);
  color: white;
  font-size: 12px;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-name {
  font-weight: 500;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background-color: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

/* Main Content */
main {
  padding: 30px 0;
}

h1 {
  color: var(--dark);
  margin-bottom: 20px;
  margin-top: 40px;
  font-size: 28px;
}

h2 {
  color: var(--dark);
  margin-bottom: 15px;
  font-size: 22px;
}

h3 {
  color: var(--dark);
  font-size: 18px;
  margin-bottom: 5px;
}

p {
  margin-bottom: 15px;
}

/* Dashboard Cards */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.card {
  background-color: #fff;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 25px;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-icon {
  font-size: 30px;
  margin-bottom: 15px;
}

.card-browse-activities .card-icon {
  color: #e67e22;
}

.card-my-bookings .card-icon {
  color: var(--primary);
}

.cta {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 15px;
}

.cta:hover {
  background-color: var(--primary-dark);
}

/* Featured Activities */
.featured-activities {
  margin: 40px 0;
}

.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.activity-card {
  background-color: #fff;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.activity-date {
  background-color: var(--gray);
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #e9ecef;
}

.day {
  font-size: 24px;
  font-weight: bold;
  color: var(--dark);
  display: block;
}

.month {
  color: var(--text);
  text-transform: uppercase;
  font-size: 14px;
}

.activity-info {
  padding: 15px;
  flex-grow: 1;
}

.activity-time,
.activity-location {
  color: var(--text);
  font-size: 14px;
  margin-bottom: 5px;
}

.activity-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 10px 0;
}

.activity-tags span {
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 3px;
}

.tag-physical {
  background-color: var(--accent);
  color: white;
}

.tag-creative {
  background-color: #9b59b6;
  color: white;
}

.tag-social {
  background-color: var(--primary-light);
  color: white;
}

.tag-educational {
  background-color: #27ae60;
  color: white;
}

.tag-wellness {
  background-color: #2ecc71;
  color: white;
}

.tag-cognitive {
  background-color: #f39c12;
  color: white;
}

.tag-entertainment {
  background-color: #e67e22;
  color: white;
}

.tag-outdoor {
  background-color: #16a085;
  color: white;
}

.book-btn {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-weight: 500;
}

.book-btn:hover:not(:disabled) {
  background-color: var(--primary-dark);
}

.book-btn:disabled {
  background-color: var(--gray);
  cursor: not-allowed;
}

.view-all-btn {
  background: none;
  border: 2px solid var(--primary);
  color: var(--primary);
  padding: 8px 16px;
  margin: 10px 0;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.view-all-btn:hover {
  background-color: var(--primary);
  color: white;
}

/* Upcoming Bookings Preview */
.upcoming-bookings-preview {
  margin: 40px 0;
}

.booking-preview-item {
  background-color: #fff;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  padding: 15px;
}

.booking-date {
  background-color: var(--gray);
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  margin-right: 15px;
  min-width: 60px;
}

.booking-details {
  flex-grow: 1;
}

.cancel-btn {
  background-color: var(--accent);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.cancel-btn:hover {
  background-color: #c0392b;
}

.no-bookings {
  background-color: var(--light);
  border-radius: var(--border-radius);
  padding: 25px;
  text-align: center;
}

.browse-btn {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 10px;
}

.browse-btn:hover {
  background-color: var(--primary-dark);
}

/* Modal Styles */
.modal {
  display: none;
  position: fixed;
  z-index: 200;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  margin: 5% auto;
  padding: 25px;
  border-radius: var(--border-radius);
  width: 80%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.activity-detail-content {
  max-width: 700px;
}

.close {
  position: absolute;
  right: 20px;
  top: 15px;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  color: #aaa;
}

.close:hover {
  color: var(--dark);
}

/* Filter Bar */
.filter-bar {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: var(--light);
  border-radius: var(--border-radius);
  flex-wrap: wrap;
}

.filter-bar label {
  font-weight: 500;
  margin-right: 5px;
}

.filter-bar select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid var(--gray);
}

/* Activities List */
.activities-list {
  list-style: none;
}

.activity-item {
  display: flex;
  padding: 20px;
  border-bottom: 1px solid var(--gray);
  align-items: center;
  gap: 20px;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.activity-icon-physical {
  background-color: #fadbd8;
}

.activity-icon-creative {
  background-color: #ebdef0;
}

.activity-icon-social {
  background-color: #d4e6f1;
}

.activity-icon-educational {
  background-color: #d1f2eb;
}

.activity-icon-wellness {
  background-color: #d5f5e3;
}

.activity-details {
  flex-grow: 1;
}

.activity-day {
  color: var(--text);
  font-size: 14px;
  margin-bottom: 5px;
}

.activity-description {
  margin: 10px 0;
  color: var(--text);
}

.activity-capacity {
  font-size: 14px;
  color: var(--text);
}

/* Activity Detail Modal */
.activity-header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--gray);
}

.activity-content {
  margin-bottom: 25px;
}

.activity-details-full strong {
  color: var(--dark);
}

.activity-description-full {
  margin: 15px 0;
  line-height: 1.7;
}

.benefits-section,
.requirements-section {
  margin: 20px 0;
}

.benefits-section h3,
.requirements-section h3 {
  margin-bottom: 10px;
  color: var(--dark);
}

.benefits-section ul,
.requirements-section ul {
  margin-left: 20px;
}

.benefits-section li,
.requirements-section li {
  margin-bottom: 5px;
}

.activity-actions {
  text-align: center;
  margin-top: 25px;
}

.book-btn.large {
  padding: 12px 25px;
  font-size: 16px;
}

/* Bookings List */
.bookings-list {
  list-style: none;
}

.booking-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid var(--gray);
  gap: 15px;
}

.booking-item:last-child {
  border-bottom: none;
}

.booking-time,
.booking-location {
  color: var(--text);
  font-size: 14px;
  margin-bottom: 3px;
}

/* Notification */
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 25px;
  border-radius: var(--border-radius);
  background-color: #2ecc71;
  color: white;
  z-index: 300;
  display: none;
  box-shadow: var(--shadow);
  font-weight: 500;
}

.notification.danger {
  background-color: var(--accent);
}

.notification.success {
  background-color: #2ecc71;
}
</style>
