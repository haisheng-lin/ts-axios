import { IAxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/util'

// 以下的几种方法中，使用时 val1 是默认配置，val2 是用户定义的配置
function defaultStrategy(val1: any, val2: any): any {
  // 优先取 val2
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2Strategy(val1: any, val2: any): any {
  // 无论 val2 是否 undefined，都只取 val2
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrategy(val1: any, val2: any): any {
  // 依然优先取 val2
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const strategyMap = Object.create(null)

const strategyKeysDeepMerge = ['headers']
strategyKeysDeepMerge.forEach(key => {
  strategyMap[key] = deepMergeStrategy
})

const strategyKeysFromVal2 = ['url', 'params', 'data', 'auth']
strategyKeysFromVal2.forEach(key => {
  strategyMap[key] = fromVal2Strategy
})

export default function mergeConfig(
  config1: IAxiosRequestConfig,
  config2?: IAxiosRequestConfig
): IAxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)
  for (const key in config2) {
    mergeField(key)
  }

  for (const key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strategy = strategyMap[key] || defaultStrategy
    config[key] = strategy(config1[key], config2![key])
  }

  return config
}
