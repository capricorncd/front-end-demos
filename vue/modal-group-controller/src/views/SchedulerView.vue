<script language="ts" setup>
import { useScheduler } from './useScheduler'

const { scheduler, component: ModalGroup } = useScheduler()
</script>

<template>
  <main>
    <h1>This is an <i><b>useSchedulerController</b></i> page</h1>
    <button @click="scheduler.execute('openTestA')">Show Modal TestA</button>
    <ModalGroup />
  </main>
</template>
