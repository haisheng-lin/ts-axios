import {
  IAxiosRequestConfig,
  IAxiosPromise,
  Method,
  IAxiosResponse,
  IResolvedFn,
  IRejectedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './InterceptorManager'

interface IInterceptors {
  request: InterceptorManager<IAxiosRequestConfig>
  response: InterceptorManager<IAxiosResponse>
}

interface IPromiseChain<T> {
  resolved: IResolvedFn<T> | ((config: IAxiosRequestConfig) => IAxiosPromise)
  rejected?: IRejectedFn
}

export default class {
  private interceptors: IInterceptors

  constructor() {
    this.interceptors = {
      request: new InterceptorManager<IAxiosRequestConfig>(),
      response: new InterceptorManager<IAxiosResponse>()
    }
  }

  public request(url: any, config?: any): IAxiosPromise {
    // 这里兼容两种调用 api 的方式
    // 1. axios('/api/post', { method: 'post', data })
    // 2. axios({ method: 'post', data, url: '/api/post' })
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    const chain: IPromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      // request 拦截器是先添加后执行
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      // response 拦截器是先添加先执行
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
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
