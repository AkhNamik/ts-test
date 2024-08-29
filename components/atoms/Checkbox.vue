<template>
  <div
      class="checkbox"
      :class="[isActive ? 'border-green-100' : 'border-white-20']"
  >
    <Icon
        v-show="isActive"
        name="check"
        filled
    />
  </div>
</template>
<script setup lang="ts">
import Icon from "~/components/global/Icon.vue";

defineProps({
  isActive: Boolean
})
</script>

<style lang="scss" scoped>
.checkbox {
  @apply w-5 h-5 max-w-5 max-h-5 rounded border transition duration-200 flex justify-center items-center;
}
</style>