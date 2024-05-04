import '@fd-libs/header'
import { $$, $ } from '@zx-libs/utils'
import './style.scss'

document.addEventListener('DOMContentLoaded', () => {
  $$('.content').forEach(content => {
    content.innerHTML = `<div>
    <p>The Document method querySelector() returns the first Element within the document that matches the specified selector, or group of selectors. If no matches are found, null is returned.</p>
  <p>Note: The matching is done using depth-first pre-order traversal of the document's nodes starting with the first element in the document's markup and iterating through sequential nodes by order of the number of child nodes.</p>
  <pre><code>querySelector(selectors)</code></pre>
  <p>Parameters selectors. A string containing one or more selectors to match. This string must be a valid CSS selector string; if it isn't, a SyntaxError exception is thrown. See Locating DOM elements using selectors for more about selectors and how to manage them.</p>
  </div>`
  })

  // Flip
  const btn = $('.btn-js')
  const content = $('.btn-js ~ .content')
  console.log(btn, content)

  btn.addEventListener('mouseenter', () => {
    content.style.height = 'auto'
    const { height } = content.getBoundingClientRect()
    // 重新设置过程中改变了DOM、CSS、回流(reflow)，但浏览器并未绘制，所以页面上不会有“闪烁”
    // 浏览器会以最终的值来渲染
    content.style.height = 0

    // 读取任意一个几何属性，可以实现强制回流(reflow)
    content.offsetHeight
    content.style.height = height + 'px'

    // 或在requestAnimationFrame回调函数中执行
    // requestAnimationFrame(() => {
    //   content.style.height = height + 'px'
    // })
  })

  btn.addEventListener('mouseleave', () => {
    content.style.height = 0
  })
})

