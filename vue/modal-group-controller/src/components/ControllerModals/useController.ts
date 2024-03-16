/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/10 16:22:25 (GMT+0900)
 */
import { onUnmounted } from 'vue'
import TestA from './TestA.vue'
import TestB from './TestB.vue'
import TestC from './TestC.vue'
import TestD from './TestD.vue'
import { useModalsController } from '../../libs/controller'
import { controllerNames } from './constants'

export { controllerNames }

export const controllerModals = {
  TEST_A: TestA,
  TEST_B: TestB,
  TEST_C: TestC,
  TEST_D: TestD,
} as const

export function useController() {
  const { modals, controller, component, destroy } = useModalsController()

  modals
    .add(controllerModals.TEST_A, { msg: 'Message Props' })
    .add(controllerModals.TEST_B)
    .add(controllerModals.TEST_C)
    .add(controllerModals.TEST_D)

  controller
    .beforeEach((...args: any[]) => {
      console.log('beforeEach', args)
      modals.closeAll()
    })
    .onEnd((...args: any[]) => {
      console.log('onEnd', args)
    })
    .add(controllerNames.OPEN_TEST_A, (...args: any[]) => {
      console.log(args)
      modals.open(controllerModals.TEST_A)
    })
    .add(controllerNames.OPEN_TEST_B, (...args: any[]) => {
      console.log(args)
      modals.open(controllerModals.TEST_B)
    })
    .add(controllerNames.OPEN_TEST_D, (...args: any[]) => {
      console.log(args)
      modals.open(controllerModals.TEST_D)
    })
    .add(controllerNames.OPEN_TEST_C, (...args: any[]) => {
      console.log(args)
      modals.open(controllerModals.TEST_C)
    })

    onUnmounted(() => {
      console.log('onUnmounted')
      destroy()
    })

  return {
    controller,
    component
  }
}
