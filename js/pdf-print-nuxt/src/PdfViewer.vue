<script setup lang="ts">
const emit = defineEmits<{
  closed: []
}>()

const iframe = ref<HTMLIFrameElement>()
const url = ref('/web?file=')
const visible = ref(false)

const open = async (pdfUrl: string) => {
  const res = await fetch(pdfUrl)
  if (res.ok) {
    const buffer = await res.arrayBuffer()
    const _url = URL.createObjectURL(new Blob([buffer], { type: 'application/pdf'}))
    url.value = `/web?file=${_url}`
  } else {
    throw new Error(await res.text())
  }
  visible.value = true

  // setTimeout(() => {
  //   const doc = iframe.value?.contentDocument as Document
  //   const printButton = doc.querySelector('#printButton') as HTMLElement
  //   if (printButton) printButton.click()
  // }, 500)
}

// 暴露 open 方法给父组件
defineExpose({ open })

onMounted(() => {
  const channel = new BroadcastChannel('pdf-viewer')

  channel.addEventListener('message', (e) => {
    console.log('message', e.data)
    const { type} = e.data
    if (type === 'afterprint') {
      visible.value = false
      emit('closed')
    }
    if (type === 'pages-loaded' && visible.value) {
      const doc = iframe.value?.contentDocument as Document
      const printButton = doc.querySelector('#printButton') as HTMLElement
      if (printButton) printButton.click()
    }
  })
})

const webviewerloaded = () => {
  console.log('webviewerloaded')
}
</script>

<template>
  <iframe ref="iframe" v-show="visible" :src="url" :class="$style.root" @webviewerloaded="webviewerloaded" />
</template>

<style lang="scss" module>
.root {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 0;
  opacity: 0;
}
</style>
