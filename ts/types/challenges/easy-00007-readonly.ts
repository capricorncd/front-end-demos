interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: 'Hey',
  description: 'foobar'
}

todo.title = 'Hello' // Error: cannot reassign a readonly property
todo.description = 'barFoo' // Error: cannot reassign a readonly property

/**
 * 1.返回一个新对象
 * 2.遍历对象 in -> mapped keyof -> lookup
 * 3.key前面+readonly关键字
 * 4.通过key获取原来的值 indexed
 */
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}
