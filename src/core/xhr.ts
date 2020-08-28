import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: IAxiosRequestConfig): IAxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'GET',
      data = null,
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
    } = config
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }
    if (withCredentials) {
      request.withCredentials = withCredentials
    }

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        // 发生网络错误或超时错误时
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: IAxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request: request,
      }
      handleResponse(response)
    }

    request.onerror = function handleError() {
      // 处理网络错误
      reject(createError('Network Error', config, null, request))
    }

    request.ontimeout = function handleTimeout() {
      // 处理超时错误
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    Object.keys(headers).forEach((keyName) => {
      // 如果 data 是 null，那么设置 content-type 是没意义的，这情况下可以删掉
      if (data === null && keyName.toLowerCase() === 'content-type') {
        delete headers[keyName]
      } else {
        request.setRequestHeader(keyName, headers[keyName])
      }
    })

    if (cancelToken) {
      cancelToken.promise.then((reason) => {
        request.abort()
        reject(reason)
      })
    }

    request.send(data)

    function handleResponse(response: IAxiosResponse): void {
      // 处理状态码错误
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed wit status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
