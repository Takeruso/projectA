<template>
    <div class="landing-page">
      <header class="landing-header">
        <div class="container header-container">
          <div class="logo">Swin Care</div>
          <router-link to="/login">
            <button  class="sign-in-btn">Sign In</button>
          </router-link>
        </div>
      </header>
  
      <main class="container">
        <section class="hero-section">
          <h1>Welcome to Swin Care</h1>
          <p>
            Where care meets comfort. Discover a safe, supportive, and vibrant community for your golden years.
          </p>
        </section>
  
        <section class="features-section">
          <h2>Our Features</h2>
          <div class="features-grid">
            <div class="feature-card">🏥 24/7 Medical Care</div>
            <div class="feature-card">🍽️ Nutritious Meals</div>
            <div class="feature-card">🎨 Daily Activities</div>
            <div class="feature-card">🛏️ Comfortable Rooms</div>
            <div class="feature-card">👩‍⚕️ Dedicated Staff</div>
            <div class="feature-card">📞 Family Communication</div>
          </div>
        </section>
      </main>
  
      <footer>
        
      </footer>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  function goToSignIn() {
    router.push('/login')
  }
  </script>
  
  <style scoped>
  .landing-page {
    --primary: #ff2474;
    --primary-light: #ff5d98;
    --dark: #2a3950;
    --light: #f9f9f9;
    --gray: #e5e9f0;
    background-color: var(--light);
    color: var(--dark);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .container {
    width: 80vw;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .landing-header {
    background-color: white;
    padding: 1rem 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
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
  }
  
  .sign-in-btn {
    background-color: var(--primary);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: bold;
    border: none;
    cursor: pointer;
  }
  
  .sign-in-btn:hover {
    background-color: var(--primary-light);
  }
  
  .hero-section {
    text-align: center;
    padding: 4rem 0 2rem;
  }
  
  .hero-section h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .hero-section p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #555;
  }
  
  .cta-btn {
    background-color: var(--primary);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    border: none;
    cursor: pointer;
  }
  
  .cta-btn:hover {
    background-color: var(--primary-light);
  }
  
  .features-section {
    margin-top: 4rem;
    text-align: center;
  }
  
  .features-section h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
  }
  
  .feature-card {
    background-color: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    font-size: 1.1rem;
    font-weight: bold;
  }
  
  .landing-footer {
    margin-top: auto;
    background-color: white;
    padding: 1rem 0;
    text-align: center;
    color: #888;
    box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.05);
  }
  </style>
  