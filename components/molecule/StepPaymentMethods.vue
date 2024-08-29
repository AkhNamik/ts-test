<template>
  <div class="methods">
    <DropdownSmall
        :items="countries"
        v-model="selectedItem"
    />
    <div class="methods__payment">
      <PaymentsItem
          v-for="(payment, index) in currentPaymentsByCountry"
          :key="index"
          :item="payment"
          :disabled="!items?.length"
          :is-active="(payment === paymentMethod) && items?.length > 0"
          @click="updatePaymentMethod(payment)"
      />
    </div>
    <div class="methods__action">
      <Button
          @click="$emit('next')"
          :disabled="!(paymentMethod && items?.length)"
      >
        <span>Next</span>
        <span><Icon name="next" filled/></span>
      </Button>
    </div>
  </div>
</template>
<script setup lang="ts">

import DropdownSmall from "~/components/atoms/DropdownSmall.vue";
import {useGlobalStore} from '~/stores'
import PaymentsItem from "~/components/atoms/PaymentsItem.vue";
import Button from "~/components/global/Button.vue";
import Icon from "~/components/global/Icon.vue";
import {usePaymentsFlowStore} from "~/stores/paymentFlow";

defineProps({
  items: {
    type: Array,
    default: () => []
  },
})

const countries = useGlobalStore().countries
const {payments} = useGlobalStore().payments
const paymentsStore = usePaymentsFlowStore()


const selectedItem = computed({
  get: () => paymentsStore.country || countries[0],
  set: (value) => paymentsStore.updateState('country', value)
})
const paymentMethod = computed(() => paymentsStore.method)

const currentPaymentsByCountry = ref('')

watch(selectedItem, (newItem) => {
  currentPaymentsByCountry.value = payments[newItem.value]
})

onMounted(() => {
  currentPaymentsByCountry.value = [...payments[selectedItem.value.value]]
})

const updatePaymentMethod = (method: string) => paymentsStore.updateState('method', method)

</script>

<style scoped lang="scss">
.methods {
  @apply flex flex-col gap-4;
  &__payment {
    @apply grid grid-cols-3 gap-1;
  }
}
</style>