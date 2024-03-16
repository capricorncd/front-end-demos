<script language="ts" setup>
import { useController, controllerNames } from '@/components/ControllerModals/useController'

const { controller, component: ModalGroup } = useController()
</script>

<template>
  <main>
    <h1>
      This is an <i><b>useModalsController</b></i> page
    </h1>
    <button @click="controller.exec(controllerNames.OPEN_TEST_A)">Show Modal TestA</button>
    <ModalGroup />
  </main>
</template>
