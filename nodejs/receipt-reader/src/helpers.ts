import { format, addHours } from 'date-fns'
import { isNumberLike, toNumber } from '@zx-libs/utils'
import type { TaxDeclareAmount, Data } from './types.d.ts'


interface ToCsvOptions {
  header?: string[],
  footer?: string[],
}

/**
 * 将文件名信息列表转换为CSV
 */
export const toCsv = (list: Data[], options: ToCsvOptions = {}) => {
  const { header = [], footer = [] } = options
  // CSV分隔符
  const csvDelimiter = ','
  const lines = list.map((item) => [
    item.date,
    item.cost.declareAmount,
    item.type,
    item.description,
    item.createdAt,
    `${item.name}.${item.ext}`].join(csvDelimiter))
  if (header.length) {
    lines.unshift(header.join(csvDelimiter))
  }
  if (footer.length) {
    lines.push(footer.join(csvDelimiter))
  }
  return lines.join('\n')
}

/**
 * 数据分类
 * @returns
 */
export const classifyData = (list: Data[]) => {
  return list.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || []
    acc[item.type].push(item)
    return acc
  }, {})
}

/**
 * 数据求总价
 */
export const sumPrice = (data: Record<string, Data[]>) => {
  return Object.entries(data).map(([type, items]) => ({
    type,
    totalPrice: items.reduce((acc, item) => acc + item.cost.declareAmount, 0),
    items,
  }))
}

/**
 * 将 yyyyMMdd HHmmss的UTC+9时间 转换为 yyyy-MM-ddTHH:mm:ss.000Z UTC时间
 * @param {string} date 日期
 * @param {string} time UTC+9时间
 * @returns
 */
export const formatDate = (date: string, time: string) => {
  if (!/^\d+$/.test(date) || date.length !== 8) {
    throw new Error('日期格式错误' + date)
  }
  if (time && !/^\d+$/.test(time) || time.length > 6) {
    throw new Error('时间格式错误' + time)
  }
  if (!time) time = '120000'
  if (time.length !== 6) {
    time = time.padStart(6, '0')
  }

  const ymd = date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8)
  const hms = time.slice(0, 2) + ':' + time.slice(2, 4) + ':' + time.slice(4, 6)


  const utc9 = new Date(`${ymd} ${hms}`)
  // UTC+9转换为UTC+0时间
  const utc0 = addHours(utc9, -9)

  return `${format(utc0, 'yyyy-MM-dd')}T${format(utc0, 'HH:mm:ss')}.${Math.floor(Math.random() * 1000)}Z`
}


/**
 * 将UTC+0时间转换为UTC+9时间
 * 2024-07-07T21:00:00.593Z -> 2024-07-08 06:00:00
 */
export const utc0ToUtc9 = (utc0Str: string) => {
  const utc0 = new Date(utc0Str)
  const utc9 = addHours(utc0, 9)
  return {
    date: format(utc9, 'yyyy-MM-dd'),
    time: format(utc9, 'HH:mm:ss'),
  }
}


/**
 * 10000x0.5 -> {price: 10000, period: 1, currentPeriod: 1, declareRate: 0.5, declareAmount: 5000}
 * 10000x1_3 -> {price: 10000, period: 3, currentPeriod: 1, declareRate: 1/3, declareAmount: 10000/3}
 * @param {string} price
 * @returns TaxDeclareAmount
 */
export const formatPrice = (input: string): TaxDeclareAmount => {
  const [priceStr, periodStr = '1'] = input.split('x')
  const amount = parseFloat(priceStr)
  if (isNaN(amount)) {
    throw new Error('价格格式错误' + input)
  }
  /** 当前期数 */
  let currentPeriod = 1
  /** 申报分期总数 */
  let period = 1
  /** 申报率 */
  let declareRate = 1
  // 10000x0.5
  if (isNumberLike(periodStr)) {
    declareRate = toNumber(periodStr)
  } else {
    // 10000x1/3
    const m = periodStr.match(/^(\d+)_(\d+)$/)
    if (!m) {
      throw new Error('价格申报分期格式错误' + input)
    }
    currentPeriod = toNumber(m[1])
    period = toNumber(m[2])
  }

  const declareAmount = period > 1 ? Math.ceil(amount / period) : Math.ceil(amount * declareRate)

  return {
    amount,
    period,
    currentPeriod,
    declareRate,
    declareAmount,
  }
}
