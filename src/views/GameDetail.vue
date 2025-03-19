<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { GameModel } from '@/models/game.model';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

const gameId = route.params.id;
const game = ref<GameModel | null>(null);


const fetchGameDetails = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/game?id=${id}`);
    game.value = response.data;
  } catch (error) {
    console.error('Error fetching game details:', error);
  }
};

onMounted(() => {
  if (gameId) {
    fetchGameDetails(Number(gameId));
  }
});


const buyGame = async () => {
  try {
    await axios.post(`http://localhost:5000/api/buy-game/${gameId}`);
    Swal.fire({
      title: 'Uspešno ste kupili igru!',
      text: `Čestitamo na kupovini igre: ${game.value?.title}`,
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      router.push('/');
    });
  } catch (error) {
    console.error('Error during purchase:', error);
    Swal.fire({
      title: 'Greška!',
      text: 'Došlo je do greške pri kupovini igre.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
};

const declinePurchase = () => {
  Swal.fire({
    title: 'Niste kupili igru',
    text: 'Vratili ste se na početnu stranicu.',
    icon: 'info',
    confirmButtonText: 'OK',
  }).then(() => {
    router.push('/');
  });
};
</script>

<template>
  <div class="container" v-if="game">
    <h1 class="text-center my-4">{{ game.title }}</h1>
    <p class="text-center">{{ game.short_description }}</p>

    <div class="d-flex justify-content-center">
      <button class="btn btn-success" @click="buyGame">Da, želim da kupim</button>
      <button class="btn btn-danger ml-3" @click="declinePurchase">Ne, želim da se vratim</button>
    </div>
  </div>
</template>









