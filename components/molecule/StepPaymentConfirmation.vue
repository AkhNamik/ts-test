<template>
  <div class="confirmation">
    <div class="confirmation__info">
      <div class="confirmation__info-timer">
        <PaymentTimer/>
      </div>
      <InfoAlert>
        Example of caution text. For a trade to be safe please check:<br/>
        — Code in the message<br/>
        — Bot name<br/>
        — If you have 2 trades, one active and one canceled and so on...
      </InfoAlert>
      <DetailAlert :details="collectDetailInfo"/>
      <ErrorMessage :show="time <= 0">
        Time is over. Start new trade proccess.
      </ErrorMessage>
    </div>
    <div class="confirmation__info-accept">
      <p class="uppercase text-white-100 font-mono text-[14px] leading-4">Accept trade:</p>
      <Button @click="emit('next')" type="accept" :disabled="time === 0">
        <span>Accept trade</span>
        <Icon name="open" filled/>
      </Button>
    </div>
    <div class="confirmation__info-back">
      <Button @click="goToBackStep" type="back">
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
import PaymentTimer from "~/components/molecule/PaymentTimer.vue";
import {usePaymentsFlowStore} from "~/stores/paymentFlow";
import ErrorMessage from "~/components/atoms/ErrorMessage.vue";

const emit = defineEmits(['back', 'next'])

const paymentsStore = usePaymentsFlowStore()

const time = computed(() => paymentsStore.timer)

const collectDetailInfo = computed(() => {
  return {
    'TRADE CODE': '8WJ8SL',
    'BOT NAME': 'SKINS_SHOP',
    'BOT LEVEL': '0 LEVEL',
    'BOT REGISTRATION DATE': '28.10.2024'
  }
})

const goToBackStep = () => {
  if (time.value <= 0) {
    paymentsStore.clearState()
  }
  emit('back')
}
</script>

<style scoped lang="scss">
.confirmation {
  @apply flex flex-col gap-4 p-3;

  &__info {
    @apply flex flex-col gap-2;

    &-accept {
      @apply flex flex-col gap-2 bg-white-10 rounded p-3;

    }
  }
}


</style>