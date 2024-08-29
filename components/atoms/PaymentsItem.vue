<template>
  <div
      @click="$emit('click')"
      class="payment"
      :class="[isActive ? 'active' : '', disabled ? 'disabled' : '']"
  >
    <Icon
        :name="item.toLowerCase()"
        class="payment__icon"
    />
  </div>
</template>
<script setup lang="ts">
import Icon from "~/components/global/Icon.vue";

interface IProps {
  item: string;
  isActive: boolean;
  disabled: boolean;
}

defineProps<IProps>()
</script>

<style scoped lang="scss">
.payment {
  @apply h-16 flex justify-center items-center border border-white-10 rounded bg-black-20 cursor-pointer;

  &__icon {
    @apply text-white-100;
  }

  &.disabled {
    @apply pointer-events-none;

    &__icon {
      @apply text-white-7;
    }
  }

  &.active {
    @apply border border-accent-100 text-white-100;
    background: linear-gradient(158.21deg, #264BA8 5.62%, #030C23 93.67%);
  }
}
</style>