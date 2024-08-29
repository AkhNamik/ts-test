<template>
  <div class="details-crypto">
    <div class="details-crypto__info">
      <DetailAlert :details="collectDetailInfo"/>
    </div>
    <div class="details-crypto__field">
      <CustomInput
          v-model="token"
          :label="`Your ${paymentMethod === 'Bitcoin' ? '' : 'tether'} ${paymentMethod} wallet`"
          :methodPayment="paymentMethod"
          @error="(err) => error = err"
      />
    </div>
    <div class="details-crypto__action">
      <Button
          @click="$emit('next')"
          :disabled="!token || error"
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

import DetailAlert from "~/components/atoms/DetailAlert.vue";
import Button from "~/components/global/Button.vue";
import Icon from "~/components/global/Icon.vue";
import CustomInput from "~/components/global/CustomInput.vue";
import {usePaymentsFlowStore} from "~/stores/paymentFlow";

const props = defineProps({
  price: {
    type: String as PropType<string>,
    default: ''
  },
  paymentMethod: {
    type: String as PropType<string>,
    default: 'card'
  }
})

const paymentsStore = usePaymentsFlowStore()


const PERCENT_COMMISSION_CARD = 2
const PERCENT_COMMISSION_CRYPTO = 3
const PRICE_BTC = 50000

const token = computed({
  get: () => paymentsStore.token,
  set: (value) => paymentsStore.updateState('token', value)
})
const error = ref(false)

const commissionPrice = computed(() => {
  const commission = 1 - (PERCENT_COMMISSION_CARD / 100);
  const priceWithCommission = +props.price * commission
  return priceWithCommission.toFixed(2)
})

const commissionCrypto = computed(() => {
  if (props.paymentMethod.toLowerCase() === 'bitcoin') {
    const commission = 1 - (PERCENT_COMMISSION_CRYPTO / 100);
    const priceWithCommission = +props.price * commission
    return (priceWithCommission / PRICE_BTC).toFixed(10)
  } else {
    const commission = 1 - (PERCENT_COMMISSION_CRYPTO / 100);
    const priceWithCommission = +props.price * commission
    return priceWithCommission.toFixed(2)
  }
})

const collectDetailInfo = computed(() => {
  return {
    'TRANSACTION COMMISSION': '2%',
    'YOU RECEIVE': '$' + commissionPrice.value,
    'CRYPTO AMOUNT': commissionCrypto.value + (props.paymentMethod.toLowerCase() === 'bitcoin' ? ' BTC' : ' USDT')
  }
})

</script>

<style scoped lang="scss">
.details-crypto {
  @apply flex flex-col gap-4;

  &__action {
    @apply flex flex-col gap-3;
  }
}
</style>