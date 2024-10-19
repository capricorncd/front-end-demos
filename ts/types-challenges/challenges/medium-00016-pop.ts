// 排除最后一项
type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]

type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2> // expected to be [3, 2]

// type Pop<T> = T extends [...items: infer U, last: any] ? U :never
type Pop<T> = T extends [...infer U, infer _] ? U :never
