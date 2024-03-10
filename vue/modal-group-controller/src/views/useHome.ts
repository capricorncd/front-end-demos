/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/09 16:22:51 (GMT+0900)
 */
import TestA, { type TestAProps } from '../components/ActionModals/TestA.vue'
import TestB from '../components/ActionModals/TestB.vue'
import TestC from '../components/ActionModals/TestC.vue'
import TestD from '../components/ActionModals/TestD.vue'
import { useActionController } from '../libs/action'

export function useHome() {
  const { modal, component, open, close } = useActionController()

  modal<string, TestAProps>('TestA', TestA, { msg: 'Message Props' })
    .beforeEach((params) => {
      close('TestA')
      console.log('beforeEach', params)
    })
    .addAction('show-b', (params) => {
      open('TestB')
      console.log(params)
    })
    .addAction('show-d', (params) => {
      console.log(params)
      open('TestD')
    })

  modal('TestB', TestB)
    .beforeEach((params) => {
      close('TestB')
      console.log('beforeEach', params)
    })
    .addAction('back', (params) => {
      open('TestA')
    })
    .addAction('show-c', (prams) => {
      open('TestC')
    })

  modal('TestC', TestC)
    .beforeEach((params) => {
      close('TestC')
      console.log('beforeEach', params)
    })
    .addAction('back', (params) => {
      open('TestB')
    })

  modal('TestD', TestD)
    .beforeEach((params) => {
      close('TestD')
      console.log('beforeEach', params)
    })
    .addAction('back', (params) => {
      open('TestA')
    })

  return {
    open,
    component
  }
}
