//拦截request请求
//拦截uploadFile文件上传
//拦截器主要为了 请求或响应的一个预处理   例如修改请求头和对参数进行统一处理

import { useMemberStore } from '@/stores'

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
// 添加拦截器
const httpInterceptor = {
  //拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 非http开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 超时
    options.timeout = 10000

    //添加小程序请求头标识
    options.header = {
      ...options.header,
      'source-cilent': 'miniapp',
    }
    //添加token请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
    console.log(options)
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

/*自动处理用户身份验证
通过在请求头中自动携带 Authorization Token，用户无需手动在每次请求中添加验证信息。
服务器能够通过 Token 验证用户的身份，使得每个请求都带有用户身份信息，确保请求的合法性。
这对需要用户登录的接口至关重要，确保 API 的安全性。*/
