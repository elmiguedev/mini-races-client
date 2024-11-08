import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import AdminView from '../views/admin/AdminView.vue'
import RacesView from '../views/races/RacesView.vue'
import RaceView from '../views/races/RaceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, },
    { path: '/login', name: "login", component: LoginView },
    { path: '/register', name: "register", component: RegisterView },
    { path: "/admin", name: "admin", component: AdminView },
    { path: "/races", name: "races", component: RacesView },
    { path: "/races/:raceId", name: "race", component: RaceView }
  ],
})

export default router
