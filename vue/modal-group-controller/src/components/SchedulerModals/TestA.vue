<script setup lang="ts">
import Modal from '../Modal.vue'
import { type UseSchedulerController } from '../../libs/scheduler'

export interface TestAProps {
  visible?: boolean
  msg?: string
  scheduler: UseSchedulerController
}

const props = defineProps<TestAProps>()
</script>

<template>
  <Modal title="Test Modal A" :class="$style.root" :model-value="props.visible">
    Some text for this modal. {{ msg }}
    <template #footer>
      <button @click="scheduler.next('openTestB', 'Show B')">Show B</button>
      <button @click="scheduler.next('openTestD', 'Show D')">Show D</button>
      <button @click="scheduler.stop()">Close</button>
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
