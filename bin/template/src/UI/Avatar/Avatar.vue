<template>
  <YAvatar
    alt="avatar"
    class="avatar"
    default-image="/img/avatar.svg"
    :style="{ '--size-avatar': props.width ? props.width + 'px' : '35px' }"
    :url="image"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { IAvatarProps } from './interface';
import useFile from '@/extensions/file/use-file';

const { getLoadFile } = useFile();

const image = ref<string | null>(null);

const props = withDefaults(defineProps<IAvatarProps>(), {
  width: 35,
  editable: false
});

watch(
  () => props.src,
  async () => {
    if (props.editable) {
      image.value = props.src;
      return;
    }
    if (props.src) {
      const res = await getLoadFile(props.src);
      image.value = res.url;
    } else {
      image.value = null;
    }
  },
  { immediate: true }
);
</script>
