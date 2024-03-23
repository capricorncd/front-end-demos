/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/23 15:05:10 (GMT+0900)
 */
/** 浏览器渲染时间间隔 */
const RENDER_TIME_INTERVAL = 16.6

/**
 * 运行耗时任务
 * 需尽快完成任务，并页面不能产生卡顿
 *
 * @param {Function} task
 */
export function runTask(task) {
  return new Promise(function(resolve, reject) {
    try {
      _runTask(task, resolve)
    } catch (err) {
      reject(err)
    }
  })
}

function _runTask(task, resolve) {
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback((deadline) => {
      // 当前渲染帧是否还有剩余时间
      if (deadline.timeRemaining() > 0) {
        task()
        resolve()
      } else {
        _runTask(task, resolve)
      }
    })
  } else {
    const now = Date.now()
    requestAnimationFrame(() => {
      if (Date.now() - now < RENDER_TIME_INTERVAL) {
        task()
        resolve()
      } else {
        _runTask(task, resolve)
      }
    })
  }
}
