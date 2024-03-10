/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/09 19:11:40 (GMT+0900)
 */
import type { Component, VNode } from 'vue'
import { ref, h } from 'vue'

/**
 * Action Handler
 */
export type ActionHandler = (...args: any[]) => void | Promise<void>

/**
 * useModalController
 *
 * @param Com Vue Component
 * @param props Component properties
 * @returns UseModalController
 */
export function useModalController<A extends string | number | symbol, T>(
  Com: Component,
  props?: T
) {
  /**
   * action handlers
   */
  const _actions: Record<A, ActionHandler> = {} as Record<A, ActionHandler>

  let _beforeEach: ActionHandler | null = null
  let _afterEach: ActionHandler | null = null

  const _visible = ref(false)

  /**
   * on action handler
   *
   * @param action
   * @param args
   */
  const _onAction = (action: A, ...args: any[]) => {
    _beforeEach?.(...args)
    _actions[action]?.(...args)
    _afterEach?.(...args)
  }

  return {
    get visible() {
      return _visible.value
    },
    set visible(value: boolean) {
      _visible.value = value
    },
    /**
     * handler that is executed before each action is executed
     *
     * @param fn ActionHandler
     * @returns UseModalController
     */
    beforeEach(fn: ActionHandler) {
      _beforeEach = fn
      return this
    },
    /**
     * handler that is executed after each action is executed
     *
     * @param fn ActionHandler
     * @returns UseModalController
     */
    afterEach(fn: ActionHandler) {
      _afterEach = fn
      return this
    },
    /**
     * Add an action listening function
     * @param action action
     * @param fn ActionHandler
     * @returns UseModalController
     */
    addAction(action: A, fn: ActionHandler) {
      _actions[action] = fn
      return this
    },
    /**
     * open/show modal
     */
    open() {
      _visible.value = true
    },
    /**
     * close/hide modal
     */
    close() {
      _visible.value = false
    },
    /**
     * Get the VNode of the current Modal
     */
    get component(): VNode {
      return h(Com, { ...props, visible: _visible.value, onAction: _onAction })
    }
  }
}

/**
 * useModalController's type
 */
export type UseModalController = ReturnType<typeof useModalController>
