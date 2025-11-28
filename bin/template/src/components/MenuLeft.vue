<template>
  <nav
    data-testid="LeftMenu"
    :class="{ menu: true, menu__collapsed: state.isCollapsed }"
  >
    <div class="menu__top" data-testid="Header-Logotype">
      <div class="logo__cont" data-testid="Header-Logotype-Click">
        <router-link to="/">
          <img
            v-if="state.isCollapsed"
            alt="logo"
            data-testid="Header-Logotype-Image"
            src="@/assets/img/logo-mini.svg"
          />
          <img
            v-else
            alt="logo"
            data-testid="Header-Logotype-Image"
            src="@/assets/img/logo.svg"
          />
        </router-link>
      </div>

      <div
        class="menu__collapse-button center_block"
        @click="globalStore.toggleMenu"
      >
        <YIcon
          :name="state.isCollapsed ? 'chevron-right' : 'chevron-left'"
          :width="16"
        />
      </div>
    </div>

    <ul class="menu__list" data-testid="LeftMenu-List">
      <template
        v-for="(item, inx) in menuItems.filter(
          entity =>
            !entity.accessKey || state.hasAccess(entity.accessKey, 'read')
        )"
        :key="inx"
      >
        <router-link
          v-if="!!item.name"
          active-class="menu__list-item_active"
          :to="{ name: item.name }"
        >
          <li class="menu__list-item" :data-testid="`LeftMenu-List-Item${inx}`">
            <YTooltip
              class="center_block"
              hint-class="menu__list-item__tooltip"
              position="left-center"
              type="white"
              :hint="$tt(item.label)"
              :is-can-show="state.isCollapsed"
            >
              <YIcon
                data-testid="LeftMenu-List-ItemIcon"
                :class="['menu__list-icon']"
                :name="item.icon"
              />
            </YTooltip>

            <span class="text-item" data-testid="LeftMenu-List-ItemText">
              {{ $tt(item.label) }}
            </span>
          </li>
        </router-link>
        <div v-else-if="!state.isCollapsed" class="menu__list-group-label">
          {{ $tt(item.label) }}
        </div>
        <div v-else class="menu__list-group-circle" />
      </template>
    </ul>
  </nav>
</template>

<script setup lang="ts">
interface IMenuLeft {
  activeMenu: string;
}

import { useAuthStore } from '@/stores/auth';
import { computed, reactive } from 'vue';
import { useMenuItems } from '@/extensions/items/use-menu-items';
import { useGlobalStore } from '@/stores/global';
import { $tt } from '@/utils/translate';

const storeAuth = useAuthStore();

const menuItems = useMenuItems;
const globalStore = useGlobalStore();

withDefaults(defineProps<IMenuLeft>(), {
  activeMenu: '/'
});

const state = reactive({
  hasAccess: computed(() => storeAuth.hasRoleAccess),
  isCollapsed: computed(() => globalStore.getCollapsedMenu)
});
</script>

<style scoped>
.logo__cont {
  min-width: 230px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  height: 68px;
}

.menu {
  height: 100vh;
  font-size: 14px;
  position: fixed;
  top: 0;
  width: 230px;
  background-color: var(--white);
  z-index: 11;
  box-shadow: 0 4px 9.8px 0 #0000000d;
  transition: all 0.3s;
}

ul.menu__list {
  display: grid;
  margin: 0;
  padding-inline: 20px;
  gap: 6px;
  width: 230px;
  position: relative;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
}

.menu__list-icon {
  grid-area: a;
  font-size: 14px;
  color: var(--text-black);
  flex-shrink: 0;
}

.menu__list-item_active {
  background-color: var(--blue9);
  position: relative;
  border-radius: 5px;
}

.menu__list-item {
  --active: #77a6ff;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border-radius: 5px;
  padding: 2px 8px;
  z-index: 20;
}

.menu__list-item_active .menu__list-item,
.menu__list-item:hover {
  &::before {
    content: '';
    position: absolute;
    left: 0;
    height: 16px;
    width: 4px;
    border-radius: 5px;
    background-color: var(--active);
  }
}

.menu__list-item span.text-item {
  overflow: hidden;
  color: var(--text-black);
  font-size: 14px;
}

.menu__list-item_active :is(span.text-item, svg.icon-yui-kit),
.menu__list-item:hover span.text-item {
  color: var(--active);
}

.menu__list-item:hover {
  background-color: #f2f7ff;
  & .menu__list-icon {
    color: var(--active);
  }
}

.menu__list-group-label {
  color: #b8b8b8;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
}

.menu__collapse-button {
  position: absolute;
  right: -12px;
  top: 22px;
  width: 24px;
  height: 24px;
  box-shadow: 0 0 22px 0 #00000012;
  border-radius: 50%;
  background-color: var(--white);
  cursor: pointer;
}

.menu__list-group-circle {
  width: 6px;
  margin-block: 7px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--grey7);
}

.menu__collapsed {
  width: 60px;

  & .logo__cont {
    padding-left: 16px;
  }

  & ul.menu__list {
    padding-inline: 4px;
    justify-items: center;
    width: 60px;
  }

  & .menu__list-item_active .menu__list-item,
  & .menu__list-item:hover {
    &::before {
      background-color: transparent;
    }
  }

  .menu__list-item {
    gap: 0;
    width: 44px;
    overflow: hidden;
    padding-inline: 10px;
  }

  .text-item {
    min-width: 142px;
    opacity: 0;
  }
}

.center_block {
  display: inline-flex !important;
}

:global(.menu__list-item__tooltip) {
  margin-left: 18px;
}
</style>
