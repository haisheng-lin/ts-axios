import axios from '../../src'

const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance.get('/more/get').then(res => console.log(res))

instance.get('/more/304').then(res => console.log(res))

instance
  .get('/more/304', {
    validateStatus: status => 200 <= status && status < 400
  })
  .then(res => console.log(res))
