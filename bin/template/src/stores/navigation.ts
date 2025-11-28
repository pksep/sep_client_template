import { BreadcrumbsType } from '@/UI/types/breadcrumbs';
import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    _nav: localStorage.getItem('nav')
      ? JSON.parse(localStorage.getItem('nav'))
      : [],
    _previousUrl: '' as string,
    _currentUrl: '' as string,
    _cachedBreadcrumbs: null as BreadcrumbsType | null
  }),
  getters: {
    getNav: state => state._nav,
    getBreadcrumbs: state => state._cachedBreadcrumbs,
    getCurrentUrl: state => state._currentUrl
  },
  actions: {
    delitPathNavigate(path) {
      if (!this._nav.length) return false;

      this._nav = this._nav.filter(nav => nav.path != path);
      localStorage.setItem('nav', JSON.stringify(this._nav));
    },

    changeActivePath(inx) {
      if (inx !== 0) {
        const firstNavElemnt = this._nav[0];
        const currentActivePath = this._nav.splice(inx, 1)[0];
        this._nav.splice(0, 1, currentActivePath, firstNavElemnt);
        localStorage.setItem('nav', JSON.stringify(this._nav));
      }
    },

    pushPathNavigate(to) {
      if (this._nav.length > 0) {
        this._nav.forEach((e, inx) => {
          if (e.path == to.path) {
            this._nav.splice(inx, 1);
          }
        });
      }

      if (this._nav.length > 8) this._nav.pop();

      this._nav.unshift({ name: to.name, path: to.path });
      localStorage.setItem('nav', JSON.stringify(this._nav));
    },
    deleteAllNav() {
      this._nav = [];
      localStorage.setItem('nav', this._nav);
    },
    setCacheBreadcrumbs(breadcrumbs: BreadcrumbsType) {
      this._cachedBreadcrumbs = breadcrumbs;
      localStorage.setItem('breadcrumbs', JSON.stringify(breadcrumbs));
    },
    updateRouteState(
      to: RouteLocationNormalized,
      from: RouteLocationNormalized
    ) {
      const newUrl = to.fullPath;
      const oldUrl = from.fullPath;

      if (newUrl !== oldUrl) {
        this.previousUrl = oldUrl;
        this.currentUrl = newUrl;
        this.cachedBreadcrumbs = null;
        localStorage.setItem('breadcrumbs', JSON.stringify([]));
      }
    }
  }
});
