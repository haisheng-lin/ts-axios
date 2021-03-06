import { IAxiosStatic, IAxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(config: IAxiosRequestConfig) {
  const context = new Axios(config)
  // 如果不 bind，那么执行 request 时的 this 就会指向调用 createInstance 时的作用域
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)

  return instance as IAxiosStatic
}

const axios = createInstance(defaults)

axios.create = function(config: IAxiosRequestConfig) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
