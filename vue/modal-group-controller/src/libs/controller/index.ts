/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/10 17:23:17 (GMT+0900)
 */
import type { Component, VNode } from 'vue'
import { type UseModalController, useModalController } from './modal'
import { type UseController, useController } from './controller'

export type { UseController }

export function useModalsController<N extends string | number | symbol>() {
  const controller = useController<N>()
  const _modals: Map<Component, UseModalController> = new Map()

  return {
    get modals() {
      return {
        add<P>(component: Component, props?: P) {
          const modal = useModalController(component, controller, props)
          if (_modals.has(component)) {
            throw new Error(`Modal ${component} already exists`)
          }
          _modals.set(component, modal)
          return this
        },
        open(component: Component) {
          _modals.get(component)?.open()
        },
        close(component: Component) {
          _modals.get(component)?.close()
        },
        closeAll() {
          _modals.forEach(modal => modal.close())
        }
      }
    },
    /**
     * Get all modal components in a modal group
     */
    get component(): Component {
      return {
        render() {
          const vNodes: VNode[] = []
          _modals.forEach(modal => {
            vNodes.push(modal.component)
          })
          return vNodes
        }
      }
    },
    /**
     * Get controller
     */
    get controller(): UseController {
      return controller
    },
    /**
     * destroy
     */
    destroy() {
      _modals.clear()
    }
  }
}

export type UseModalsController = ReturnType<typeof useModalsController>
