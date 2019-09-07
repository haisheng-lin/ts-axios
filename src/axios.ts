import { IAxiosInstance, IAxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'

function createInstance(config: IAxiosRequestConfig): IAxiosInstance {
  const context = new Axios(config)
  // 如果不 bind，那么执行 request 时的 this 就会指向调用 createInstance 时的作用域
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)

  return instance as IAxiosInstance
}

const axios = createInstance(defaults)

export default axios
