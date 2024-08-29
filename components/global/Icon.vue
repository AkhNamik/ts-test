<template>
  <NuxtIcon
      :name="name"
      :filled="filled"
  />
</template>
<script setup lang="ts">
import {defineProps} from 'vue';

interface Props {
  name: string;
  filled?: boolean;
}

defineProps<Props>();
</script>
<style>
.nuxt-icon {
  display: inline-flex;
}

.nuxt-icon svg {
  margin-bottom: 0;
  width: max-content;
  height: max-content;
  display: inline-block;
}
</style>