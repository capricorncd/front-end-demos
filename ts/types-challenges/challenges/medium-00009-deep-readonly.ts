interface X {
  x: {
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

interface Expected {
  readonly x: {
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey'
}

type Todo = DeepReadonly<X> // should be same as `Expected`

// type DeepReadonly<T> = {
//   readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
// }

type DeepReadonly<T> = keyof T extends never
  ? T
  : { readonly [K in keyof T]: DeepReadonly<T[K]> }
