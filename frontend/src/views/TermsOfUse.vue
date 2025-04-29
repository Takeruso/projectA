<template>
  <div class="content">
    <h1>Terms of Use</h1>
    <p class="intro">
      Welcome to Swin Care. By using our website and services, you agree to
      comply with these Terms of Use. Please read them carefully.
    </p>
    <div class="section">
      <h2>Acceptance of Terms</h2>
      <p>
        By accessing or using our website, you agree to be bound by these terms.
        If you do not agree, please do not use our website or services.
      </p>
    </div>
    <div class="section">
      <h2>Use of Services</h2>
      <p>
        Our services are intended for lawful purposes only. Users must not
        engage in any activity that disrupts or interferes with the operation of
        our website or violates any applicable laws.
      </p>
    </div>
    <div class="section">
      <h2>Intellectual Property</h2>
      <p>
        All content on this website, including text, images, and logos, is the
        property of Swin Care and is protected by copyright laws. Unauthorized
        use of our content is prohibited.
      </p>
    </div>
    <div class="section">
      <h2>Disclaimer</h2>
      <p>
        While we strive to provide accurate and up-to-date information, we make
        no guarantees about the completeness or reliability of the content on
        our website. Use our website at your own risk.
      </p>
    </div>
    <div class="section">
      <h2>Contact Us</h2>
      <p>
        If you have any questions about these Terms of Use, please contact us at
        <a href="/contact">Contact Us</a>.
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.content {
  max-width: 900px;
  margin: 2rem auto;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.8;
  padding: 2rem;
  background: #ffffff;
  border: 1px solid #e5e9f0;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  color: var(--primary, #ff2474);
  margin-bottom: 1rem;
  text-align: center;
}

.intro {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.section {
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.8rem;
  color: var(--dark, #2a3950);
  margin-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary, #ff2474);
  display: inline-block;
}

p {
  font-size: 1rem;
  color: #555;
}

a {
  color: var(--primary, #ff2474);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
