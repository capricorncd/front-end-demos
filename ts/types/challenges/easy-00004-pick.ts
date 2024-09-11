interface Todo {
  title: string
  description: string
  completed: boolean
}

type EasyPickPreview = EasyPick<Todo, 'title' | 'completed'>

const todo: EasyPickPreview = {
  title: 'Clean room',
  completed: false,
}

// type EasyPick<T, K extends keyof T> = { [key in keyof T as key extends K ? key : never] : T[key] }
type EasyPick<T, K extends keyof T> = {
  [key in K]: T[key]
}
