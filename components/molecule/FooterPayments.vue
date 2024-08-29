<template>
  <div class="flex items-center flex-nowrap gap-5">
    <Icon
        v-for="(icon, index) in paymentsIcons"
        :key="index"
        :name="icon"
        filled
    />
  </div>
</template>
<script setup lang="ts">
import Icon from "~/components/global/Icon.vue";

const paymentsIcons = [
  'mastercard',
  'visa',
  'sepa',
  'skrill',
  'bitcoin-color',
  'tether',
  'ethereum-second'
]
</script>