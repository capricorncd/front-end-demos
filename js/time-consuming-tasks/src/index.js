/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/23 15:02:42 (GMT+0900)
 */
import '@fd-libs/header'
import './style.scss'
import { runTask } from './core'

function $(s) {
  return document.querySelector(s)
}

function wait(t = 50) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, t)
  })
}


document.addEventListener('DOMContentLoaded', () => {
  const button = $('button')
  const totalTimeSpan = $('#totalTime')

  const handleClick = async() => {
    button.disabled = true
    totalTimeSpan.innerText = '--'
    const start = Date.now()
    runTask(async() => {
      for (let i = 0; i < 100; i++) {
        await wait()
      }
      totalTimeSpan.innerText = `${Date.now() - start}ms`
      button.disabled = false
    })
  }

  button.addEventListener('click', handleClick)
})


