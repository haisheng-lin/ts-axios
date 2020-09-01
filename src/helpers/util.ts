const toString = Object.prototype.toString

export function isDate(val: unknown): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isPlainObject(val: unknown): val is Object {
  return toString.call(val) === '[object Object]'
}

// 把 from 的属性拷贝到 to 对应的属性上
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }

  return to as T & U
}

export function isFormData(val: unknown): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}

export function isURLSearchParams(val: unknown): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
