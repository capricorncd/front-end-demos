<script setup lang="ts">
interface ModalProps {
  title: string
}

const props = defineProps<ModalProps>()

defineEmits<{
  change: []
}>()

const model = defineModel<boolean>()
</script>

<template>
  <div :class="$style.root" v-if="model">
    <h2>{{ props.title }}</h2>
    <div :class="$style.body"></div>
    <slot></slot>
    <div :class="$style.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" module>
.root {
  width: 100%;
  padding: 2em;
  background-color: #08d25f;
  margin: 0.5em 0;

  .body {
    margin: 0 1em;
    background-color: #fff;
  }
}
</style>
