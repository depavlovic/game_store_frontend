<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { filterGames } from '@/services/gameservices';
import type { GameModel } from '@/models/game.model';

const games = ref<GameModel[]>([]);
const currentPage = ref(1);
const searchQuery = ref<string>(''); 
const itemsPerPage = 21;

onMounted(() => {
  fetchGames();
});

const fetchGames = async () => {
  try {
    const response = await axios.get<GameModel[]>('http://localhost:5000/api/games');
    games.value = response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
  }
};

const filteredGames = computed(() => filterGames(games.value, searchQuery.value));

const totalPages = computed(() => Math.ceil(filteredGames.value.length / itemsPerPage) || 1); 
const paginatedGames = computed(() => 
  filteredGames.value.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage)
);

const first = () => { currentPage.value = 1; };
const prev = () => { if (currentPage.value > 1) currentPage.value--; };
const next = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
const last = () => { currentPage.value = totalPages.value; };
const goToPage = (page: number) => { currentPage.value = page; };


const handleSearch = () => {
  console.log(searchQuery.value);
};
</script>

<template>
  <div class="container">
    <h1 class="text-center my-4">Game Store</h1>

    <div class="mb-4">
      <input 
        v-model="searchQuery" 
        @keyup="handleSearch" 
        type="text" 
        class="form-control" 
        placeholder="Pretraži igre..." 
      />
    </div>

    <!--Paginacija-->
    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="first">First</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="prev">Previous</button>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="next">Next</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="last">Last</button>
        </li>
      </ul>
    </nav>

    
    <div class="row">
      <div class="col-md-4 mb-4" v-for="game in paginatedGames" :key="game.id">
        <div class="card h-100">
          <img :src="game.thumbnail" class="card-img-top" alt="Game Thumbnail">
          <div class="card-body">
            <h5 class="card-title">{{ game.title }}</h5>
            <p class="card-text">{{ game.short_description }}</p>
            <RouterLink :to="'/game/' + game.id" class="btn btn-primary">Buy Now</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

