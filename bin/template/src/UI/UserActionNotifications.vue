<template>
  <div
    v-if="state.messages?.length"
    class="main"
    :data-testid="props.dataTestid"
  >
    <div
      v-for="(item, inx) of state.messages"
      :key="inx"
      :data-testid="`UserActionNotifications-Block${item.id}`"
    >
      <div
        class="message-folder-block"
        data-testid="UserActionNotifications-Block-MessageFolder"
      >
        <div class="header" data-testid="UserActionNotifications-Block-Header">
          <div class="data" data-testid="UserActionNotifications-Block-Data">
            <small>
              {{ new Date().toLocaleString('ru-RU') }}
            </small>
          </div>
          <div class="tools" data-testid="UserActionNotifications-Block-Tools">
            <span data-testid="UserActionNotifications-Button-Close">
              <unicon fill="black" name="times" width="18px" />
            </span>
            <span
              @click="reloadPage()"
              data-testid="UserActionNotifications-Button-Reload"
              style="margin-right: 10px"
            >
              <unicon fill="green" name="sync" width="18px" />
            </span>
          </div>
        </div>

        <div class="body" data-testid="UserActionNotifications-Block-Body">
          <p class="tooltip" data-testid="UserActionNotifications-Text-Message">
            {{ item.message }}
            <span class="tooltiptext">{{ item.message }}</span>
          </p>
          <small data-testid="UserActionNotifications-Text-Initiator"
            >Инициатор: {{ item?.login }}</small
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { IDataTestidProp } from '@/utils/types/types';

const router = useRouter();
const state = reactive({
  messages: []
});

const props = defineProps<IDataTestidProp>();

const reloadPage = () => {
  router.go(0);
};
</script>

<style scoped>
.main {
  z-index: 1111111;
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 18%;
}

.message-folder-block {
  border-radius: 4px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  background: white;
  padding: 5px;
  box-shadow: -1px -1px 5px -3px black;
}

.tools > span {
  cursor: pointer;
}

.tools {
  display: flex;
  flex-direction: row-reverse;
}

.body > p {
  margin: 0px;
  padding: 0px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.body {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
</style>
