export function debounce(func,delay) {
  let timer = null // 定义一个定时器标识，利用闭包
  return function() {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(func,delay)
  }
}
// 防抖函数
// debounce(func,delay) {
//   let timer = null // 定义一个定时器标识，利用闭包
//   return function(...args) {
//     if(timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       func.apply(this,args)
//     },delay)
//   }
// }, 上面是老师的写法

// 时间戳转化
export function formatDate(date, fmt) {
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}