<script setup lang="ts">
import {usePropStyles} from '@prop-styles/vue'
import { useFormProvider } from './provider'
import type {FormItemProps} from './types'

const props = defineProps<FormItemProps>()
const {style} = usePropStyles(props)

const provider = useFormProvider()

const emit = defineEmits<{
  change: []
}>()
</script>

<template>
  <div :class="$style.root" :style="style">
    <slot />
    {{ size ?? provider.size }}
  </div>
</template>

<style lang="scss" module>
.root {
  display: grid;
}
</style>
