/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/10 16:22:25 (GMT+0900)
 */
import TestA from '../components/SchedulerModals/TestA.vue'
import TestB from '../components/SchedulerModals/TestB.vue'
import TestC from '../components/SchedulerModals/TestC.vue'
import TestD from '../components/SchedulerModals/TestD.vue'
import { useModalGroup } from '../libs/scheduler'

export function useScheduler() {
  const { modals, scheduler, component } = useModalGroup()

  modals
    .add('TestA', TestA, { msg: 'Message Props' })
    .add('TestB', TestB)
    .add('TestC', TestC)
    .add('TestD', TestD)

  scheduler
    .beforeEach(() => {
      modals.closeAll()
    })
    .add('openTestA', () => {
      modals.open('TestA')
    })
    .add('openTestB', () => {
      modals.open('TestB')
    })
    .add('openTestD', () => {
      modals.open('TestD')
    })
    .add('openTestC', () => {
      modals.open('TestC')
    })

  return {
    scheduler,
    component
  }
}
