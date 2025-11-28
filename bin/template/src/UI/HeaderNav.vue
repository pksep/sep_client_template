<template>
  <header class="header" data-testid="Header">
    <div></div>
    <HeaderSearch />
    <div class="header__user-menu" data-testid="Header-UserMenu">
      <button
        data-testid="Header-UserMenu-Message"
        :class="[`header__icon`, { 'header__icon--active': state.open }]"
      >
        <YIcon name="message" />
      </button>
      <div
        class="header__icon notification"
        data-testid="Header-UserMenu-Notification"
      >
        <YIcon name="notification" />
      </div>
      <YUserMenu
        class="header__profile"
        data-testid="Header-UserMenu-Block"
        v-bind="context"
        @click="(val: any) => transitions(val)"
        @language-switch="languageSwitch"
        @unmount-qr-auth="unmountQrAuth"
      />
    </div>
  </header>
</template>
<script setup lang="ts">
import { computed, reactive } from 'vue';
import i18n from '@/langs/config';
import { $tt } from '@/utils/translate';
import HeaderSearch from '@/UI/HeaderSearch.vue';
import { MenuTypeEnum } from '@pksep/yui';

const state = reactive({
  open: false,
  authQrModalOpen: false
});

const context = computed(() => ({
  user: {
    name: 'login',
    role: 'role',
    avatar: '/img/avatar.svg'
  },
  categories: [
    MenuTypeEnum.profile,

    MenuTypeEnum.qrAuth,
    MenuTypeEnum.theme,
    MenuTypeEnum.options,
    MenuTypeEnum.help,
    MenuTypeEnum.exit
  ],
  texts: {
    [MenuTypeEnum.profile]: $tt('userMenu.profile'),
    [MenuTypeEnum.options]: $tt('userMenu.options'),
    [MenuTypeEnum.exit]: $tt('userMenu.exit'),
    [MenuTypeEnum.qrAuth]: $tt('userMenu.qrAuth'),
    [MenuTypeEnum.theme]: $tt('userMenu.theme'),
    [MenuTypeEnum.help]: $tt('userMenu.help')
  },
  languages: {
    items: [
      { label: 'En', value: 'en' },
      { label: 'Ru', value: 'ru' }
    ],
    defaultValue: i18n.global.locale.value
  },
  closeAfterClick: true
}));

const emits = defineEmits(['exit']);
const transitions = (options: string): void => {
  switch (options) {
    case 'profile':
      break;
    case 'options':
      break;
    case 'exit':
      emits('exit');
      break;
  }
};

const languageSwitch = (lang: typeof i18n.global.locale): void => {
  i18n.global.locale.value = lang.value;
  document.documentElement.lang = i18n.global.locale.value;
};

const unmountQrAuth = (): void => {
  state.authQrModalOpen = true;
};
</script>

<style scoped>
.header {
  min-width: 100vw;
  height: 60px;
  padding-block: 10px;
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr repeat(2, 1.3fr);
  align-items: center;
  align-content: center;
  position: fixed;
  top: 0;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.05);
  z-index: 5;
  background-color: var(--white);
}

.logo__text {
  margin-top: 13px;
}

.logo__title {
  font-family: 'Rubic Mono One', serif;
  font-weight: 400;
  font-size: 8.6px;
  line-height: 11px;
  text-transform: uppercase;
  color: #9cbeff;
  display: block;
}

.header__user-menu {
  display: flex;
  justify-self: end;
  align-items: center;
  padding-right: 10px;
  gap: 15px;
}

.header__icon {
  color: var(--grey4);
  &.notification {
    margin-right: 5px;
  }
}

.header__icon:hover,
.header__icon--active {
  color: var(--text-blue);
}

.chat-button__container {
  --size-right-menu: 404px;
  --size-left-menu: 345px;
  --default-width: 90dvw;
  --default-height: 90dvh;
}

.header__chat-modal > :deep(.modal-yui-kit__modal-content) {
  width: 90vw;
}

button {
  all: unset;
  cursor: pointer;
  z-index: 4;
}

@media screen and (width < 768px) {
  .header {
    grid-template-columns: 1fr 1.3fr;
  }
}
</style>
