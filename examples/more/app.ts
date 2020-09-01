import axios from '../../src'

const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance.get('/more/get').then(res => console.log(res))

instance.get('/more/304').then(res => console.log(res))

instance
  .get('/more/get', {
    validateStatus: status => 200 <= status && status < 400
  })
  .then(res => console.log(res))

instance({
  url: '/more/get',
  params: new URLSearchParams('a=b%c=d')
}).then(res => console.log(res))

const sharedParams = { a: 1, b: 2 }

instance
  .get('/more/304', {
    params: sharedParams
  })
  .then(res => console.log(res))

instance
  .get('/more/304', {
    params: sharedParams,
    paramsSerializer: () => `hello world`
  })
  .then(res => console.log(res))
