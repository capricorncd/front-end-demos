<script setup lang="ts">
import Modal from '../Modal.vue'

import { type UseSchedulerController } from '../../libs/scheduler'

export interface TestBProps {
  visible?: boolean
  msg?: string
  scheduler: UseSchedulerController
}

const props = defineProps<TestBProps>()
</script>

<template>
  <Modal title="Test Modal B" :class="$style.root" :model-value="visible">
    Some text for this modal. {{ msg }}
    <template #footer>
      <button @click="scheduler.next('openTestA', 'Show A')">Back</button>
      <button @click="scheduler.next('openTestC', 'Open TestC')">Open TestC</button>
      <button @click="scheduler.stop('Close B')">Close</button>
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
