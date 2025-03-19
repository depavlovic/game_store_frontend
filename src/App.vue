<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import {  ref } from 'vue';


const year = new Date().getFullYear();




const games = ref<any[]>([]);



</script>

<template>
  <nav class="navbar navbar-expand-lg bg-primary">
    <div class="container">
      <a class="navbar-brand text-white" href="#"> <i class="fa-solid fa-gamepad"></i> Game Store</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
            <Navbar to="/" name="Home"/>
            <Navbar to="/about" name="About"/>
            <Navbar to="/login" name="Login"/>
            <Navbar to="/signup" name="Sign Up"/>
        </ul>
      </div>
    </div>
  </nav>
<div>
    <RouterView />
  <footer class="mx-auto text-center">
    &copy; {{ year }} - Dejan Pavlovic
  </footer>
</div>
</template>


