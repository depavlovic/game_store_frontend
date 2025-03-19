<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  name: 'Signup',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errorMessage: null,
    };
  },
  methods: {
    async signup() {
      try {
        const response = await axios.post('http://localhost:5000/auth/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.$router.push('/login'); // Redirekt na login
      } catch (error) {
        this.errorMessage = error.response.data.message || 'Something went wrong!';
      }
    },
  },
};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center">Sign Up</h2>
        <form @submit.prevent="signup">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" v-model="name" required />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" v-model="email" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Sign Up</button>
        </form>
        <p class="mt-3 text-center">Already have an account? <router-link to="/login">Login</router-link></p>
        <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
</template>
