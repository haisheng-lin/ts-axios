import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from './types'
import { buildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'
import xhr from './xhr'

function axios(config: IAxiosRequestConfig): IAxiosPromise {
  processConfig(config)
  return xhr(config).then(transformResponseData)
}

function processConfig(config: IAxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: IAxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: IAxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: IAxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(response: IAxiosResponse): IAxiosResponse {
  response.data = transformResponse(response.data)
  return response
}

export default axios
