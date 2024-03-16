import * as echarts from 'echarts'
import { onMounted, shallowRef, onUnmounted } from 'vue'

/**
 * useECharts
 *
 * @param {Ref<HTMLElement>} elRef
 */
export function useECharts(elRef) {
  const eCharts = shallowRef(null)

  onMounted(() => {
    eCharts.value = echarts.init(elRef.value)
    // 绘制图表
    eCharts.value.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
  })

  onUnmounted(() => {
    eCharts.value?.destroy()
  })

  return {
    get chart() {
      return eCharts.value
    }
  }
}
