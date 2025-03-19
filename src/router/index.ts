import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GameDetail from '@/views/GameDetail.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import Dashboard from '@/views/Dashboard.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/game/:id',  
      name: 'gameDetail',
      component: GameDetail,  
      props: true,  
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue'), 
    }
  ]
});



export default router;

