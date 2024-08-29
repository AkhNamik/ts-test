<template>
  <div class="detail-alert">
    <div
        class="detail-alert__infoLine"
        v-for="(value, key) in details"
        :key="key"
    >
      <span class="detail-alert__infoLine-title">
        {{ key }}
      </span>
      <div class="detail-alert__infoLine-dots"/>
      <span class="detail-alert__infoLine-value">
        {{ value }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  details: {
    type: Object as PropType<object | null>,
    default: null
  }
})
</script>

<style scoped lang="scss">
.detail-alert {
  @apply flex flex-col gap-3 bg-white-10 rounded p-3 font-mono text-[12px] font-regular;

  &__infoLine {
    @apply flex items-end gap-2 justify-between uppercase;

    &-title {
      @apply text-white-100 whitespace-nowrap;
    }

    &-dots {
      @apply border-2 border-white-20 border-dotted w-full;
    }

    &-value {
      @apply text-green-100 whitespace-nowrap;
    }
  }
}
</style>