import { IAxiosRequestConfig } from './types'
import xhr from './xhr'

function axios(config: IAxiosRequestConfig) {
  xhr(config)
}

export default axios
