<template>
  <button
      class="button"
      :class="[size, type, disabled ? 'disabled' : '']"
      @click="emit('click')"
      :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
defineProps({
  size: {
    type: String as PropType<'large' | ''>,
    default: 'large',
  },
  type: {
    type: String as PropType<'back' | 'accent' | 'accept'>,
    default: 'accent',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);
</script>

<style scoped lang="scss">
.button {
  @apply inline-flex justify-center items-center font-mono leading-[22px] uppercase;
  letter-spacing: 0.03em;

  &.large {
    @apply flex justify-center items-center gap-2 rounded py-[21px] px-0 w-full;
  }

  &.back {
    @apply flex justify-center items-center gap-1 rounded max-w-[125px] mx-auto font-medium transition-colors text-white-60;

    &:hover {
      @apply text-white-100;
    }
  }

  &.accent {
    @apply bg-accent-100 text-white-100 font-mono font-medium transition-all;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);

    &:hover {
      @apply bg-accent-hover;
    }

    &.disabled {
      @apply opacity-50 pointer-events-none;
    }
  }

  &.accept {
    @apply flex justify-center items-center gap-2 bg-white-100 p-4 text-accent-100 rounded transition-all;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);

    &.disabled {
      @apply opacity-50 pointer-events-none;
    }

  }
}
</style>