<script setup lang="ts">
import Modal from '../Modal.vue'

import { type UseController } from '../../libs/controller'
import { controllerNames } from './constants'

export interface TestBProps {
  visible?: boolean
  msg?: string
  controller: UseController
}

const props = defineProps<TestBProps>()
</script>

<template>
  <Modal title="Test Modal B" :class="$style.root" :model-value="visible">
    Some text for this modal. {{ msg }}
    <template #footer>
      <button @click="controller.exec(controllerNames.OPEN_TEST_A, 'Show A')">Back</button>
      <button @click="controller.exec(controllerNames.OPEN_TEST_C, 'Open TestC')">Open TestC</button>
      <button @click="controller.end('Close B')">Close</button>
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
