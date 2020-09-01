import { IAxiosRequestConfig, Method } from './types'
import { processHeaders } from './helpers/headers'
import { transformRequest, transformResponse } from './helpers/data'

const defaults: IAxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  transformRequest: [
    (data: any, headers?: any) => {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [(data: any) => transformResponse(data)],
  validateStatus: status => {
    return 200 <= status && status < 300
  }
}

const methodsNoData: Method[] = ['delete', 'get', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData: Method[] = ['post', 'patch', 'put']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
