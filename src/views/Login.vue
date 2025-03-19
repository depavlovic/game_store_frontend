<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/auth/login', {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('token', response.data.token); 
        this.$router.push('/dashboard'); 
      } catch (error) {
        this.errorMessage = error.response.data.message || 'Invalid credentials!';
      }
    },
  },
};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center">Login</h2>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" v-model="email" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
        <p class="mt-3 text-center">Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
        <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
</template>
