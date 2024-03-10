/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/10 16:22:25 (GMT+0900)
 */
import TestA from '../components/SchedulerModals/TestA.vue'
import TestB from '../components/SchedulerModals/TestB.vue'
import TestC from '../components/SchedulerModals/TestC.vue'
import TestD from '../components/SchedulerModals/TestD.vue'
import { useSchedulerController, useModalGroup } from '../libs/scheduler'

export function useScheduler() {
  const scheduler = useSchedulerController()
  const modalGroup = useModalGroup(scheduler)

  modalGroup
    .add('TestA', TestA, { msg: 'Message Props' })
    .add('TestB', TestB)
    .add('TestC', TestC)
    .add('TestD', TestD)

  scheduler
    .beforeEach(() => {
      modalGroup.closeAll()
    })
    .add('openTestA', () => {
      modalGroup.open('TestA')
    })
    .add('openTestB', () => {
      modalGroup.open('TestB')
    })
    .add('openTestD', () => {
      modalGroup.open('TestD')
    })
    .add('openTestC', () => {
      modalGroup.open('TestC')
    })

  return {
    start() {
      return scheduler.start()
    },
    get component() {
      return modalGroup.component
    }
  }
}
