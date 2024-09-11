interface Todo {
  title: string
  description: string
  completed: boolean
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false,
}

todo.title = 'Hello' // Error: cannot reassign a readonly property
todo.description = 'barFoo' // Error: cannot reassign a readonly property
todo.completed = true // OK

type MyReadonly<T, K extends keyof T> = {
  readonly [key in keyof T]: T[key]
} & {
  [key in keyof T as key extends K ? never : key] : T[key]
}

type MyReadonly2<T, K extends keyof T> = {
  readonly [key in keyof T as key extends K ? key : never]: T[key]
} & {
  [key in keyof T as key extends K ? never : key] : T[key]
}
