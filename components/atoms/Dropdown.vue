<template>
  <div
      class="dropdown"
      :class="[isOpen ? 'bg-card-default' :'bg-black-20']"
      v-click-outside="closeDropdown"
  >
    <button class="dropdown__toggle" @click="toggleDropdown">
      <span class="inline-flex items-center gap-0.5">
        <Icon :name="visibleIcon"/>
        {{ selectedItem ? selectedItem.label : 'Selected option' }}
      </span>
      <Icon
          name="dropdown"
          filled
          class="transition-all duration-200"
          :class="[isOpen ? 'rotate-180': 'rotate-0']"
      />
    </button>
    <div v-if="isOpen" class="dropdown__menu">
      <ul>
        <li
            v-for="item in items"
            :key="item.value"
            @click="selectItem(item)"
        >
          <Icon :name="item.icon"/>
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import Icon from "~/components/global/Icon.vue";

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectedItem = ref(props.modelValue);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
}

const closeDropdown = () => {
  if (isOpen.value) isOpen.value = false;
}

const selectItem = (item) => {
  selectedItem.value = item;
  isOpen.value = false;
  emit('update:modelValue', item);
}

const visibleIcon = computed(() => selectedItem.value?.value === 1 ? 'sort-up' : 'sort-down')
</script>

<style lang="scss" scoped>
.dropdown {
  @apply relative inline-block border border-white-10 rounded h-12 min-w-[240px] transition-all;
  &:hover {
    @apply bg-card-default;
  }

  &__toggle {
    @apply px-3 h-full w-full text-white-100 font-mono text-[14px] flex items-center justify-between gap-2;
  }

  &__menu {
    @apply absolute z-50 top-full left-0 right-0 bg-card-default border border-white-20 rounded;

    & li {
      @apply p-3 flex items-center gap-2 text-white-100 cursor-pointer transition-all hover:bg-white-7;
    }
  }
}
</style>
