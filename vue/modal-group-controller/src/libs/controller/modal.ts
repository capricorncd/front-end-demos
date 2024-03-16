/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/09 19:11:40 (GMT+0900)
 */
import type { Component, VNode } from 'vue'
import { ref, h } from 'vue'
import type { UseController } from './controller'

/**
 * useModalController
 *
 * @param Com Vue Component
 * @param props Component properties
 * @returns UseModalController
 */
export function useModalController<T>(
  Com: Component,
  controller: UseController,
  props?: T
) {
  const _visible = ref(false)

  return {
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
      return h(Com, { ...props, visible: _visible.value, controller })
    }
  }
}

/**
 * useModalController's type
 */
export type UseModalController = ReturnType<typeof useModalController>
