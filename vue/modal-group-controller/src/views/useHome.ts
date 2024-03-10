import TestA, { type TestAProps } from '../components/Modals/TestA.vue'
import TestB from '../components/Modals/TestB.vue'
import TestC from '../components/Modals/TestC.vue'
import TestD from '../components/Modals/TestD.vue'
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
    component,
  }
}
