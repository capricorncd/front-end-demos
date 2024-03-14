import './style.scss'

(function() {
  const xRange = [-100, 100]
  const yRange = [-100, 100]

  function getMovingDistance(range, value, length) {
    return (value / length) * (range[1] - range[0]) + range[0]
  }

  window.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card')

    card.addEventListener('mousemove', (e) => {
      const { offsetX, offsetY } = e
      const { offsetWidth, offsetHeight } = card
      const left = -getMovingDistance(xRange, offsetX, offsetWidth)
      const top = -getMovingDistance(yRange, offsetY, offsetHeight)
      card.style.setProperty('--left', `${left}px`)
      card.style.setProperty('--top', `${top}px`)
    })
  })
})()
