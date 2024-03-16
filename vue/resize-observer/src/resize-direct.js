/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/15 21:19:41 (GMT+0900)
 */
// Map的Key可为对象。使用Map可能造成内存泄漏
/** WeakMap */
const map = new WeakMap()

/** ResizeObserver */
const ro = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const handler = map.get(entry.target)
    if (handler) {
      const { inlineSize, blockSize } = entry.borderBoxSize[0]
      handler({ width: inlineSize, height: blockSize })
    }
  }
})

/** Vue Direct */
export default {
  /**
   * Vue Mounted
   *
   * @param {*} el
   * @param {Ref<callback>} bindings
   */
  mounted(el, bindings) {
    map.set(el, bindings.value)
    ro.observe(el)
  },
  unmounted(el) {
    ro.unobserve(el)
    if (map.has(el)) map.delete(el)
  }
}
