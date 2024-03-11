/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/10 16:08:20 (GMT+0900)
 */
/**
 * @type Scheduler Handler
 */
export type SchedulerHandler = (...args: any[]) => void | Promise<void>

/**
 * Scheduler Controller
 *
 * @returns UseSchedulerController
 */
export function useSchedulerController<N extends string | number | symbol>() {
  const _schedulers: Record<N, SchedulerHandler> = {} as Record<N, SchedulerHandler>

  let _endHandler: SchedulerHandler | null = null
  let _beforeEachHandler: SchedulerHandler | null = null
  let _afterEachHandler: SchedulerHandler | null = null

  return {
    /**
     * Add a scheduler handler named `name`
     *
     * @param name scheduler name
     * @param handler SchedulerHandler
     * @returns UseSchedulerController
     */
    add(name: N, handler: SchedulerHandler) {
      if (_schedulers[name]) {
        throw new Error(`A ${String(name)} named scheduler handler already exists.`)
      }
      _schedulers[name] = handler
      return this
    },
    /**
     * Execute before executing `scheduler.execute()` and `scheduler.end()`
     *
     * @param beforeEachHandler Handler executed when `execute()` or `end()` is before called
     * @returns UseSchedulerController
     */
    beforeEach(beforeEachHandler: SchedulerHandler) {
      _beforeEachHandler = beforeEachHandler
      return this
    },
    /**
     * Execute after executing `scheduler.execute()` and `scheduler.end()`
     *
     * @param afterEachHandler Handler executed when `execute()` or `end()` is after called
     * @returns UseSchedulerController
     */
    afterEach(afterEachHandler: SchedulerHandler) {
      _afterEachHandler = afterEachHandler
      return this
    },
    /**
     * Execute scheduler handler named `name`
     *
     * @param name scheduler name
     * @param args Some parameters passed to the handler
     */
    execute(name: N, ...args: any[]) {
      _beforeEachHandler?.(...args)
      _schedulers[name](...args)
      _afterEachHandler?.(...args)
    },
    /**
     * Will be executed when `scheduler.end()`
     *
     * @param endHandler Handler executed when `end()` is called
     * @returns UseSchedulerController
     */
    onEnd(endHandler: SchedulerHandler) {
      _endHandler = endHandler
      return this
    },
    /**
     * End scheduler to execute the end handler/listener. At the same time, if `beforeEachHandler` and `afterEachHandler` exist, they will also be executed.
     *
     * @param args Some parameters passed to the handler
     */
    end(...args: any[]) {
      _beforeEachHandler?.(...args)
      _endHandler?.(...args)
      _afterEachHandler?.(...args)
    }
  }
}

/**
 * @type useSchedulerController's type
 */
export type UseSchedulerController = ReturnType<typeof useSchedulerController>
