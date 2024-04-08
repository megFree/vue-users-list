import { createWebHistory, createRouter } from 'vue-router';
import { UsersFilter } from '@/features/UsersFilter';

const routes = [{ path: '/', component: UsersFilter }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
