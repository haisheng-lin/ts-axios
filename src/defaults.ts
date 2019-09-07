import { IAxiosRequestConfig, Method } from './types'

const defaults: IAxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
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
