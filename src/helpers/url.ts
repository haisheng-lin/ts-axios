import { isDate, isObject } from './util'

function encode(val: string): string {
  /**
   * 有几个特殊字符不转义：@, :, ,(逗号), []
   * 对于空格符，则转义成 '+'
   */
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: { [s: string]: any }): string {
  if (!params) {
    return url
  }

  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(v => {
      if (isDate(v)) {
        v = v.toISOString()
      } else if (isObject(v)) {
        v = JSON.stringify(v)
      }
      parts.push(`${encode(key)}=${encode(v)}`)
    })

    let serializeParams = parts.join('&')
    if (serializeParams) {
      const markIndex = url.indexOf('#')
      if (markIndex !== -1) {
        url = url.slice(0, markIndex)
      }
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializeParams
    }
  })

  return url
}
