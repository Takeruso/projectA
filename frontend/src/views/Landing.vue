<template>
    <div class="landing-page">
      <header class="landing-header">
        <div class="container header-container">
          <div class="logo">
             Swin Care
          </div>
          <nav class="main-nav">
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <router-link to="/login">
            <button class="sign-in-btn">Sign In</button>
          </router-link>
        </div>
      </header>
      
      <main>
        <section class="hero-section">
          <div class="container hero-container">
            <div class="hero-content">
              <h1 class="fade-in">Welcome to <span class="highlight">Swin Care</span></h1>
              <p class="hero-description fade-in-delay">
                Where care meets comfort. Discover a safe, supportive, and vibrant community 
                for your golden years.
              </p>
              <div class="hero-buttons fade-in-delay-2">
                <button class="cta-btn" @click="scrollToContact">Schedule a Visit</button>
                <button class="secondary-btn" @click="scrollToServices">Our Services</button>
              </div>
            </div>
            <div class="hero-image fade-in-delay">
                <img src="../assets/second.jpg" alt="">
                
              
            </div>
          </div>
        </section>
  
        <section id="about" class="about-section">
          <div class="container">
            <div class="section-header">
              <h2>About <span class="highlight">Swin Care</span></h2>
              <p class="section-subtitle">A Home Away From Home</p>
            </div>
            <div class="about-content">
              <div class="about-image">
                <img src="../assets/ju.jpg" alt="">
                
                
              </div>
              <div class="about-text">
                <p>
                  For over 25 years, Swin Care has been a trusted name in senior living. 
                  Our commitment to excellence and person-centered care approach ensures 
                  that each resident experiences the perfect balance of independence and support.
                </p>
                <p>
                  Our highly trained staff members are passionate about creating a nurturing 
                  environment where seniors can thrive, engage in enriching activities, 
                  and build meaningful relationships.
                </p>
                <div class="stats">
                  <div class="stat-item">
                    <span class="stat-number">25+</span>
                    <span class="stat-label">Years Experience</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-number">500+</span>
                    <span class="stat-label">Happy Residents</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-number">98%</span>
                    <span class="stat-label">Satisfaction Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <section id="services" class="features-section">
          <div class="container">
            <div class="section-header">
              <h2>Our <span class="highlight">Services</span></h2>
              <p class="section-subtitle">Comprehensive Care for Your Loved Ones</p>
            </div>
            <div class="features-grid">
              <div class="feature-card">
                <div class="feature-icon">🏥</div>
                <h3>24/7 Medical Care</h3>
                <p>Round-the-clock medical assistance from qualified healthcare professionals.</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">🍽️</div>
                <h3>Nutritious Meals</h3>
                <p>Chef-prepared meals catered to dietary needs and preferences.</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">🎨</div>
                <h3>Daily Activities</h3>
                <p>Engaging social and recreational programs to stimulate mind and body.</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">🛏️</div>
                <h3>Comfortable Rooms</h3>
                <p>Private and semi-private rooms designed for comfort and accessibility.</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">👩‍⚕️</div>
                <h3>Dedicated Staff</h3>
                <p>Compassionate care providers trained to meet individual needs.</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">📞</div>
                <h3>Family Communication</h3>
                <p>Regular updates and easy access for family visits and calls.</p>
              </div>
            </div>
          </div>
        </section>
  
        <section class="gallery-section">
          <div class="container">
            <div class="section-header">
              <h2>Our <span class="highlight">Facilities</span></h2>
              <p class="section-subtitle">Take a Virtual Tour</p>
            </div>
            <div class="gallery">
              <div class="gallery-item">
                <img src="../assets/f1.jpg" alt="facilities" >
                <div class="gallery-caption">Spacious Common Areas</div>
              </div>
              <div class="gallery-item">
                <img src="../assets/f2.jpg" alt="Dining hall" />
                <div class="gallery-caption">Modern Dining Hall</div>
              </div>
              <div class="gallery-item">
                <img src="../assets/f3.jpg" alt="Private room" />
                <div class="gallery-caption">Comfortable Private Rooms</div>
              </div>
              <div class="gallery-item">
                <img src="../assets/f4.jpg" alt="Garden" />
                <div class="gallery-caption.">Beautiful Garden</div>
              </div>
            </div>
          </div>
        </section>
  
        <section id="testimonials" class="testimonials-section">
          <div class="container">
            <div class="section-header">
              <h2>What <span class="highlight">Families Say</span></h2>
              <p class="section-subtitle">Heartfelt Testimonials</p>
            </div>
            <div class="testimonials-slider">
              <div class="testimonial">
                <div class="testimonial-content">
                  <p>"The care and attention my mother receives at Swin Care is exceptional. The staff treats her like family, and I have peace of mind knowing she's in good hands."</p>
                  <div class="testimonial-author">
                    <div class="author-name">Sarah Johnson</div>
                    <div class="author-relation">Daughter of Resident</div>
                  </div>
                </div>
              </div>
              <div class="testimonial-nav">
                <button class="nav-btn prev" @click="prevTestimonial">←</button>
                <div class="nav-indicators">
                  <span class="indicator active"></span>
                  <span class="indicator"></span>
                  <span class="indicator"></span>
                </div>
                <button class="nav-btn next" @click="nextTestimonial">→</button>
              </div>
            </div>
          </div>
        </section>
  
        <section id="contact" class="contact-section">
          <div class="container">
            <div class="section-header">
              <h2>Get in <span class="highlight">Touch</span></h2>
              <p class="section-subtitle">We're Here to Help</p>
            </div>
            <div class="contact-container">
              <div class="contact-info">
                <div class="info-item">
                  <div class="info-icon">📍</div>
                  <div class="info-content">
                    <h3>Visit Us</h3>
                    <p>123 Care Lane, Serenity Heights, CA 90210</p>
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-icon">📞</div>
                  <div class="info-content">
                    <h3>Call Us</h3>
                    <p>(555) 123-4567</p>
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-icon">✉️</div>
                  <div class="info-content">
                    <h3>Email Us</h3>
                    <p>info@swincare.com</p>
                  </div>
                </div>
                
              </div>
              <div class="contact-form">
                <h3>Send us a Message</h3>
                <form @submit.prevent="submitForm">
                  <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" v-model="form.name" placeholder="Your Name" required />
                  </div>
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="form.email" placeholder="Your Email" required />
                  </div>
                  <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" v-model="form.phone" placeholder="Your Phone" />
                  </div>
                  <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" v-model="form.message" placeholder="How can we help you?" rows="4"></textarea>
                  </div>
                  <button type="submit" class="cta-btn full-width">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
  
      <footer ></footer>
      
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const form = ref({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  function goToSignIn() {
    router.push('/login');
  }
  
  function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  }
  
  function scrollToServices() {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  }
  
  function submitForm() {
    // Handle form submission
    alert('Thank you for your message! We will get back to you shortly.');
    form.value = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
  }
  
  // Testimonial slider functionality
  const currentTestimonial = ref(0);
  const testimonials = [
    {
      content: "The care and attention my mother receives at Swin Care is exceptional. The staff treats her like family, and I have peace of mind knowing she's in good hands.",
      author: "Sarah Johnson",
      relation: "Daughter of Resident"
    },
    {
      content: "Moving my father to Swin Care was the best decision we made. The facilities are beautiful, but it's the compassionate staff that truly makes the difference.",
      author: "Michael Torres",
      relation: "Son of Resident"
    },
    {
      content: "As a resident of Swin Care for two years now, I can say that I've found a wonderful community here. The activities keep me engaged, and I've made many new friends.",
      author: "Eleanor White",
      relation: "Resident"
    }
  ];
  
  function nextTestimonial() {
    currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.length;
    updateTestimonial();
  }
  
  function prevTestimonial() {
    currentTestimonial.value = (currentTestimonial.value - 1 + testimonials.length) % testimonials.length;
    updateTestimonial();
  }
  
  function updateTestimonial() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      if (index === currentTestimonial.value) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
    
    const testimonialElement = document.querySelector('.testimonial-content p');
    const authorNameElement = document.querySelector('.author-name');
    const authorRelationElement = document.querySelector('.author-relation');
    
    if (testimonialElement && authorNameElement && authorRelationElement) {
      const current = testimonials[currentTestimonial.value];
      testimonialElement.textContent = current.content;
      authorNameElement.textContent = current.author;
      authorRelationElement.textContent = current.relation;
    }
  }
  
  onMounted(() => {
    // Add scroll animation for sections
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
  
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
  });
  </script>
  
  <style scoped>
  /* Base Styles */
  .landing-page {
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
  
  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .highlight {
    color: var(--primary);
  }
  
  /* Animations */
  .fade-in {
    animation: fadeIn 0.8s ease-in-out;
  }
  
  .fade-in-delay {
    animation: fadeIn 0.8s ease-in-out 0.3s forwards;
    opacity: 0;
  }
  
  .fade-in-delay-2 {
    animation: fadeIn 0.8s ease-in-out 0.6s forwards;
    opacity: 0;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  section {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
    padding: 5rem 0;
  }
  
  section.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .section-header h2 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: var(--dark);
  }
  
  .section-subtitle {
    font-size: 1.2rem;
    color: var(--primary);
    margin-bottom: 1rem;
  }
  
  /* Header Styles */
  .landing-header {
    background-color: white;
    padding: 1rem 0;
    box-shadow: var(--shadow);
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
    font-size: 1.6rem;
    color: var(--primary);
    display: flex;
    align-items: center;
    letter-spacing: 0.5px;
  }
  
  .logo-icon {
    margin-right: 8px;
    font-size: 1.4rem;
  }
  
  .main-nav ul {
    display: flex;
    list-style: none;
    gap: 2rem;
  }
  
  .main-nav a {
    text-decoration: none;
    color: var(--dark);
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;
  }
  
  .main-nav a:hover {
    color: var(--primary);
  }
  
  .main-nav a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary);
    transition: width 0.3s ease;
  }
  
  .main-nav a:hover::after {
    width: 100%;
  }
  
  .sign-in-btn {
    background-color: var(--primary);
    color: white;
    padding: 0.6rem 1.2rem;
    border-radius: var(--border-radius);
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .sign-in-btn:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
  }
  
  /* Hero Section */
  .hero-section {
    padding: 5rem 0;
    background: linear-gradient(to right, #f9f9f9, #e5e9f0);
    overflow: hidden;
  }
  
  .hero-container {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 2rem;
    align-items: center;
  }
  
  .hero-content {
    padding-right: 2rem;
  }
  
  .hero-content h1 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    color: var(--dark);
  }
  
  .hero-description {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    color: var(--text);
    line-height: 1.6;
  }
  
  .hero-buttons {
    display: flex;
    gap: 1rem;
  }
  
  .cta-btn {
    background-color: var(--primary);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    font-weight: bold;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .cta-btn:hover {
    background-color: var(--primary-dark);
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .secondary-btn {
    background-color: transparent;
    color: var(--primary);
    border: 2px solid var(--primary);
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .secondary-btn:hover {
    background-color: rgba(74, 144, 226, 0.1);
    transform: translateY(-3px);
  }
  .hero-image {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.hero-image img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  display: block;
  object-fit: cover;
  transition: transform 0.5s ease;
}
  
  /* About Section */
  .about-section {
    background-color: white;
  }
  
  .about-content {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 3rem;
    align-items: center;
  }
  
  .about-image img {
    width: 100%;
    border-radius: 12px;
    box-shadow: var(--shadow);
    transition: transform 0.3s ease;
  }
  
  .about-image img:hover {
    transform: scale(1.02);
  }
  
  .about-text p {
    margin-bottom: 1.5rem;
    line-height: 1.7;
    color: var(--text);
  }
  
  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .stat-item {
    text-align: center;
    padding: 1rem;
    background-color: var(--light);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
  }
  
  .stat-number {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    font-size: 0.9rem;
    color: var(--text);
  }
  
  /* Features Section */
  .features-section {
    background-color: var(--light);
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .feature-card {
    background-color: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: var(--shadow);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  
  .feature-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .feature-card h3 {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
    color: var(--dark);
  }
  
  .feature-card p {
    color: var(--text);
    line-height: 1.6;
  }
  
  /* Gallery Section */
  .gallery-section {
    background-color: white;
  }
  
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: var(--shadow);
  }
  
  .gallery-item img {
    width: 100%;
    display: block;
    transition: transform 0.5s ease;
  }
  
  .gallery-item:hover img {
    transform: scale(1.05);
  }
  
  .gallery-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.8rem;
    background-color: rgba(42, 57, 80, 0.8);
    color: white;
    font-weight: 500;
  }
  
  /* Testimonial Section */
  .testimonials-section {
    background-color: var(--light);
  }
  
  .testimonials-slider {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .testimonial {
    background-color: white;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: var(--shadow);
    margin-bottom: 1.5rem;
  }
  
  .testimonial-content p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--text);
    margin-bottom: 1.5rem;
    font-style: italic;
  }
  
  .testimonial-author {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  
  .author-name {
    font-weight: bold;
    color: var(--dark);
  }
  
  .author-relation {
    color: var(--primary);
    font-size: 0.9rem;
  }
  
  .testimonial-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  
  .nav-btn {
    background-color: white;
    color: var(--primary);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid var(--gray);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .nav-btn:hover {
    background-color: var(--primary);
    color: white;
  }
  
  .nav-indicators {
    display: flex;
    gap: 0.5rem;
  }
  
  .indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--gray);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .indicator.active {
    background-color: var(--primary);
  }
  
  /* Contact Section */
  .contact-section {
    background-color: white;
  }
  
  .contact-container {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 3rem;
  }
  
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .info-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .info-icon {
    font-size: 1.5rem;
    color: var(--primary);
  }
  
  .info-content h3 {
    margin-bottom: 0.5rem;
    color: var(--dark);
  }
  
  .info-content p {
    color: var(--text);
  }
  
  .contact-form {
    background-color: var(--light);
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
  }
  
  .contact-form h3 {
    margin-bottom: 1.5rem;
    color: var(--dark);
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 1.2rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--dark);
    font-weight: 500;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid var(--gray);
    border-radius: var(--border-radius);
    font-family: inherit;
    font-size: 1rem;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
  }
  
  .full-width {
    width: 100%;
  }
  
  /* Footer */
  .landing-footer {
    background-color: var(--dark);
    color: white;
    padding: 4rem 0 2rem;
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 3rem;
    margin-bottom: 2rem;
  }
  
  .footer-logo p {
    margin-top: 1rem;
    color: #aab6c7;
  }
  
  .footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  
  .link-group h3 {
    margin-bottom: 1.2rem;
    color: var(--primary-light);
    font-size: 1.2rem;
  }
  
  .link-group ul {
    list-style: none;
    padding: 0;
  }
  
  .link-group li {
    margin-bottom: 0.8rem;
  }
  
  .link-group a {
    color: #aab6c7;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  </style>