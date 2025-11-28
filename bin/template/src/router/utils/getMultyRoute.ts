import { RouteRecordRaw } from 'vue-router';

/**
 * Возвращает страницу с другим наименованием.
 * Использовать для роутов, которые используются в разных путях на сайте
 *
 *
 * ! name должно быть уникально
 * @param route
 * @param name
 * @returns
 */
const getMultyRoute = (route: RouteRecordRaw, name: string): RouteRecordRaw => {
  return {
    ...route,
    name
  };
};

export default getMultyRoute;
