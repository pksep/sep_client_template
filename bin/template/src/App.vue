<template>
  <PushNotification :is-not-app="state.renderApplication" />
  <div id="nav">
    <HeadersNav @exit="unAuth" />
    <MenuItem :active-menu="activeMenu" />
    <UserActionNotificationsVue />
    <div :class="{ container: true, container__large: state.isCollapsed }">
      <YBreadCrumbs
        v-if="breadcrumbs"
        :key="route.path"
        :items="breadcrumbs"
        @click="routesSelect"
      />
      <Suspense>
        <template #default>
          <router-view />
        </template>
        <template #fallback>
          <Loader />
        </template>
      </Suspense>
    </div>
  </div>
</template>
<script setup lang="ts">
import '@/assets/style/style.css';
import HeadersNav from '@/UI/HeaderNav.vue';
import MenuItem from '@/components/MenuLeft';
import { computed, reactive } from 'vue';
import UserActionNotificationsVue from '@/UI/UserActionNotifications.vue';
import PushNotification from '@/UI/PushNotification';
import { useAuthStore } from '@/stores/auth';
import { RouteLocation, useRoute, useRouter } from 'vue-router';
import { BreadcrumbsType } from '@/UI/types/breadcrumbs';
import { useNavigationStore } from './stores/navigation';
import { useGlobalStore } from '@/stores/global';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const navigationStore = useNavigationStore();
const globalStore = useGlobalStore();

const state = reactive({
  isCollapsed: computed(() => globalStore.getCollapsedMenu)
});

const breadcrumbs = computed<BreadcrumbsType>(() => getBreadCrumbs(route));
const activeMenu = computed<string>(() =>
  breadcrumbs.value.length > 0 ? breadcrumbs.value[1]?.path : '/'
);

const getBreadCrumbs = (route: RouteLocation): BreadcrumbsType => {
  const routesWithBreadcrumbs = route.matched.filter(m => m.meta?.title);

  const firstItem = {
    title: 'Главная',
    path: '/'
  };
  if (route.path === '/') {
    const defaultItem = [firstItem];
    return defaultItem;
  }

  const items = routesWithBreadcrumbs.map(route => ({
    title: route.meta.title,
    path: route.path
  }));

  const result = [firstItem, ...items];
  navigationStore.setCacheBreadcrumbs(result);

  return result;
};

const routesSelect = item => {
  router.push(item);
};

const unAuth = () => authStore.unAuth();
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.btn-sub-group {
  display: flex;
  gap: 10px;
}

h3 {
  font-weight: unset;
  font-size: 21px;
}

.operation-block {
  display: flex;
  flex-wrap: wrap;
}

table {
  border: 1px solid #d3d3d3;
  border-collapse: collapse;
  font-size: 16px;
}

th {
  border: 1px solid #d3d3d3;
  padding: 6px;
}

td {
  border: 1px solid #d3d3d3;
  padding: 5px;
  white-space: pre-wrap;
}

option {
  white-space: pre-wrap;
}

button {
  cursor: pointer;
  height: 25px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #d3d3d3;
}

a {
  text-decoration: none;
  color: #000 !important;
}

.container {
  margin-left: 230px;
  margin-right: 15px;
  transition: margin-left 0.3s;

  &.container__large {
    margin-left: 60px;
  }
}

.block {
  padding: 20px;
  border-radius: 5px;
  background-color: var(--blue15);
}

input {
  border-radius: 5px;
  border: 1px solid #d3d3d3;
  padding: 5px;
  width: max-content;
}

input[type='checkbox'] {
  padding: 0;
}

.fullName-yui-kit {
  z-index: 10 !important;
}

@media (max-width: 801px) {
  #nav:not(.menu.menu__collapsed) {
    header.header {
      padding-left: 60px;
    }
  }
}
</style>
