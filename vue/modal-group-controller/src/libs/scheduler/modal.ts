/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/09 19:11:40 (GMT+0900)
 */
import type { Component, VNode } from 'vue'
import { ref, h } from 'vue'
import type { UseSchedulerController } from './scheduler'

/**
 * useModalController
 *
 * @param Com Vue Component
 * @param props Component properties
 * @returns UseModalController
 */
export function useModalController<T>(
  Com: Component,
  scheduler: UseSchedulerController,
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
      return h(Com, { ...props, visible: _visible.value, scheduler })
    }
  }
}

/**
 * useModalController's type
 */
export type UseModalController = ReturnType<typeof useModalController>

export function useModalGroup<N extends string | number | symbol>(
  scheduler: UseSchedulerController
) {
  const _modals: Record<N, UseModalController> = {} as Record<N, UseModalController>

  return {
    add<P>(name: N, component: Component, props?: P) {
      const modal = useModalController(component, scheduler, props)
      _modals[name] = modal
      return this
    },
    open(name: N) {
      _modals[name].open()
    },
    close(name: N) {
      _modals[name].close()
    },
    closeAll() {
      for (const modal of Object.values<UseModalController>(_modals)) {
        modal.close()
      }
    },
    /**
     * Get all modal components in a modal group
     */
    get component(): Component {
      return {
        render() {
          return Object.values<UseModalController>(_modals).map((modal) => modal.component)
        }
      }
    }
  }
}
