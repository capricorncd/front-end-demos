/** 税务申报金额 */
export interface TaxDeclareAmount {
  /** 原价 */
  amount: number;
  /** 申报分期总数 */
  period: number;
  /** 当前期数 */
  currentPeriod: number;
  /** 申报率 */
  declareRate: number;
  /** 申报金额 */
  declareAmount: number;
}

export interface Data {
  /** 创建时间UTC+0 */
  createdAt: string;
  /** 日期 */
  date: string;
  /** 物品/商品费用信息 */
  cost: TaxDeclareAmount;
  /** 类型 */
  type: string;
  /** 描述 */
  description: string;
  /** 扩展名 */
  ext: string;
  /** 文件名 */
  name: string;
}
