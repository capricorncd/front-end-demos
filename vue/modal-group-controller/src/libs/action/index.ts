/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/09 14:42:45 (GMT+0900)
 */
import type { Component } from 'vue'
import { useModalController, type UseModalController } from './modal'

/**
 * useActionController
 *
 * @returns
 */
export function useActionController<N extends string>() {
  const _modals: Record<N, UseModalController> = {} as Record<N, UseModalController>

  return {
    /**
     * UseModalController
     *
     * @param name modal's name
     * @param Com Vue Component
     * @param props Component's props
     * @returns UseModalController
     */
    modal<A extends string | number | symbol, T>(name: N, Com: Component, props?: T) {
      const modal = useModalController<A, T>(Com, props)
      _modals[name] = modal
      return modal
    },
    /**
     * open modal
     * @param name modal's name
     */
    open(name: N) {
      _modals[name].open()
    },
    /**
     * close modal
     * @param name modal's name
     */
    close(name: N) {
      _modals[name].close()
    },
    /**
     * Get all modal components in a modal group
     */
    get component(): Component {
      return {
        render() {
          return Object.keys(_modals).map((name) => _modals[name as N].component)
        }
      }
    }
  }
}
