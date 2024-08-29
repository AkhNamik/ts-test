<template>
  <div class="details-card">
    <div class="details-card__info">
      <InfoAlert>
        The amount may not be the same as shown on your wallet due to differences in exchange rates.<br/><br/>
        It may take up to three business days for the bank to credit your payment. Please wait for the transaction.
      </InfoAlert>
      <DetailAlert :details="collectDetailInfo"/>
    </div>
    <div class="details-card__field">
      <CustomInput v-model="card" label="Your card number" @error="(err) => error = err"/>
    </div>
    <div class="details-card__action">
      <Button
          @click="$emit('next')"
          :disabled="!card || error"
      >
        <span>Next</span>
        <span><Icon name="next" filled/></span>
      </Button>
      <Button @click="$emit('back')" type="back">
        <span><Icon name="back" filled/></span>
        <span>Back</span>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">

import InfoAlert from "~/components/atoms/InfoAlert.vue";
import DetailAlert from "~/components/atoms/DetailAlert.vue";
import Button from "~/components/global/Button.vue";
import Icon from "~/components/global/Icon.vue";
import CustomInput from "~/components/global/CustomInput.vue";
import {usePaymentsFlowStore} from "~/stores/paymentFlow";

const props = defineProps({
  price: {
    type: String,
    default: ''
  }
})
const paymentsStore = usePaymentsFlowStore()

const PERCENT_COMMISSION_CARD = 2

const card = computed({
  get: () => paymentsStore.card,
  set: (value) => paymentsStore.updateState('card', value)
})

const error = ref(false)

const commissionPrice = computed(() => {
  const commission = 1 - (PERCENT_COMMISSION_CARD / 100);
  const priceWithCommission = +props.price * commission
  return priceWithCommission.toFixed(2)
})

const collectDetailInfo = computed(() => {
  return {
    'TRANSACTION COMMISSION': '2%',
    'YOU RECEIVE': '$' + commissionPrice.value
  }
})

</script>

<style scoped lang="scss">
.details-card {
  @apply flex flex-col gap-4;

  &__info {
    @apply flex flex-col gap-2;
  }

  &__action {
    @apply flex flex-col gap-3;
  }
}
</style>