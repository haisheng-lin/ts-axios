import { IAxiosRequestConfig } from './types'
import { buildURL } from './helpers/url'
import xhr from './xhr'

function axios(config: IAxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

function processConfig(config: IAxiosRequestConfig): void {
  config.url = transformURL(config)
}

function transformURL(config: IAxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

export default axios
