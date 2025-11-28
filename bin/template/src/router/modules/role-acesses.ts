import { showMessage } from '@/utils';
import { useAuthStore } from '@/stores/auth';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { accessesFunction } from '@/utils/assets';

let rolesLoaded = false;
let authStore = null;
const routesAcesses = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  if (!authStore) authStore = useAuthStore();
  if (!rolesLoaded) {
    await authStore.loadRoleAccesses();
    rolesLoaded = true;
  }

  if (!authStore?.getRoleAccesses?.accesses) {
    next(from.path);
  } else {
    const hasAccess = accessesFunction(
      String(to.name ?? ''),
      authStore.getRoleAccesses.accesses
    );

    if (!hasAccess) {
      showMessage(
        'Ограниченный доступ',
        'У вас нет доступа к данной странице',
        'w'
      );
      next(from.path);
    } else {
      next();
    }
  }
};

export default routesAcesses;
