import axios from "axios";

// 这是第一种方法
// export function request (config,success,failure) {
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })

//   // 发送真正的网络请求
//   instance(config)
//   .then(res => {
//     success(res)
//   }).catch(res => {
//     failure(res)
//   })
// }

// 第二种
export function request (config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // axios的拦截器，把config信息拦截下来了
  // 1.请求拦截
  instance.interceptors.request.use(config => {
    // 拦截器的作用
    // 筛选符合服务器要求的信息
    // 更改config的内容
    // 比如每次发送请求时，都希望在页面中显示一个请求的加载动画图标
    // console.log(config);
    // 要在这里把config返回出去
    return config
  },err => {
    // console.log('错误');
    console.log(err);
  }) // 两个参数，一个是成功时的，一个是失败

  // 2.响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    // console.log('拦截');
    return res.data // 拦截之后返回data就可以了
  },err => {
    console.log(err);
  })

  // 发送真正的网络请求
  return instance(config) // 因为这个东西返回的就是一个promise，所以在main那里返回调用then
}