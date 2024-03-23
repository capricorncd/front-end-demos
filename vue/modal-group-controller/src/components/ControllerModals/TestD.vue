<script setup lang="ts">
import Modal from '../Modal.vue'

import { type UseController } from '../../libs/controller'
import { controllerNames } from './constants'

export interface TestDProps {
  visible?: boolean
  msg?: string
  controller: UseController
}

const props = defineProps<TestDProps>()
</script>

<template>
  <Modal title="Test Modal D" :class="$style.root" :model-value="visible">
    Some text for this modal. {{ msg }}
    <template #footer>
      <button @click="controller.exec(controllerNames.OPEN_TEST_A, 'Show A')">Back</button>
      <button @click="controller.end('Close D')">Close</button>
    </template>
  </Modal>
</template>

<style lang="scss" module>
.root {
  width: 100%;
  padding: 2em;
  background-color: rgb(22 89 175);
  margin: 0.5em 0;
}
</style>
