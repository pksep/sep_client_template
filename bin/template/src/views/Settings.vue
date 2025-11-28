<template>
  <BasePage>
    <template #title> Настройки </template>

    <template #default>
      <div class="settings-block" data-testid="SettingsPage">
        <router-link
          :to="{ name: 'main' }"
          data-testid="SettingsPage-Link-Emploee"
        >
          <Card class="setting-card" data-testid="SettingsPage-Card-Staff">
            <template #default>На главную</template>
          </Card>
        </router-link>
      </div>
    </template>
  </BasePage>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Card } from '@pksep/yui';
import BasePage from '@/components/BasePage/BasePage.vue';

const authStore = useAuthStore();
const state = reactive({
  blackTheme: false,
  loader: true,
  hasRoleAcess: computed(() => authStore.hasRoleAccess)
});

onMounted(() => {
  state.loader = false;
});
</script>

<style scoped>
.settings-block {
  display: flex;
  flex-wrap: wrap;
  gap: 15px 20px;
  padding-right: 70px;
}
.settings-block > * {
  flex: 1 1 19%;
  max-width: calc(20% - (20px * 4 / 5));
  min-width: 250px;
}
.setting-card {
  --font-size: 16px;
  width: 100%;
  margin: 0;
  min-height: 110px;
  text-align: center;
}
</style>
