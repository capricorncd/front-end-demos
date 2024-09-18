/**
 * Canvas Fingerprinting
 * https://browserleaks.com/
 */

const toHashCode = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    // 将hash值转换为32位整数
    hash != 0
  }
  return hash.toString(16)
}

const getCanvasFinger = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 500
  canvas.height = 200

  const ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgb(128, 0, 0)'
  ctx.fillRect(10, 10, 20, 20)

  ctx.fillStyle = 'rgb(0, 128, 0)'
  ctx.fillRect(40, 40, 120, 20)

  ctx.fillStyle = 'rgb(0, 10, 0)'
  ctx.fillRect(90, 40, 100, 20)

  ctx.font = '20px Arial'
  ctx.fillStyle = 'rgb(0, 0, 0)'
  ctx.fillText('Test!', 0, 50)

  // to base64
  const dataURL = canvas.toDataURL()
  return toHashCode(dataURL)
}

const createElement = (tag, content) => {
  const el = document.createElement(tag)
  el.textContent = content
  return el
}

window.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body')

  body.append(createElement('h2', getCanvasFinger()))

  // https://github.com/fingerprintjs/fingerprintjs
  // Initialize the agent at application startup.
  // If you're using an ad blocker or Brave/Firefox, this import will not work.
  // Please use the NPM package instead: https://t.ly/ORyXk
  const fpPromise = import('https://openfpcdn.io/fingerprintjs/v4')
    .then(FingerprintJS => FingerprintJS.load())

  // Get the visitor identifier when you need it.
  fpPromise
    .then(fp => fp.get())
    .then(result => {
      // This is the visitor identifier:
      const visitorId = result.visitorId
      console.log(visitorId)
      body.append(createElement('h3', visitorId))
    })
})
