// 最后一个元素

type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type tail1 = Last<arr1> // 应推导出 'c'
type tail2 = Last<arr2> // 应推导出 1

type Last<T> = T extends [...args: any[], last: infer U] ? U : never
