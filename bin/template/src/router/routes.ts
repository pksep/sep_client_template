// Views
import WorkTable from '@/views/WorkTable/WorkTable.vue';

import NotFound from '@/views/UI/NotFound.vue';
import settingsRoute from '@/router/routes/settings/settings';
import { RouteRecordRaw } from 'vue-router';

/**
 * Объект со всеми роутами
 * значения name/path должны быть уникальны, иначе будет кидать на страницу "NotFound"
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'main',
        component: WorkTable,
        meta: { title: 'Главная' }
      }
    ]
  },

  {
    path: '/:catchAll(.*)',
    component: NotFound,
    meta: {
      title: 'Страница не найдена'
    }
  },

  // Настройки
  settingsRoute
];
