<template>
  <div class="wrapper" data-testid="NotFound-wrapper">
    <div class="inner" data-testid="NotFound-inner">
      <img
        style="
          display: block;
          max-width: 100%;
          object-fit: contain;
          margin-bottom: 57px;
        "
        src="@/assets/img/404-bg.svg"
        alt="404 not found"
        data-testid="NotFound-image"
      />
      <div class="button-notfound">
        <YButton @click="goBack">
          <template #left-icon>
            <YIcon width="20" height="20" name="arrowLeft" />
          </template>
          Вернуться
        </YButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const goBack = () => {
  if (route.name === 'not-found') {
    router.go(-2);
  } else {
    router.go(-1);
  }
};
</script>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100000;
  scroll-y: auto;
  top: 0;
  left: 0;
  background-color: #ffffff;
}

.inner {
  display: grid;
  gap: 20px;
  grid-template-rows: 80vh 20%;
}

.inner img {
  max-height: 80vh;
  margin: 0 auto;
}

.button-notfound {
  justify-self: center;
}

.text {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 9px;
  font-family: 'UniversLTCYR-55Roman', sans-serif;
  font-size: 25px;
}

.text img {
  width: 25px;
  height: 25px;
  object-fit: contain;
  margin-top: 4px;
}
</style>
