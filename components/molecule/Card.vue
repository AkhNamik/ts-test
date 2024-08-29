<template>
  <div class="card"
       :class="[selected ? 'border-green-100' : 'border-transparent']"
       @click="$emit('click')"
  >
    <div class="card__top">
      <div class="absolute top-2 right-1.5">
        <Checkbox :is-active="selected"/>
      </div>
      <div class="card__top-images">
        <Image :src="src" :alt="title" height="112" fit="contain"/>
      </div>
    </div>
    <div class="card__bottom">
      <h3 class="card__bottom-title">
        {{ title }}
      </h3>
      <Wear :name="wear"/>
      <div class="flex flex-col gap-1 font-mono">
        <span class="uppercase text-3 font-regular leading-3 text-white-80">
          we pay
        </span>
        <span class="font-medium text-[20px] text-green-100 leading-7">
         ${{ price }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import Image from "~/components/global/Image.vue";
import Checkbox from "~/components/atoms/Checkbox.vue";
import Wear from "~/components/atoms/Wear.vue";

interface CardProps {
  src?: string;
  title?: string;
  wear?: string;
  price?: number;
  selected?: boolean;
}

withDefaults(defineProps<CardProps>(), {
  src: '/market_images/156743_s.png',
  title: 'Desert Eagle | Mecha Industries',
  wear: 'Factory New',
  price: 124.56,
  selected: false
})

defineEmits(["click"])

</script>


<style scoped lang="scss">
.card {
  @apply relative bg-card-light cursor-pointer rounded-[4px] max-w-[218px] flex flex-col border;

  &:hover {
    background: linear-gradient(135deg, rgba(29, 53, 112, 1), rgba(17, 3, 32, 1));
  }

  &__top {
    @apply py-3 px-3;

    &-images {
      @apply w-[179px] max-h-[112px] min-h-[112px] flex justify-center items-center;
      background-image: url("/images/card-bg.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: top center;
    }
  }

  &__bottom {
    @apply px-3 pb-4 flex flex-col gap-3 h-full;

    &-title {
      @apply text-[14px] text-white-100 font-medium uppercase flex-grow;
    }
  }
}
</style>