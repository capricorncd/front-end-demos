interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}

type MyOmit<T, K extends keyof T> = {[key in keyof T as key extends K ? never : key] : T[key]}
