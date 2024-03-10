<script setup lang="ts">
import Modal from './Modal.vue'

export interface TestAProps {
  visible?: boolean
  msg?: string
}

const props = defineProps<TestAProps>()

const emit = defineEmits<{
  action: [action: string, params: string]
}>()

const handleClick = (action: string, params: string) => {
  emit('action', action, params)
}
</script>

<template>
  <Modal title="Test Modal A" :class="$style.root" :model-value="props.visible">
    Some text for this modal. {{ msg }}
    <template #footer>
      <button @click="handleClick('show-b', 'Show B')">Show B</button>
      <button @click="handleClick('show-d', 'Show D')">Show D</button>
      <button @click="handleClick('close', 'Close')">Close</button>
    </template>
  </Modal>
</template>

<style lang="scss" module>
.root {
  width: 100%;
  padding: 2em;
  background-color: #08d25f;
  margin: 0.5em 0;
}
</style>
