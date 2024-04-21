<script setup lang="ts">
import { usePropStyles } from '@prop-styles/vue'
import { initFormProvider } from './provider'
import type { FormProps } from './types'

const props = defineProps<FormProps>()

initFormProvider(props)

const { style } = usePropStyles(props)

const emit = defineEmits<{
  change: []
}>()
</script>

<template>
  <div :class="$style.root" :style="style">
    <slot />
  </div>
</template>

<style lang="scss" module>
.root {
  display: grid;
  gap: 10px;
}
</style>
