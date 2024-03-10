<script setup lang="ts">
import Modal from '../Modal.vue'

import { type UseSchedulerController } from '../../libs/scheduler'

export interface TestDProps {
  visible?: boolean
  msg?: string
  scheduler: UseSchedulerController
}

const props = defineProps<TestDProps>()
</script>

<template>
  <Modal title="Test Modal D" :class="$style.root" :model-value="visible">
    Some text for this modal. {{ msg }}
    <template #footer>
      <button @click="scheduler.execute('openTestA', 'Show A')">Back</button>
      <button @click="scheduler.end('Close D')">Close</button>
    </template>
  </Modal>
</template>

<style lang="scss" module>
.root {
  width: 100%;
  padding: 2em;
  background-color: rgb(22, 89, 175);
  margin: 0.5em 0;
}
</style>
