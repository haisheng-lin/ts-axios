export type Method =
  | 'get'
  | 'GET'
  | 'put'
  | 'PUT'
  | 'post'
  | 'POST'
  | 'patch'
  | 'PATCH'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'

export interface IAxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: IAxiosTransformer | IAxiosTransformer[]
  transformResponse?: IAxiosTransformer | IAxiosTransformer[]
  cancelToken?: CancelToken

  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string

  [p: string]: any
}

export interface IAxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: IAxiosRequestConfig
  request: any
}

export interface IAxiosPromise<T = any> extends Promise<IAxiosResponse<T>> {}

export interface IAxiosError extends Error {
  isAxiosError: boolean
  config: IAxiosRequestConfig
  code?: string | null
  request?: any
  response?: IAxiosResponse
}

export interface IAxios {
  defaults: IAxiosRequestConfig

  interceptors: {
    request: IAxiosInterceptorManager<IAxiosRequestConfig>
    response: IAxiosInterceptorManager<IAxiosResponse>
  }

  request<T = any>(config: IAxiosRequestConfig): IAxiosPromise<T>

  get<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>

  delete<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>

  head<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>

  options<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>
}

// 混合对象，既可以 new 一个实例出来，也可以调用父类的方法
export interface IAxiosInstance extends IAxios {
  <T = any>(config: IAxiosRequestConfig): IAxiosPromise<T>
  <T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
}

export interface AxiosStatic extends IAxiosInstance {
  create(config?: IAxiosRequestConfig): IAxiosInstance
  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

export interface IAxiosInterceptorManager<T> {
  use(resolved: IResolvedFn<T>, rejected?: IRejectedFn): number
  eject(id: number): void
}

export interface IResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface IRejectedFn {
  (error: any): any
}

export interface IAxiosTransformer {
  (data: any, headers?: any): any
}

export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}
