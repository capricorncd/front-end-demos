<script setup lang="ts">
import Modal from '../Modal.vue'
import { type UseController } from '../../libs/controller'
import { controllerNames } from './constants'

export interface TestAProps {
  visible?: boolean
  msg?: string
  controller: UseController
}

const props = defineProps<TestAProps>()
</script>

<template>
  <Modal title="Test Modal A" :class="$style.root" :model-value="props.visible">
    Some text for this modal. {{ msg }}
    <template #footer>
      <button @click="controller.exec(controllerNames.OPEN_TEST_B, 'Show B')">Show B</button>
      <button @click="controller.exec(controllerNames.OPEN_TEST_D, 'Show D')">Show D</button>
      <button @click="controller.end()">Close</button>
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
