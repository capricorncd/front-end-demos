/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/23 15:02:42 (GMT+0900)
 */
import '@fd-libs/header'
import './style.scss'
import { runTask } from './core'
import { draw } from './draw'
import { $ } from '@zx-libs/utils'

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

  // balls
  const ball = $('.ball')
  const ball2 = $('.ball2')
  const ball3 = $('.ball3')

  let timer = setInterval(() => {
    const d1 = draw(ball, 200, '#999')
    const d2 = draw(ball2, 2000, '#0ce831')
    const d3 = draw(ball3, 401, '#e8c30c')
    if (d1.end() && d2.end() && d3.end()) {
      clearInterval(timer)
      timer = null
    }
  }, 10)

  // TransitionEvent
  // ball.addEventListener('transitionstart', (e) => {
  //   console.log(e)
  // })

  // ball.addEventListener('transitionrun', (e) => {
  //   console.log(e)
  // })
})


