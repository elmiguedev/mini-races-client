import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import AdminView from '../views/admin/AdminView.vue'
import AppLayout from '../views/layout/AppLayout.vue'
import { useAuth } from '../hooks/auth/useAuth'
import LogoutView from '../views/auth/LogoutView.vue'
import RaceView from '@/views/races/race/RaceView.vue'
import RacesView from '@/views/races/racelist/RacesView.vue'
import NotFoundView from '@/views/error/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: "login", component: LoginView },
    { path: '/register', name: "register", component: RegisterView },
    {
      path: '/', component: AppLayout, meta: { requiresAuth: true }, children: [
        { path: "/", name: "home", component: HomeView },
        { path: "/logout", name: "logout", component: LogoutView },
        { path: "/admin", name: "admin", component: AdminView },
        { path: "/races", name: "races", component: RacesView },
        { path: "/races/:raceId", name: "race", component: RaceView }
      ]
    },
    { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFoundView }
  ],
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    if (to.meta.requiresAuth) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    if (to.name === "login" || to.name === "register") {
      next({ name: "home" });
    } else {
      next();
    }
  }
})

export default router
