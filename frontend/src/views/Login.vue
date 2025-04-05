<template>
  <div class="container">
    <!-- Left Side: Image -->
    <div class="image-side">
      <img src="/Login.jpg" alt="Login background" />
    </div>

    <!-- Right Side: Login -->
    <div class="login-side">
      <div class="login-box">
        <h1>Sign In</h1>
        <form id="loginForm">
          <div class="form-group">
            <label for="username">Username</label>
            <input id="username" type="text" required />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" required />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const handleLogin = () => {
  console.log('Login attempt:', username.value)
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.container {
  display: flex;
  height: 100vh;
  width: 100%;
}

.image-side {
  width: 50%;
  height: 100%;
}

.image-side img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-side {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.login-box {
  width: 70%;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #3367d6;
}
</style>
