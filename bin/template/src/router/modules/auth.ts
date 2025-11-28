import { useAuthStore } from '@/stores/auth';
import { showMessage } from '@/utils';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import routesAcesses from './role-acesses';

export async function isAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  try {
    const auth = JSON.parse(localStorage.getItem('auth')) || false;

    if (!auth) {
      const authStore = useAuthStore();
      authStore.unAuth();

      if (to.path !== from.path) {
        showMessage('', 'Пользователь не авторизирован', 'e');
        next('/');
      } else {
        next();
      }
    } else {
      await routesAcesses(to, from, next);
    }

    // next();
  } catch (err) {
    console.error(err);
  }
}
