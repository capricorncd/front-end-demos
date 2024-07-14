import '@fd-libs/header'
import { $ } from '@zx-libs/utils'

/** @type{CanvasRenderingContext2D} */
let ctx
let isDrawing = false

function main() {
  /** @type{HTMLCanvasElement} */
  const canvas = $('canvas')
  ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth * devicePixelRatio
  canvas.height = (window.innerHeight - 60) * devicePixelRatio

  // 重置坐标系
  ctx.translate(canvas.width / 2, canvas.height)
  ctx.scale(1, -1)

  isDrawing = true
  drawBranch(0, 0, 300, 60, 90)
  isDrawing = false

  /** @type{HTMLButtonElement} */
  const button = $('button')
  button.addEventListener('click', () => {
    if (isDrawing) return
    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.fillRect(-canvas.width / 2, 0, canvas.width, canvas.height)
    isDrawing = true
    drawBranch(0, 0, 280, 50, 90)
    isDrawing = false
  })
}

/**
 *
 * @param {number} x 起点x坐标
 * @param {number} y 起点y坐标
 * @param {number} len 枝条长度
 * @param {number} thick 枝条粗细
 * @param {number} angle 角度
 * @returns
 */
function drawBranch(x, y, len, thick, angle) {
  if ((thick < 8 && Math.random() < 0.4) || thick < 2) {
    if (Math.random() < 0.8) drawFlower(x, y, 10)
    return
  }

  ctx.beginPath()
  ctx.moveTo(x, y)
  const [x2, y2] = calculateEndCoordinates(x, y, len, angle)
  ctx.lineTo(x2, y2)
  ctx.strokeStyle = '#333'
  ctx.lineWidth = thick
  ctx.lineCap = 'round'
  ctx.stroke()

  // 左分枝
  drawBranch(x2, y2, toInt(len * 0.85), toInt(thick * 0.75), toInt(angle + Math.random() * 30))
  // 右分枝
  drawBranch(x2, y2, toInt(len * 0.85), toInt(thick * 0.75), toInt(angle - Math.random() * 30))
}

function drawFlower(x, y, radius, endAngle = 2) {
  ctx.beginPath()
  ctx.arc(x, y, radius + Math.random() * 30, 0, endAngle * Math.PI)
  ctx.fillStyle = `rgba(${204 + Math.random() * 50}, ${Math.random() * 50}, ${102 + Math.random() * 25}, ${Math.random()})`
  ctx.fill()
}

/**
 *
 * @param {number} input
 * @returns
 */
function toInt(input) {
  return Math.floor(input)
}

/**
 * 计算结束坐标
 *
 * @param {number} x x坐标
 * @param {number} y y坐标
 * @param {number} len 枝条长度
 * @param {number} angle 角度
 */
function calculateEndCoordinates(x, y, len, angle) {
  // 角度转弧度
  const radian = (angle * Math.PI) / 180
  return [
    x + toInt(len * Math.cos(radian)),
    y + toInt(len * Math.sin(radian))
  ]
}

document.addEventListener('DOMContentLoaded', main)
