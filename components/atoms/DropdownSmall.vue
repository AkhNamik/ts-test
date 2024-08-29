<template>
  <div class="dropdown-small">
    <button class="dropdown-small__toggle" @click="toggleDropdown">
      <Icon :name="modelValue.icon" filled/>
      <span
          class="font-mono font-normal text-[12px]"
          :class="[isOpen ? 'text-white-100' : 'text-white-80']"
      >
        {{ modelValue.label }}
      </span>
      <Icon
          name="dropdown"
          filled
          class="transition-all duration-200"
          :class="[isOpen ? 'rotate-180': 'rotate-0']"
      />
    </button>
    <div
        v-if="isOpen"
        class="dropdown-small__menu"
        v-click-outside="closeDropdown"
    >
      <ul>
        <li
            v-for="item in items"
            :key="item.value"
            @click="selectItem(item)"
        >
          <Icon :name="item.icon" filled/>
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
}

const closeDropdown = () => {
  if (isOpen.value) isOpen.value = false;
}

const selectItem = (item) => {
  isOpen.value = false;
  emit('update:modelValue', item);
}
</script>

<style scoped lang="scss">
.dropdown-small {
  @apply font-mono font-medium block relative;

  &__toggle {
    @apply inline-flex items-center gap-1.5 transition-all;
  }

  &__menu {
    @apply absolute z-50 top-full left-0 w-full mt-1 bg-card-default py-3 px-1 border border-white-20 rounded;

    & li {
      @apply flex items-center gap-2 px-3 text-[12px] h-7 leading-3 transition-all hover:bg-white-7 hover:text-accent-light-100 cursor-pointer;
    }
  }
}
</style>