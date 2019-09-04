import { IAxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): IAxiosInstance {
  const context = new Axios()
  // 如果不 bind，那么执行 request 时的 this 就会指向调用 createInstance 时的作用域
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)

  return instance as IAxiosInstance
}

const axios = createInstance()

export default axios
