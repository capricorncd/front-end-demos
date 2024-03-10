<script language="ts" setup>
import { useScheduler } from './useScheduler'

const { start, component: ModalGroup } = useScheduler()
</script>

<template>
  <div class="about">
    <h1>This is an useSchedulerController page</h1>
    <button @click="start">Show Modal TestA</button>
    <ModalGroup />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
