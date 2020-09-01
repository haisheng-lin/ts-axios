import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from '../types'
import { buildURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import xhr from './xhr'
import transform from './transform'

export default function dispatchRequest(config: IAxiosRequestConfig): IAxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(transformResponseData)
}

function processConfig(config: IAxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: IAxiosRequestConfig): string {
  const { url, params, paramsSerializer } = config
  return buildURL(url!, params, paramsSerializer)
}

function transformResponseData(response: IAxiosResponse): IAxiosResponse {
  response.data = transform(response.data, response.headers, response.config.transformResponse)
  return response
}

function throwIfCancellationRequested(config: IAxiosRequestConfig) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
