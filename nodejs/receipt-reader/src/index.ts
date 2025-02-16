import fs from 'fs'
import { classifyData, sumPrice, toCsv, utc0ToUtc9, formatPrice, formatDate } from './helpers.ts'
import { log, error, warn } from '@zx-libs/docgen'
import type { Data } from './types.d.ts'
import { outputCsv } from './output.ts'

// npm run read dir/file.txt
const args = process.argv.slice(2)
console.log('args', args)

const filePath = args[0]


/**
 * 格式化文件名
 * @param {string} filePath 文件路径
 * @returns
 */
const formatFileName = (fileName): Data => {
  // 获取文件名和后缀
  const lastDotIndex = fileName.lastIndexOf('.')
  if (lastDotIndex === -1) {
    throw new Error('文件名格式错误' + fileName)
  }
  const name = fileName.slice(0, lastDotIndex)
  const ext = fileName.slice(lastDotIndex + 1)

  // 20240328-120000-10000-旅費交通費-JR.jpg
  // yyyyMMdd-HHmmss-price-type-description.jpg
  const [date, time, priceStr, type, description = ''] = name.split('-')

  const createdAt = formatDate(date, time)

  const cost = formatPrice(priceStr)

  // console.log(cost)

  return {
    createdAt,
    date: utc0ToUtc9(createdAt).date,
    cost,
    type,
    description,
    ext,
    name,
  }
}

const getFileNameInfoList = (dirOrFile: string, result: Data[] = []): Data[] => {
  if (fs.statSync(dirOrFile).isDirectory()) {
    const files = fs.readdirSync(dirOrFile)
    files.forEach((file) => {
      getFileNameInfoList(`${dirOrFile}/${file}`, result)
    })
    return result
  }
  const name = dirOrFile.split('/').pop()
  try {
    const nameInfo = formatFileName(name)
    result.push(nameInfo)
  } catch (err) {
    error(String(err), dirOrFile)
  }
  return result
}

function main() {
  if (!filePath) {
    console.error('请输入文件路径')
    return
  }
  const _list = getFileNameInfoList(filePath)
  // console.log(list);

  const list = _list.filter((item) => ![
    // '医療費',
    // '税',
    // '保险',
    '接待交際費',
    // '地代家賃'
  ].includes(item.type))

  const classifiedData = classifyData(list)
  const sumData = sumPrice(classifiedData)
  // console.log(sumData);


  // 输出CSV
  sumData.forEach((item) => {
    const csv = toCsv(item.items)
    warn([item.type, item.totalPrice].join(','))
    console.log(csv)
  })

  // 总价
  const totalPrice = sumData.reduce((acc, item) => acc + item.totalPrice, 0)
  log(['合計', totalPrice].join(','))

  // const denkiList = list.filter((item) => item.description.includes('電気'));
  // console.log(toCsv(denkiList));
  outputCsv(list)

  outputCsv(_list.filter(v => v.type === '保险'), { filename: '保険.csv' })
  outputCsv(_list.filter(v => v.type === '税'), { filename: '税.csv' })
  outputCsv(_list.filter(v => v.type === '医療費'), { filename: '医療費.csv' })
}

main()
