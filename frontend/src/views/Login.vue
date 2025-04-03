<template>
  <div class="split-container">
    <!-- Left Side: Image -->
    <div class="image-half">
      <img src="../assets/ju.jpg" alt="Background image" />
    </div>
    

    
    <!-- Right Side: Login -->
    <div class="login-half">
      <div class="login-box">
        <h1>Sign In</h1>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">Username</label>
            <input id="username" type="text" v-model="username" required />
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" v-model="password" required />
          </div>
          
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    
    const handleLogin = () => {
      console.log("Logging in with:", username.value, password.value);
    };
    
    return {
      username,
      password,
      handleLogin,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.split-container {
  display: flex;
  height: 100vh;
  width: 100vw; /* Ensure full width */
}

.image-half, .login-half {
  flex: 1;
  height: 100vh; /* Ensure full height */
}

.image-half img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-half {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
}

.login-box {
  width: 100%;
  max-width: 900px;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
