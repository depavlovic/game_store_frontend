<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      user: null, 
    };
  },
  mounted() {
    this.checkUser();
  },
  methods: {
  checkUser() {
    
    const token = localStorage.getItem('token');
    if (token) {
      this.getUserInfo(token);  
    } else {
      this.$router.push('/login'); 
    }
  },
  
  async getUserInfo(token) {
    try {
     
      const response = await fetch('http://localhost:5000/api/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      const data = await response.json();
      this.user = data; 
    } catch (error) {
      console.error(error);
      this.$router.push('/login'); 
    }
  },
  
  logout() {
    localStorage.removeItem('token'); 
    this.$router.push('/login'); 
  },
},

};
</script>

<style scoped>

.container {
  max-width: 600px;
}
</style>
<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h2 class="text-center">Welcome to your Dashboard</h2>
          <div v-if="user">
            <h4>Your Information</h4>
            <ul>
              <li><strong>Name:</strong> {{ user.name }}</li>
              <li><strong>Email:</strong> {{ user.email }}</li>
            </ul>
            <button class="btn btn-danger" @click="logout">Logout</button>
          </div>
          <div v-else>
            <p>Please log in to access your dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  </template>