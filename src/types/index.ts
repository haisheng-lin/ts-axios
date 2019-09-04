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
}

export interface IAxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: IAxiosRequestConfig
  request: any
}

export interface IAxiosPromise extends Promise<IAxiosResponse> {}

export interface IAxiosError extends Error {
  isAxiosError: boolean
  config: IAxiosRequestConfig
  code?: string | null
  request?: any
  response?: IAxiosResponse
}

export interface IAxios {
  request(config: IAxiosRequestConfig): IAxiosPromise

  get(url: string, config?: IAxiosRequestConfig): IAxiosPromise

  delete(url: string, config?: IAxiosRequestConfig): IAxiosPromise

  head(url: string, config?: IAxiosRequestConfig): IAxiosPromise

  options(url: string, config?: IAxiosRequestConfig): IAxiosPromise

  post(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise

  put(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise

  patch(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise
}

// 混合对象，既可以 new 一个实例出来，也可以调用父类的方法
export interface IAxiosInstance extends IAxios {
  (config: IAxiosRequestConfig): IAxiosPromise
  (url: string, config?: IAxiosRequestConfig): IAxiosPromise
}
