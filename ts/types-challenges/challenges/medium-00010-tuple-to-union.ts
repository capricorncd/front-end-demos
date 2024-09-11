type Arr = ['1', '2', '3']

type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'

// type TupleToUnion<T extends string[]> = T[keyof T] // X
// type TupleToUnion<T> = T extends Array<infer V> ? V : never
type TupleToUnion<T extends any[]> = T[number]
