/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/10 16:08:20 (GMT+0900)
 */
/**
 * @type Controller Handler
 */
export type ControllerHandler = (...args: any[]) => void | Promise<void>

/**
 * Controller
 *
 * @returns UseController
 */
export function useController<N extends string | number | symbol>() {
  const _controllers: Record<N, ControllerHandler> = {} as Record<N, ControllerHandler>

  let _endHandler: ControllerHandler | null = null
  let _beforeEachHandler: ControllerHandler | null = null
  let _afterEachHandler: ControllerHandler | null = null

  return {
    /**
     * Add a controller handler named `name`
     *
     * @param name controller name
     * @param handler ControllerHandler
     * @returns UseController
     */
    add(name: N, handler: ControllerHandler) {
      if (_controllers[name]) {
        throw new Error(`A ${String(name)} named controller handler already exists.`)
      }
      _controllers[name] = handler
      return this
    },
    /**
     * Execute before executing `controller.exec()` and `controller.end()`
     *
     * @param beforeEachHandler Handler executed when `exec()` or `end()` is before called
     * @returns UseController
     */
    beforeEach(beforeEachHandler: ControllerHandler) {
      _beforeEachHandler = beforeEachHandler
      return this
    },
    /**
     * Execute after executing `controller.exec()` and `controller.end()`
     *
     * @param afterEachHandler Handler executed when `exec()` or `end()` is after called
     * @returns UseController
     */
    afterEach(afterEachHandler: ControllerHandler) {
      _afterEachHandler = afterEachHandler
      return this
    },
    /**
     * Execute controller handler named `name`
     *
     * @param name controller name
     * @param args Some parameters passed to the handler
     */
    exec(name: N, ...args: any[]) {
      _beforeEachHandler?.(...args)
      _controllers[name](...args)
      _afterEachHandler?.(...args)
    },
    /**
     * Will be executed when `controller.end()`
     *
     * @param endHandler Handler executed when `end()` is called
     * @returns UseController
     */
    onEnd(endHandler: ControllerHandler) {
      _endHandler = endHandler
      return this
    },
    /**
     * End controller to execute the end handler/listener. At the same time, if `beforeEachHandler` and `afterEachHandler` exist, they will also be executed.
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
 * @type useController's type
 */
export type UseController = ReturnType<typeof useController>
