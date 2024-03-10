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
  <Modal title="Test Modal C" :class="$style.root" :model-value="visible">
    Some text for this modal. {{ msg }}
    <template #footer>
      <button @click="handleClick('back', 'Show B')">Back</button>
      <button @click="handleClick('close', 'Close C')">Close</button>
    </template>
  </Modal>
</template>

<style lang="scss" module>
.root {
  width: 100%;
  padding: 2em;
  background-color: rgb(230, 88, 246);
  margin: 0.5em 0;
}
</style>
