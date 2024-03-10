<script setup lang="ts">
import { useHome } from './useHome'

const { component: ModalGroup, open } = useHome()
</script>

<template>
  <main>
    <h1>
      This is an <i><b>useActionController</b></i> page
    </h1>
    <button @click="open('TestA')">Show Modal TestA</button>
    <ModalGroup />
  </main>
</template>
