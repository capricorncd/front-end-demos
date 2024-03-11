/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/10 17:23:17 (GMT+0900)
 */
import type { Component } from 'vue'
import { type UseModalController, useModalController } from './modal'
import { type UseSchedulerController, useSchedulerController } from './scheduler'

// export * from './modal'
// export * from './scheduler'

export function useModalGroup<N extends string | number | symbol>() {
  const scheduler = useSchedulerController()

  const _modals: Record<N, UseModalController> = {} as Record<N, UseModalController>

  return {
    get modals() {
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
        }
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
    },
    /**
     * Get scheduler
     */
    get scheduler(): UseSchedulerController {
      return scheduler
    }
  }
}

export type UseModalGroup = ReturnType<typeof useModalGroup>
