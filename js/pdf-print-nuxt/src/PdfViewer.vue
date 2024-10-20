<script setup lang="ts">
export interface ErrorDetail {
  file: string;
  id: string;
  message: string;
}

export interface PdfViewerMethods {
  open: (pdfUrl: string) => Promise<void>;
  close: () => Promise<void>;
}

const emit = defineEmits<{
  closed: [],
  error: [err: ErrorDetail]
}>()

const channel = shallowRef<BroadcastChannel>()
const iframe = shallowRef<HTMLIFrameElement>()
const url = ref('/web?file=&id=')
const id = ref('')
const visible = ref(false)

const open: PdfViewerMethods['open'] = async (pdfUrl: string) => {
  try {
    const res = await fetch(pdfUrl)
    if (res.ok) {
      const buffer = await res.arrayBuffer()
      const _url = URL.createObjectURL(new Blob([buffer], { type: 'application/pdf'}))
      id.value = Date.now().toString() + '_' + Math.random().toString(36).substring(2, 15)
      url.value = `/web?file=${_url}&id=${id.value}`
      visible.value = true
    } else {
      const message = await res.text()
      throw new Error(message)
    }
  } catch (err) {
    emit('error', {
      file: pdfUrl,
      id: id.value,
      message: String(err),
    })
  }
}

const close: PdfViewerMethods['close'] = async () => {
  visible.value = false
  emit('closed')
}

// 暴露 open 方法给父组件
defineExpose({ open, close })

onMounted(() => {
  channel.value = new BroadcastChannel('pdf-viewer')

  channel.value.addEventListener('message', (e) => {
    console.log('message', e.data)
    const { type, id: _id } = e.data
    if (type === 'afterprint' && _id === id.value) {
      close()
    }
    if (type === 'pages-loaded' && visible.value && _id === id.value) {
      const doc = iframe.value?.contentDocument as Document
      const printButton = doc.querySelector('#printButton') as HTMLElement
      if (printButton) printButton.click()
    }
  })
})

onUnmounted(() => {
  channel.value?.close()
})
</script>

<template>
  <iframe ref="iframe" v-show="visible" :src="url" :class="$style.root" />
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
