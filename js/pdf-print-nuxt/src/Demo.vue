<script setup lang="ts">
import PdfViewer from './PdfViewer.vue';

const viewer = ref()
const pending = ref(false)

const emit = defineEmits<{
  change: []
}>()

const handleClick = () => {
  pending.value = true
  // const pdfUrl = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf'
  const pdfUrl = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
  // const pdfUrl = '/test.pdf'
  viewer.value.open(pdfUrl)
}
</script>

<template>
  <div :class="$style.root">
    <h1>pdf-print-nuxt</h1>
    <button :class="$style.button" :disabled="pending" @click="handleClick">Print PDF</button>
    <PdfViewer ref="viewer" @closed="pending = false" />
  </div>
</template>

<style lang="scss" module>
.root {
  margin-top: 100px;
  text-align: center;
}

.button {
  padding: 20px 50px;
  border: 0;
  border-radius: 8px;
  background-color: coral;
  color: #fff;
  font-size: 1em;
  transition: opacity 0.3s ease;

  &:disabled {
    opacity: 0.3;
    filter: grayscale(1);
  }

  &:not(:disabled) {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

}
</style>
