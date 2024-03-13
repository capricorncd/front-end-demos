import path from 'node:path'

export function resolve(_path) {
  return path.join(process.cwd(), _path)
}
