import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from './types'

export default function xhr(config: IAxiosRequestConfig): IAxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'GET', data = null, headers, responseType } = config
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: IAxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request: request
      }
      resolve(response)
    }

    Object.keys(headers).forEach(keyName => {
      // 如果 data 是 null，那么设置 content-type 是没意义的，这情况下可以删掉
      if (data === null && keyName.toLowerCase() === 'content-type') {
        delete headers[keyName]
      } else {
        request.setRequestHeader(keyName, headers[keyName])
      }
    })

    request.send(data)
  })
}
