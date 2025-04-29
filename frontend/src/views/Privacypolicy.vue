<template>
  <div class="content">
    <h1>Privacy Policy</h1>
    <p class="intro">
      At Swin Care, we are committed to protecting your privacy and ensuring the
      security of your personal information. This Privacy Policy outlines how we
      collect, use, and safeguard your data.
    </p>
    <div class="section">
      <h2>Information We Collect</h2>
      <p>
        We may collect personal information such as your name, contact details,
        and any other data necessary to provide our services. This information
        is collected when you interact with our website, contact us, or use our
        services.
      </p>
    </div>
    <div class="section">
      <h2>How We Use Your Information</h2>
      <p>
        Your information is used to provide and improve our services, respond to
        your inquiries, and comply with legal obligations. We do not share your
        information with third parties without your consent unless required by
        law.
      </p>
    </div>
    <div class="section">
      <h2>Data Security</h2>
      <p>
        We implement appropriate security measures to protect your personal
        information from unauthorized access, disclosure, or alteration.
        However, please note that no method of transmission over the internet is
        completely secure.
      </p>
    </div>
    <div class="section">
      <h2>Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please
        contact us at
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
