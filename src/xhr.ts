import { IAxiosRequestConfig } from './types'

export default function xhr(config: IAxiosRequestConfig) {
  const { url, method = 'GET', data = null, headers } = config
  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach(keyName => {
    // 如果 data 是 null，那么设置 content-type 是没意义的，这情况下可以删掉
    if (data === null && keyName.toLowerCase() === 'content-type') {
      delete headers[keyName]
    } else {
      request.setRequestHeader(keyName, headers[keyName])
    }
  })

  request.send(data)
}
