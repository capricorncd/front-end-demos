<script setup lang="ts">
import Modal from './Modal.vue'

interface TestBProps {
  visible?: boolean
  msg?: string
}

const props = defineProps<TestBProps>()

const emit = defineEmits<{
  action: [action: string, params: string]
}>()

const handleClick = (action: string, params: string) => {
  emit('action', action, params)
}
</script>

<template>
  <Modal title="Test Modal B" :class="$style.root" :model-value="visible">
    Some text for this modal. {{ msg }}
    <template #footer>
      <button @click="handleClick('back', 'Show A')">Back</button>
      <button @click="handleClick('show-c', 'Open TestC')">Open TestC</button>
      <button @click="handleClick('close', 'Close B')">Close</button>
    </template>
  </Modal>
</template>

<style lang="scss" module>
.root {
  width: 100%;
  padding: 2em;
  background-color: rgb(208, 14, 133);
  margin: 0.5em 0;
}
</style>
