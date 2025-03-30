<template>
    <div class="container mt-5">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <input
          class="form-control my-2"
          v-model="username"
          placeholder="Username"
          required
        />
        <input
          class="form-control my-2"
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />
        <button class="btn btn-primary" type="submit">Login</button>
        <p v-if="error" class="text-danger mt-2">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LoginView',
    data() {
      return {
        username: '',
        password: '',
        error: ''
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post('http://localhost:3000/api/users', {
            username: this.username,
            password: this.password
          });
          console.log('Login success:', response.data);
          this.$router.push('/dashboard');
        } catch (err) {
          console.error('Login failed:', err);
          this.error = 'Login failed. Please try again.';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
  }
  </style>