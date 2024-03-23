/**
 * 将`T`中指定的`K`变成可选项
 *
 * @example interface ObjectA { key1: string; key2: unknown }
 * type ObjectB = Optional<ObjectA, 'key2'> // ObjectB: { key1: string; key2?: unknown }
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

