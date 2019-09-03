import { isPlainObject } from './util'

/**
 * 由于 headers 需求是 key 名字大小写不敏感
 * 如 content-type 与 Content-Type 都是合法的
 * 那么需要对名字做一层规范化处理
 *
 * @param {any} headers
 * @param {string} normalizedName
 * @returns {void}
 */
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(keyName => {
    if (keyName !== normalizedName && keyName.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[keyName]
      delete headers[keyName]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  // 如果 data 是普通对象，则自动加 Content-Type 的请求头
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}
