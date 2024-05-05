/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/08/12 14:42:02 (GMT+0900)
 */
import fs from 'node:fs'
import path from 'node:path'
import { EOL } from 'node:os'
import { fileURLToPath, URL } from 'node:url'

const LINKS_TABLE_LINE = '<!--PLAYGROUND_LIST-->'

function isObject(obj) {
  return obj && typeof obj === 'object'
}

function isValidArray(arr) {
  return Array.isArray(arr) && arr.length > 0
}

function resolve(_path) {
  return fileURLToPath(new URL(_path, import.meta.url))
}

function getDocInfoFromPackageJson(pkgFilePath) {
  const pkg = JSON.parse(fs.readFileSync(pkgFilePath, 'utf-8').toString())
  const docInfo = pkg.docInfo
  if (isObject(docInfo) && !docInfo.hidden) {
    if (!docInfo.name) docInfo.name = pkg.name
    if (!docInfo.source) docInfo.source = pkg.name
    if (!docInfo.description) docInfo.description = pkg.description || '--'
    return docInfo
  }

  return null
}

function createDocInfoLines(arr) {
  if (!isValidArray(arr)) return []

  const lines = [
    // BLANK_LINE,
    'Name|Links|Command|Description',
    ':--|:--|:--|:--',
  ]
  arr.forEach(item => {
    lines.push([
      `[${item.name}](${item.source})`,
      `<a href='${item.url}' target='_blank'>Playground</a>`,
      `\`npm run dev -w ${item.source}\``,
      item.description || '--'
    ].join('|'))
  })
  return lines
}

function getDocInfoFromDir(rootDir, docInfoArr = [], disableFilter = false) {
  let tempDir, stat
  fs.readdirSync(rootDir).forEach(dirname => {
    tempDir = path.join(rootDir, dirname)
    stat = fs.statSync(tempDir)
    // 字母开头的目录，点或下划线开头的忽略
    if (stat.isDirectory() && /^\w+/.test(dirname) && !dirname.startsWith('node_modules')) {
      const pkgFilePath = path.join(tempDir, 'package.json')
      // 存在package.json则不在查找器子目录
      if (fs.existsSync(pkgFilePath)) {
        docInfoArr.push(getDocInfoFromPackageJson(pkgFilePath))
      } else {
        // 查找子目录
        getDocInfoFromDir(tempDir, docInfoArr, true)
      }
    }
  })
  return disableFilter ? docInfoArr : docInfoArr.filter(Boolean)
}

const ROOT_DIR_PATH = resolve('../')
const README_FILE_PATH = path.join(ROOT_DIR_PATH, 'README.md')

function main() {
  // read docInfo from package.json
  const docInfoArr = getDocInfoFromDir(ROOT_DIR_PATH)

  const lines = []
  let isLinksTableStart = false
  let isLinksTableEnded = false
  fs.readFileSync(README_FILE_PATH).toString().split(EOL).forEach(line => {
    if (line.includes(LINKS_TABLE_LINE)) {
      if (isLinksTableStart) {
        isLinksTableEnded = true
        // push into new info
        lines.push(...createDocInfoLines(docInfoArr))
      } else {
        isLinksTableStart = true
      }
      lines.push(LINKS_TABLE_LINE)
      return
    }
    if (isLinksTableEnded) {
      isLinksTableStart = false
      isLinksTableEnded = false
    }
    if (!isLinksTableStart) {
      lines.push(line)
    }
  })

  console.log(lines)

  // write into README.md
  fs.writeFileSync(README_FILE_PATH, lines.join(EOL), 'utf-8')
}

main()
