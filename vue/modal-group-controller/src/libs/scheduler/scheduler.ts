/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/10 16:08:20 (GMT+0900)
 */
/**
 * Scheduler Handler
 */
export type SchedulerHandler = (...args: any[]) => void | Promise<void>

export interface Scheduler<N> {
  name: N
  handler: SchedulerHandler
}

export function useSchedulerController<N extends string | number | symbol>() {
  const _schedulerList: Scheduler<N>[] = []

  let _stopHandler: SchedulerHandler | null = null
  let _beforeEachHandler: SchedulerHandler | null = null
  let _afterEachHandler: SchedulerHandler | null = null

  let _index = 0

  const _next = (name: N | null, ...args: any[]) => {
    _beforeEachHandler?.(...args)
    if (name) {
      const index = _schedulerList.findIndex((item) => item.name === name)
      if (index !== -1) _index = index
    }
    const scheduler = _schedulerList[_index]
    if (!scheduler) throw new Error(`${String(name)} scheduler does not exist`)
    scheduler.handler(...args)
    _afterEachHandler?.(...args)
    _index++
  }

  return {
    add(name: N, handler: SchedulerHandler) {
      _schedulerList.push({
        name,
        handler
      })
      return this
    },
    onStop(stopHandler: SchedulerHandler) {
      _stopHandler = stopHandler
      return this
    },
    beforeEach(beforeEachHandler: SchedulerHandler) {
      _beforeEachHandler = beforeEachHandler
      return this
    },
    afterEach(afterEachHandler: SchedulerHandler) {
      _afterEachHandler = afterEachHandler
      return this
    },
    next(name: N | null, ...args: any[]) {
      _next(name, ...args)
    },
    start(...args: any[]) {
      _index = 0
      _next(null, ...args)
    },
    stop(...args: any[]) {
      _index = 0
      _beforeEachHandler?.(...args)
      _stopHandler?.(...args)
      _afterEachHandler?.(...args)
    }
  }
}

/**
 * useSchedulerController's type
 */
export type UseSchedulerController = ReturnType<typeof useSchedulerController>
