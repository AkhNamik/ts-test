<template>
  <div class="info-alert">
    <Icon name="alert" filled/>
    <span><slot></slot></span>
  </div>
</template>

<script setup lang="ts">

import Icon from "~/components/global/Icon.vue";
</script>

<style scoped lang="scss">
.info-alert {
  @apply bg-white-10 rounded p-3 flex items-start gap-2 font-sans text-[14px] font-regular leading-4 text-orange-100;
}
</style>