// 第一个元素
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // 应推导出 'a'
type head2 = First<arr2> // 应推导出 3
type head3 = First<[undefined]> // 应推导出 undefined
type head4 = First<never> // 应推导出 never

type First<T> = T extends [infer F, ...any[]] ? F : never

type First2<T extends any[]> = T['length'] extends 0 ? never : T[0]

type first2_1 = First2<arr1> // 应推导出 'a'
type first2_2 = First2<arr2> // 应推导出 3
type first2_3 = First2<[undefined]> // 应推导出 undefined
type first2_4 = First2<never> // 应推导出 never

type F3<T extends any[]> = T extends [] ? never : T[0]

type first3_1 = F3<arr1> // 应推导出 'a'
type first3_2 = F3<arr2> // 应推导出 3
type first3_3 = F3<[undefined]> // 应推导出 undefined
type first3_4 = F3<never> // 应推导出 never
