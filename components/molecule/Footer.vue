<template>
  <div class="footer">
    <div class="main-container">
      <div class="flex flex-col gap-8">
        <div class="footer__top">
          <Icon name="logo-text-l" filled/>
        </div>
        <div class="h-[1px] w-full bg-white-10"/>
        <div class="footer__bottom">
          <div class="footer__bottom-copyright">
            <span>
              Copyright © Many.Skins 2024. All Rights Reserved. <br/>
              Powered by Steam. Not affiliated with Valve Corp.
            </span>
          </div>
          <FooterPayments/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import Icon from "~/components/global/Icon.vue";
import FooterPayments from "~/components/molecule/FooterPayments.vue";
</script>
<style scoped lang="scss">
.footer {
  @apply bg-card-default py-8;

  &__top {
    @apply inline-block;
  }

  &__bottom {
    @apply flex justify-between items-center;
  }

  &__bottom-copyright {
    @apply flex flex-col text-white-60 text-[12px] font-regular;
  }
}
</style>