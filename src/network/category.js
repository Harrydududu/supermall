import {request} from './request'

export function getCategory() {
  return request({
    url: '/category'
  })
}

// export function getHomeGoods(type,page) {
//   return request({
//     url: '/home/data',
//     params: {
//       type,
//       page
//     }
//   })
// }