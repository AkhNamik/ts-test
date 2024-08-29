<template>
  <div class="timer">
    <span class="text-[36px] leading-10 font-medium text-accent-light-100">
      {{ formattedTime }}
    </span>
    <span class="text-[14px] leading-4 font-regular text-white-80">
      You have 6 mins to accept trade, otherwise it will be canceled.
    </span>
  </div>
</template>

<script setup lang="ts">

import {usePaymentsFlowStore} from "~/stores/paymentFlow";

const paymentStore = usePaymentsFlowStore();
const timer = ref(null)

const time = computed({
  get: () => paymentStore.timer,
  set: (value) => paymentStore.updateState('timer', value)
})

const formattedTime = computed(() => formatTime(time.value));

const formatTime = (totalSeconds) => {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const initTimer = () => {
  timer.value = setInterval(() => {
    if (time.value > 0) {
      time.value--;
    } else {
      time.value = 0
      clearInterval(timer.value);
    }
  }, 1000);
}

onActivated(() => {
  if (timer.value) {
    clearInterval(timer.value);
    initTimer()
  } else {
    initTimer()
  }
})

onBeforeUnmount(() => {
  clearInterval(timer.value);
})
</script>

<style scoped>
.timer {
  @apply border border-accent-light-100 flex flex-col gap-1 rounded p-3;
}
</style>
