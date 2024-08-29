<template>
  <section>
    <div class="main-container">
      <div class="sell">
        <div class="flex flex-col gap-4"
             :class="[isDisabledItems ? 'disabled' : '']"
        >
          <div class="sell__filters">
            <Dropdown :items="sortConstants" v-model="sort"/>
          </div>
          <Transition name="fade">
            <div class="sell__items" v-if="skins?.length">
              <Card
                  v-for="skin in filteredItems"
                  :key="skin.id"
                  :src="skin.image"
                  :title="skin.name"
                  :wear="skin?.exterior?.title"
                  :price="skin.price"
                  :selected="selectedIdSkins.includes(skin.id)"
                  @click="toggleSkinId(skin)"
              />
            </div>
          </Transition>
        </div>
        <div class="sell__payments text-white">
          <PaymentFlow
              :items="skins"
              :selectedIds="selectedIdSkins"
              @current-step="updateAccessChoice"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script async setup lang="ts">
import Card from "~/components/molecule/Card.vue";
import {ApiResponse, Skin} from "~/types/skin.type";
import Dropdown from "~/components/atoms/Dropdown.vue";
import PaymentFlow from "~/components/organizm/PaymentFlow.vue";
import {usePaymentsFlowStore} from "~/stores/paymentFlow";

const paymentStore = usePaymentsFlowStore()

const sortConstants = [
  {label: 'Price', icon: 'sort-up', value: 1},
  {label: 'Price', icon: 'sort-down', value: -1}
]
const skins = ref<Skin[]>([])
const sort = ref<null | object>(null);

const selectedIdSkins = computed({
  get: () => paymentStore.selectedItemIds
})
const isDisabledItems = computed(() => paymentStore.currentStep > 1)

const {data} = await useFetch<ApiResponse>('/api/skins')

skins.value = [...data.value.data]

const filteredItems = computed(() => {
  if (sort.value?.value === 1) {
    return [...skins.value].sort((a, b) => a.price - b.price);
  } else if (sort.value?.value === -1) {
    return [...skins.value].sort((a, b) => b.price - a.price);
  } else {
    return skins.value;
  }
})

onMounted(async () => {
  await paymentStore.init()
})


/*
  Methods
*/
const toggleSkinId = (item) => {
  if (selectedIdSkins.value.includes(item.id)) {
    removeSkinId(item.id)
  } else {
    addSkinId(item.id)
  }
  paymentStore.updateState('selectedItemIds', selectedIdSkins.value)
}

const addSkinId = (id: string) => {
  if (id) {
    selectedIdSkins.value.push(id)
  }
}

const removeSkinId = (id: string) => {
  const index = selectedIdSkins.value.findIndex(item => item === id)
  if (index !== -1) {
    selectedIdSkins.value.splice(index, 1)
  }
}

const updateAccessChoice = (step: number) => {
  paymentStore.updateState('currentStep', step)
}
</script>

<style scoped lang="scss">
.sell {
  @apply flex flex-col items-center lg:flex-row lg:items-start gap-4;

  & .disabled {
    @apply pointer-events-none opacity-50;
  }

  &__filters {
    @apply flex justify-end rounded py-2 px-3 bg-card-light;
    box-shadow: 0 4px 8px 0 var(--black-20);
  }

  &__items {
    @apply grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-1;
  }

  &__payments {
    @apply w-full max-w-[400px];
  }

}
</style>