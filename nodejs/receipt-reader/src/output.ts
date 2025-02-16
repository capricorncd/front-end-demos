import fs from 'fs'
import path from 'path'
import type { Data } from './types.d.ts'
import { toCsv } from './helpers.ts'

interface OutputOptions {
  /** default: 'output.csv' */
  filename?: string
  /** default: 'output' */
  dirname?: string
}

/**
 * 创建文件夹
 */
export const createDir = (dirname: string) => {
  // 输出文件夹：
  // 非绝对路径时，默认输出到当前工作目录；否则使用绝对路径
  // 判断路径是否为绝对路径
  const isAbsolute = path.isAbsolute(dirname)
  const dir = isAbsolute ? dirname : path.join(process.cwd(), dirname)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

/**
 * 输出csv文件
 */
export const outputCsv = (list: Data[], options: OutputOptions = {}) => {
  const { filename = 'output.csv', dirname = 'output' } = options
  const csv = toCsv(list, {
    header: ['日付(UTC+9)', '金額', '種別', '摘要', '作成日時(UTC)', 'ファイル名'],
    // footer: ['合計', totalPrice, '', '', '', ''],
  })
  // 输出文件路径及名称
  createDir(dirname)
  const filePath = path.join(dirname, filename)
  fs.writeFileSync(filePath, csv)
  console.log(`Output file: ${filePath}`)
}
