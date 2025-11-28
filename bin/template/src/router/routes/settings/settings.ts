import { RouteRecordRaw } from 'vue-router';

const settingsChildren: RouteRecordRaw[] = [
  {
    path: '',
    name: 'settings',
    component: () => import('@/views/Settings')
  }
];

const settingsRoute: RouteRecordRaw = {
  path: '/settings',
  children: settingsChildren,
  meta: {
    title: 'Настройки'
  }
};

export default settingsRoute;
