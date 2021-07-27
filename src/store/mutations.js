import Vue from 'vue'


export default {
  addCounter(state,payload) {
    payload.count += 1
    // 此举的目的是改变数组，让vuex检测到改变，响应式
    state.cartList.push('a')
    state.cartList.pop()
  },
  addToCart(state,payload) {
    payload.checked = true
    payload.count = 1
    state.cartList.push(payload)
  },
  checkClick (state,payload) {
    // console.log("mutations的改变");
    // let product = state.cartList.find(item => item.iid === payload)
    // 这里的payload就算index，
    let newObj = state.cartList[payload]
    newObj.checked = !newObj.checked
    // 要用改变数组的响应式方法，不然直接改变数组里的属性是检测不到的，要改变整个数组
    state.cartList.splice(payload,1,newObj)
    // console.log(typeof payload);
    // console.log(product);
    // product.newPrice += 1
    // product.checked = !product.checked
  },
  allCheckClick(state,payload) {
    // if(payload) {
    //   state.cartList.forEach(item => {
    //     item.checked = false
    //     console.log(item.checked);
    //   })
    // }else {
    //   state.cartList.forEach(item => {
    //     item.checked = true
    //     console.log(item.checked);
    //   })
    // }
    // state.cartList.push('a')
    // state.cartList.pop()
    if(payload) {
      for(let i=0; i<state.cartList.length; i++) {
        let obj1 = state.cartList[i]
        obj1.checked = false
        // state.cartList.splice(i,1,obj1)
        Vue.set(state.cartList,i,obj1)
      }
    }else {
      for(let i=0; i<state.cartList.length; i++) {
        let obj1 = state.cartList[i]
        obj1.checked = true
        // state.cartList.splice(i,1,obj1)
        Vue.set(state.cartList,i,obj1)
      }
      
    }
    // state.cartList.push('a')
    // state.cartList.pop()
  }
}