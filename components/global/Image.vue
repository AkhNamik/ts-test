<template>
  <NuxtImg
      :fit="fit"
      :src="src"
      :width="width"
      :height="height"
      :format="format"
      :loading="loading"
      :quality="quality"
      :sizes="sizes"
      :alt="alt"

  />
</template>
<script setup lang="ts">
import {defineProps} from 'vue';

interface IProps {
  src: string;
  alt: string;
  fit?: string;
  width?: string;
  height?: string;
  format?: string;
  loading?: string;
  quality?: string;
  sizes?: string;
}

withDefaults(defineProps<IProps>(), {
  fit: 'contain',
  format: 'png',
  quality: '80',
});

</script>