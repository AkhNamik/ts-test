<template>
  <div
      class="wear"
      :class="classes"
  >
    {{ name }}
  </div>
</template>
<script setup lang="ts">

interface IProps {
  name?: string;
  size?: any[];
}

const props = withDefaults(defineProps<IProps>(), {
  name: 'not painted'
})

const classes = computed(() => {
  const collectionClasses = []

  switch (props.size) {
    default:
      collectionClasses.push('text-3')
  }

  switch (props?.name?.toUpperCase()) {
    case 'FACTORY NEW':
      collectionClasses.push('text-wear-FN')
      break
    case 'MINIMAL WEAR':
      collectionClasses.push('text-wear-MW')
      break
    case 'FIELD-TESTED':
      collectionClasses.push('text-wear-FT')
      break
    case 'WELL-WORN':
      collectionClasses.push('text-wear-WW')
      break
    case 'BATTLE-SCARRED':
      collectionClasses.push('text-wear-BS')
      break
    default:
      collectionClasses.push('text-white-60')
  }

  return collectionClasses.join(' ')
})
</script>

<style scoped lang="scss">
.wear {
  @apply uppercase font-mono font-regular whitespace-nowrap;
}
</style>