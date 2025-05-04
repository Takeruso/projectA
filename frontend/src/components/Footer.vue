<template>
  <footer>
    <div class="container footer-container">
      <div class="copyright">© 2025 Swin Care. All rights reserved.</div>
      <div class="footer-links">
        <router-link to="/privacy">Privacy Policy</router-link>
        <router-link to="/terms">Terms of Use</router-link>
        <!-- Link to the #contact section on the Landing page -->
        <router-link to="/#contact">Contact Us</router-link>
        <!-- Link to the #feedback section on the Landing page -->
        <router-link to="/#feedback">Feedback</router-link>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
footer {
  background-color: white;
  padding: 1.5rem 0;
  margin-top: 3rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  --primary: #ff2474;
  --primary-light: #ff5d98;
  --secondary: #f4b942;
  --dark: #2a3950;
  --light: #f9f9f9;
  --danger: #d64045;
  --success: #4caf50;
  --gray: #e5e9f0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links a {
  color: var(--primary, #3498db);
  margin-left: 1rem;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
