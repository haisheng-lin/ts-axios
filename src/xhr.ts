import { IAxiosRequestConfig } from './types'

export default function xhr(config: IAxiosRequestConfig) {
  const { url, method = 'GET', data = null, params } = config
  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)
  request.send(data)
}
