<template>
  <div class="payment">
    <div class="payment__window">
      <div class="payment__window-countSum">
        <p class="font-mono font-regular text-[14px] leading-4 text-white-80">
          {{ selectedIds?.length ? selectedIds.length : 0 }} items for
        </p>
        <p class="font-mono font-medium text-[48px] leading-10 text-green-100">
          ${{ sumPrices }}
        </p>
      </div>
      <div class="payment__window-delimiter"/>
      <div class="payment__window-steps">
        <div
            class="step"
            :class="[currentStep === 1 ? 'text-orange-100' : 'text-white-60']"
        >
          Payment<br/>Method
        </div>
        <Icon name="next" filled/>
        <div
            class="step"
            :class="[currentStep === 2 ? 'text-orange-100' : 'text-white-60']"
        >
          Payment<br/>Details
        </div>
        <Icon name="next" filled/>
        <div
            class="step"
            :class="[currentStep === 3 ? 'text-orange-100' : 'text-white-60']"
        >
          Confirmation<br/>on steam
        </div>
        <Icon name="next" filled/>
        <div
            class="step"
            :class="[currentStep === 4 ? 'text-orange-100' : 'text-white-60']"
        >
          Payment<br/>Transfer
        </div>
      </div>
    </div>
    <div class="p-3">
      <KeepAlive :key="cashKey">
        <Component
            :is="currentComponent"
            :items="selectedIds"
            :payment-method="paymentMethod"
            :price="sumPrices"
            @next="nextStep"
            @back="previousStep"
        />
      </KeepAlive>
    </div>
  </div>
</template>

<script setup lang="ts">
import StepPaymentMethods from '~/components/molecule/StepPaymentMethods.vue'
import StepPaymentDetailsCard from '~/components/molecule/StepPaymentDetailsCard.vue'
import StepPaymentDetailsCrypto from '~/components/molecule/StepPaymentDetailsCrypto.vue'
import StepPaymentConfirmation from '~/components/molecule/StepPaymentConfirmation.vue'
import StepPaymentTransferError from '~/components/molecule/StepPaymentTransferError.vue'
import StepPaymentTransferSuccess from '~/components/molecule/StepPaymentTransferSuccess.vue'
import {Skin} from "~/types/skin.type";
import Icon from "~/components/global/Icon.vue";
import {usePaymentsFlowStore} from "~/stores/paymentFlow";

interface PaymentProps {
  items: Skin[];
  selectedIds: string[];
}

const props = defineProps<PaymentProps>();
const emit = defineEmits(['current-step'])
const paymentsStore = usePaymentsFlowStore()

const currentStep = computed(() => paymentsStore.currentStep)
const paymentMethod = computed(() => paymentsStore.method)
const cashKey = computed(() => paymentsStore.cashKey)


const componentsMap = {
  1: StepPaymentMethods,
  2: () => ["Bitcoin", "TRC-20", "ERC-20"].includes(paymentMethod.value) ? StepPaymentDetailsCrypto : StepPaymentDetailsCard,
  3: StepPaymentConfirmation,
  4: () => Math.random() > 0.5 ? StepPaymentTransferSuccess : StepPaymentTransferError
}

const currentComponent = computed(() => {
  const component = componentsMap[currentStep.value]
  return typeof component === 'function' ? component() : component
})

const sumPrices = computed(() => {
  let price = 0
  props.items.forEach(item => {
    if (props.selectedIds.includes(item.id)) {
      price += item.price
    }
  })
  return price.toFixed(2)
})

/*
  Methods
 */

const nextStep = () => {
  emit('current-step', currentStep.value + 1)
}

const previousStep = () => {
  if (currentStep.value > 1) {
    emit('current-step', currentStep.value - 1)
  }
}

</script>

<style scoped lang="scss">
.payment {
  @apply bg-card-light rounded w-full;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  &__window {
    @apply p-5 flex flex-col gap-4;
    background: linear-gradient(163.45deg, #223056 4.48%, #0E1526 93.42%);

    &-countSum {
      @apply flex flex-col gap-2;
    }

    &-delimiter {
      @apply h-[1px] bg-white-10;
    }

    &-steps {
      @apply flex items-center flex-nowrap justify-between;
    }
  }

  .step {
    @apply uppercase font-mono font-regular text-[12px] leading-3;
    letter-spacing: .03em;
  }
}
</style>