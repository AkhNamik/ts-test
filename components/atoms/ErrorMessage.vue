<template>
  <Transition name="fade">
    <div v-show="show" class="error-message">
      <p v-if="type.toLowerCase() === 'trc-20'">Enter valid tether trc-20 wallet</p>
      <p v-else-if="type.toLowerCase() === 'erc-20'">Enter valid tether erc-20 wallet</p>
      <p v-else-if="type.toLowerCase() === 'bitcoin'">Enter valid bitcoin wallet</p>
      <p v-else-if="type.toLowerCase() === 'card'">Enter valid card number</p>
      <p v-else>
        <slot></slot>
      </p>
    </div>
  </Transition>
</template>
<script setup lang="ts">
defineProps({
  show: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  type: {
    type: String as PropType<'card' | 'TRC-20' | 'ERC-20'>,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.error-message {
  @apply w-full p-3 rounded bg-red-100 text-white-100 leading-4 text-[14px] transition-all duration-200;
}
</style>