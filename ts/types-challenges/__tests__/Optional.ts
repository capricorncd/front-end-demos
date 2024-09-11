import type { Expect, Alike } from '@type-challenges/utils'
import type { Optional } from '../src'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  Expect<Alike<Expected1, Optional<Todo, 'b'>>>,
  Expect<Alike<Expected2, Optional<Todo, 'a' | 'b'>>>,
]

interface Todo { a: string; b: unknown }

interface Expected1 {
  a: string
  b?: unknown
}

interface Expected2 {
  a?: string
  b?: unknown
}
