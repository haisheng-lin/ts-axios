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
  url: string
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
