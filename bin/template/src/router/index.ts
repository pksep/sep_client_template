import { nextTick } from 'vue';
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router';
import { routes } from '@/router/routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[]
});

router.beforeEach((to, from, next) => {
  if (to.name === 'Редактировать Технику|Инвентарь') {
    const copy = to.params.copy;
    const newRouteName =
      copy === 'true'
        ? 'Редактировать Технику (Копия)'
        : 'Редактировать Технику';

    // You can change the title dynamically or adjust route metadata
    document.title = newRouteName; // For example, change the page title

    // Optionally, store the updated route name in the `meta` or `state`
    to.meta.routeName = newRouteName;
  }

  next();
});

router.afterEach(async (to: RouteLocationNormalized) => {
  const title = to.meta.title || to.name;
  nextTick(() => (document.title = String(title) || 'NPO Автоматив'));
});

export default router;
