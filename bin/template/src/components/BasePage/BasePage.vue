<template>
  <main class="base-page" :data-testid="props.dataTestid">
    <div class="base-page__content">
      <h3
        v-if="$slots.title"
        class="base-page__title"
        :data-testid="`${props.dataTestid}-Title`"
      >
        <slot name="title" />
      </h3>
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">
import type { IBasePageProps } from './interfaces/interfaces';

const props = withDefaults(defineProps<IBasePageProps>(), {
  dataTestid: 'BasePage'
});

defineOptions({
  name: 'BasePage'
});
</script>

<style scoped>
.base-page {
  width: 100%;
  gap: 15px;
}

.base-page__title {
  padding: 10px 0 15px 0;
  margin: 0;
  font-size: var(--base-page-font-size, 18px);
  font-weight: 400;
  line-height: 100%;
  letter-spacing: 0;
  color: #181818;
}
</style>
