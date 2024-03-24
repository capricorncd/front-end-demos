const map = new WeakMap()

export function draw(el, total = 100, color = 'red') {
  if (!map.has(el)) {
    map.set(el, [])
  }
  const points = map.get(el)
  if (points.length < total) {
    const { x, y } = el.getBoundingClientRect()
    if (!points.some(p => p.x === x && p.y === y)) {
      points.push({ x, y })
      addEl(x, y, color)
    }
  }

  return {
    end() {
      return points.length > total
    }
  }
}

function addEl(x, y, color = 'red') {
  const el = document.createElement('div')
  el.className = 'dot'
  el.style.backgroundColor = color
  el.style.left = `${x}px`
  el.style.top = `${y}px`
  document.querySelector('body').append(el)
}
