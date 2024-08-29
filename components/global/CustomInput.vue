<template>
  <div class="input-container">
    <label :class="{ active: isFocused || localValue }" class="input-label">
      {{ label }}
    </label>
    <input
        type="text"
        v-model="localValue"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @input="formatInput"
        :class="{ 'input-error': hasError}"
    />
    <ErrorMessage
        class="mt-4"
        :show="hasError"
        :type="methodPayment"
    />
  </div>
</template>

<script setup lang="ts">
import ErrorMessage from "~/components/atoms/ErrorMessage.vue";

const props = defineProps({
  modelValue: {
    type: String as PropType<string>,
    required: true,
  },
  label: {
    type: String as PropType<string>,
    default: ''
  },
  methodPayment: {
    type: String as PropType<'card' | 'TRC-20' | 'ERC-20' | 'Bitcoin'>,
    default: 'card'
  }
});

const emit = defineEmits(['update:modelValue', 'error']);

const localValue = ref(props.modelValue);
const hasError = ref(false);
const isFocused = ref(false);

const formatInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\s+/g, '');
  if (props.methodPayment.toLowerCase() === 'card') {
    value = value.match(/.{1,4}/g)?.join(' ') || '';
  }
  input.value = value;
  localValue.value = value;
  validate();
};

const validate = () => {
  let regex;
  switch (props.methodPayment.toLowerCase()) {
    case 'erc-20':
      regex = /^0x[a-fA-F0-9]{40}$/;
      break;
    case 'trc-20':
      regex = /^T[a-zA-Z0-9]{33}$/;
      break;
    case 'bitcoin':
      regex = /^(1[A-Za-z0-9]{26,34}|3[A-Za-z0-9]{26,34}|bc1[a-zA-Z0-9]{39,59})$/
      break;
    case 'card':
    default:
      regex = /^[0-9]{16}$/;
      break;
  }
  const valueToValidate = typeof localValue.value === 'string' ? localValue.value.replace(/\s+/g, '') : '';
  hasError.value = !regex.test(valueToValidate);
  emit('update:modelValue', localValue.value);
  emit('error', hasError.value);
};

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue;
});

onActivated(() => {
  if (localValue.value) validate()
})
</script>

<style lang="scss" scoped>
.input-container {
  @apply relative w-full;

  input {
    @apply w-full outline-none font-mono font-regular bg-black-20 border border-white-10 rounded p-3;
  }

  .input-label {
    @apply uppercase absolute top-4 left-3 text-white-80 text-[12px] pointer-events-none transition-all;
  }

  .input-label.active {
    @apply top-1 left-3 text-[10px];
  }

  .input-error {
    @apply border border-red-100;
  }
}
</style>
