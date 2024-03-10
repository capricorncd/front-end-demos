<script setup lang="ts">
import { useHome } from './useHome'

const { component: ModalGroup, open } = useHome()
</script>

<template>
  <main>
    <button @click="open('TestA')">Show Modal TestA</button>
    <ModalGroup />
  </main>
</template>
