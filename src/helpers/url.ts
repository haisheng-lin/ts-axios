import { isDate, isPlainObject } from './util'

interface URLOrigin {
  protocol: string
  host: string
}

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
  Object.keys(params).forEach((key) => {
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
    values.forEach((v) => {
      if (isDate(v)) {
        v = v.toISOString()
      } else if (isPlainObject(v)) {
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

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return { protocol, host }
}

export function isURLSameOrigin(requestURL: string) {
  // 将传入的 url 与当前页面的 url 进行对比
  // 但是我们解析传入的 url，可以通过创建 a 标签进行解析
  const parsedOrigin = resolveURL(requestURL)

  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}
