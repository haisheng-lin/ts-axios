import { IAxiosRequestConfig, IAxiosPromise, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class {
  public request(config: IAxiosRequestConfig): IAxiosPromise {
    return dispatchRequest(config)
  }

  public get(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this.requestMethodWithoutData('get', url, config)
  }

  public delete(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this.requestMethodWithoutData('delete', url, config)
  }

  public head(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this.requestMethodWithoutData('head', url, config)
  }

  public options(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this.requestMethodWithoutData('options', url, config)
  }

  public post(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this.requestMethodWithData('post', url, data, config)
  }

  public put(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this.requestMethodWithData('put', url, data, config)
  }

  public patch(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this.requestMethodWithData('patch', url, data, config)
  }

  private requestMethodWithoutData(method: Method, url: string, config?: IAxiosRequestConfig) {
    return this.request(Object.assign(config || {}, { method, url }))
  }

  private requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: IAxiosRequestConfig
  ) {
    return this.request(Object.assign(config || {}, { method, url, data }))
  }
}
