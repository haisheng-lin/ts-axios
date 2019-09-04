import { IResolvedFn, IRejectedFn } from '../types'

interface IInterceptor<T> {
  resolved: IResolvedFn<T>
  rejected?: IRejectedFn
}

export default class InterceptorManager<T> {
  private interceptors: Array<IInterceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  public use(resolved: IResolvedFn<T>, rejected?: IRejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  public eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }

  public forEach(fn: (interceptor: IInterceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor) {
        fn(interceptor)
      }
    })
  }
}
