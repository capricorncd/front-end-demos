<script setup>
import { ref } from 'vue'
import { useECharts } from './echarts'
import { usePropStyles } from '@prop-styles/vue'

const props = defineProps();

const { style } = usePropStyles(props);

const chartRef = ref(null)
const eCharts = useECharts(chartRef)

function handlerResize({ width, height }) {
  console.log(width, height)
  if (eCharts.chart) {
    eCharts.chart.resize()
  }
}
</script>

<template>
<demo-header title="ResizeObserver" github="https://github.com/capricorncd/front-end-demos/tree/main/vue/resize-observer"></demo-header>
<div>监控元素尺寸变化</div>

<div class="container" :style="style">
  <div v-resize-direct="handlerResize" ref="chartRef"></div>
</div>
</template>

<style scoped>
.container div {
  margin-top: 2em;
  widows: 800px;
  height: 600px;
  resize: both; /* 允许水平和垂直调整大小 */
  overflow: auto; /* 当内容超出容器尺寸时显示滚动条 */
  border: 1px solid #ccc;
}
</style>
