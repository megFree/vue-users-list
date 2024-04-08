import { createWebHistory, createRouter } from 'vue-router';
import { UsersFilter } from '@/features/UsersFilter';

const routes = [{ path: '/', component: UsersFilter }];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
