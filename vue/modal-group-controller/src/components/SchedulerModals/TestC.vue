<script setup lang="ts">
import Modal from '../Modal.vue'

import { type UseSchedulerController } from '../../libs/scheduler'

export interface TestCProps {
  visible?: boolean
  msg?: string
  scheduler: UseSchedulerController
}

const props = defineProps<TestCProps>()
</script>

<template>
  <Modal title="Test Modal C" :class="$style.root" :model-value="visible">
    Some text for this modal. {{ msg }}
    <template #footer>
      <button @click="scheduler.execute('openTestB', 'Show B')">Back</button>
      <button @click="scheduler.end('Close C')">Close</button>
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
