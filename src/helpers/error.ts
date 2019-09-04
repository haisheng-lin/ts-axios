import { IAxiosRequestConfig, IAxiosResponse } from '../types'

class AxiosError extends Error {
  public isAxiosError: boolean
  public config: IAxiosRequestConfig
  public code?: string | null
  public request?: any
  public response?: IAxiosResponse

  constructor(
    message: string,
    config: IAxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: IAxiosResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    // 为了解决 TypeScript 的一些坑
    // 在继承内置类（这里就是 Error）时候
    // 1. 可能方法会是 undefined
    // 2. instanceof，譬如 (new FooError()) instanceof FooError 为 false
    // 原因应该是这个对象实例的原型没有指向类
    // 所以手动给再赋值一次它的原型，就可以解决问题
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: IAxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: IAxiosResponse
): AxiosError {
  const error = new AxiosError(message, config, code, request, response)
  return error
}
