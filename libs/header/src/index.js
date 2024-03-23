/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/23 15:58:39 (GMT+0900)
 */
class DemoHeader extends HTMLElement {
  constructor() {
    super()
    this.root = this.attachShadow({ mode: 'open' })
  }

  /** life-cycle-callbacks */
  connectedCallback() {
    const attrs = getAttributes(this, ['links', 'github', 'color', 'background', 'title', 'shadow'], {
      github: 'https://github.com/capricorncd',
      title: 'Capricorncd'
    })
    // use HTMLElements
    this.root.appendChild(createTemplate(attrs))
    this.root.appendChild(createStyles(attrs))
  }

  /** life-cycle-callbacks */
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('attributeChangedCallback:', name, oldValue, newValue)
  }
}

customElements.define('demo-header', DemoHeader)

function createTemplate(attrs) {
  const { color, background, gap, links, github, title, position, shadow } = attrs
  // css properties
  const styles = []
  if (position) styles.push(`--dh-position: ${position}`)
  if (color) styles.push(`--dh-color: ${color}`)
  if (background) styles.push(`--dh-background: ${background}`)
  if (shadow) styles.push(`--dh-shadow: ${shadow}`)
  if (!isNullOrUndefined(gap)) styles.push(`--hd-nav-gap: ${toCssValue(gap)}`)

  // template
  const template = document.createElement('template')
  template.innerHTML = `
    <header style="${styles.join(';')}">
      <h1 class="title">${title}</h1>
      <div class="right-wrap">
        <nav>
          ${createLinks(parse(links || '[]'))}
        </nav>
        <a class="icon-github" href="${github}" target="_blank">
          <svg width="28" height="28" viewBox="0 0 16 16" version="1.1"
          aria-hidden="true">
            <path fill-rule="evenodd" fill="currentColor"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
            </path>
          </svg>
        </a>
      </div>
    </header>
  `

  return template.content
}

function createStyles() {
  const styles = document.createElement('style')
  styles.innerHTML = `
    header {
      position: var(--dh-position, fixed);
      z-index: 10;
      top: 0;
      left: 0;
      width: 100%;
      height: 60px;
      box-shadow: var(--dh-shadow, 0 1px 3px rgba(0, 0, 0, 0.2));
      color: var(--dh-color, #fff);
      background: var(--dh-background, #333);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .title {
      margin: 0 0 0 20px;
      padding: 0;
      line-height: 1;
      font-size: 1.5rem;
    }
    .right-wrap {
      display: flex;
      align-items: center;
    }
    nav a {
      text-decoration: none;
      font-size: 1rem;
      opacity: 0.7;
      color: inherit;
      margin-left: var(--hd-nav-gap, 10px);
    }
    nav a:hover {
      opacity: 1;
      text-decoration: underline;
    }
    nav a.current {
      text-decoration: underline;
      font-weight: bold;
    }
    .icon-github {
      text-decoration: none;
      margin: 0 20px;
      opacity: 0.7;
      color: inherit;
    }
    .icon-github:hover {
      opacity: 1;
    }
  `
  return styles
}

function getAttributes(el, attrs, defaultValues = {}) {
  const result = {}
  attrs.forEach((attr) => {
    result[attr] = el.getAttribute(attr) ?? defaultValues[attr]
  })
  return result
}

function parse(input, defaultValue) {
  try {
    return JSON.parse(input)
  } catch (e) {
    return defaultValue
  }
}

function isNumberLike(value) {
  if (typeof value === 'string') {
    return /^-?\d+(\.\d+)?$/.test(value)
  }
  return typeof value === 'number'
}

function isNullOrUndefined(value) {
  return typeof value === 'undefined' || value === null
}

function toCssValue(value, unit = 'px') {
  if (isNumberLike(value)) return `${value}${unit}`
  if (typeof value === 'string' && /\d+(\w+)?\s/.test(value)) {
    return value.split(/\s+/).map((str) => toCssValue(str, unit)).join(' ')
  }
  return value
}

function createLinks(links) {
  // location
  const pathname = location.pathname
  return links
    .map((item) => {
      return `<a class="${pathname.endsWith(item.path) ? 'current' : ''}" href="${item.path}" target="${item.target || '_self'}">${item.label}</a>`
    })
    .join('\n')
}
