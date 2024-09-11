// 元组转换为对象
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
// as const转换为常量（字面量类型）

type result = TupleToObject<typeof tuple>
// expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

// 遍历数组 T[number]
// type TupleToObject<T extends readonly any[]> = {
//   [V in T[number]]: V
// }

type TupleToObject<T> = T extends readonly (infer U)[]
  ? { [V in U as V extends string | number ? V : never]: V }
  : never

// const arr = ['1', 2, {}] as const
// type result2 = TupleToObject<typeof arr>
