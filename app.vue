<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script async setup lang="ts">
import {useGlobalStore} from '~/stores'

const globalStore = useGlobalStore()
await globalStore.getPayments()

</script>