<template>
  <template v-if="state.messages.length">
    <template v-for="(msg, inx) of state.messages" :key="inx">
      <YPushNotification
        :description="msg.message"
        :push-key="inx"
        :style="style(inx)"
        :timeout="state.timeout"
        :title="msg.title"
        :type="getMessageType(msg.type)"
        @close="destroy(msg.id, inx)"
      />
    </template>
  </template>
</template>

<script setup lang="ts">
import { useNotificationsStore } from '@/stores/notifications';
import { computed, reactive, watch, CSSProperties } from 'vue';
import type { IPushNotificationProps } from './interfaces/interfaces';

const notificationsStore = useNotificationsStore();

const props = withDefaults(defineProps<IPushNotificationProps>(), {});

const state = reactive({
  messages: [],
  userActionNotified: computed(() => notificationsStore.getUserActionNotified),
  timeout: computed(() => notificationsStore.getTimeout)
});

const destroy = (id: string): void => {
  notificationsStore.removeUserActionNotified(id);
};

const style = (inx: number): CSSProperties => {
  const headerHeight = props.isNotApp ? 68 : 15;
  const pushNotificationHeight = 75;
  const gap = 5;
  return {
    'max-width': '800px',
    marginTop:
      headerHeight + (inx + 1) * gap + inx * pushNotificationHeight + 'px'
  };
};

const getMessageType = (type: string): string => {
  switch (type) {
    case 'w':
      return 'warning';
    case 'e':
      return 'error';
    case 's':
      return 'success';
    default:
      return 'info';
  }
};

watch(
  () => state.userActionNotified.length,
  () => (state.messages = state.userActionNotified),
  { immediate: true }
);
</script>

<style scoped></style>
