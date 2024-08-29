<template>
  <div class="top">
    <Navbar/>
    <div class="top__sell">
      <div class="main-container">
        <div class="flex items-center justify-between max-h-[92px] overflow-hidden">
          <h1 class="text-white font-medium text-2xl">Sell CS:GO skins</h1>
          <Image src="/images/sell-bg.png" class="max-w-[300px]" alt="Sell CS:GO skins"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import Navbar from "~/components/molecule/Navbar.vue";
import Image from "~/components/global/Image.vue";
</script>

<style scoped lang="scss">
.top {
  background: linear-gradient(to right bottom, rgba(1, 28, 10, 1) 0%, rgba(46, 88, 195, 1) 80%, rgba(249, 255, 178, 1) 100%);

  &__sell {
    @apply h-[92px] overflow-hidden;
  }
}
</style>