<template>
  <div class="transfer-error">
    <div class="transfer-error__content">
      <Icon name="error" filled/>
      <h2>Transfer error</h2>
      <h3>Please contact our support team to go through the issue</h3>
    </div>
    <div class="transfer-error__action">
      <Button @click="paymentsStore.clearState()">
        <span>Contact support</span>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">

import Icon from "~/components/global/Icon.vue";
import Button from "~/components/global/Button.vue";
import {usePaymentsFlowStore} from "~/stores/paymentFlow";

const paymentsStore = usePaymentsFlowStore()

</script>

<style scoped lang="scss">
.transfer-error {
  @apply flex flex-col gap-4 p-3;

  &__content {
    @apply flex flex-col items-center text-center gap-4 py-4;

    h2 {
      @apply text-white-100 font-medium text-[24px] leading-6;
    }

    h3 {
      @apply text-white-80 leading-4 text-[14px] font-regular;
    }
  }
}
</style>