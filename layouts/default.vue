<template>
  <div class="wrapper">
    <header id="header">
      <Top/>
    </header>
    <div class="flex flex-col gap-20">
      <main id="main">
        <slot/>
      </main>
      <footer id="footer">
        <Footer/>
      </footer>
    </div>
  </div>
</template>
<style scoped>

</style>
<script setup lang="ts">
import Top from "~/components/molecule/Top.vue";
import Footer from "~/components/molecule/Footer.vue";
</script>