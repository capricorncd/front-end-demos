import fs from 'fs'
import type { Data } from './types.d.ts'
import { toCsv } from './helpers.ts'

/**
 * 输出csv文件
 */
export const outputCsv = (list: Data[], filename = 'output.csv') => {
  const csv = toCsv(list, {
    header: ['日付(UTC+9)', '金額', '種別', '摘要', '作成日時(UTC)', 'ファイル名'],
    // footer: ['合計', totalPrice, '', '', '', ''],
  })
  fs.writeFileSync(filename, csv)
}
