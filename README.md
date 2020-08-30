# ts-axios

使用 TypeScript 实现 axios

### xsrf 防御

用户登录成功后，服务端向浏览器通过注入 cookie 形式设置 csrf token，该 token 是通过某种加密算法生产的；在浏览器发送请求时需从 cookie 中读取 csrf token，并加入到请求 header 中。
