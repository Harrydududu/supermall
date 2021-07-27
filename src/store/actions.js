export default {
  // 将加入购物车的细节放入到actions里面，mutations放入的函数就可以做到和事情一一对应
  addCart(context, payload) {
    // 加入到购物车之前先查看是否有相同的商品
    // let oldProduct = null
    // for(let item of context.state.cartList) {
    //   if(payload.iid === item.iid) {
    //     oldProduct = item
    //   }
    // }
    return new Promise((resolve, reject) => {
      // 加入到购物车之前先查看是否有相同的商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('当前商品数+1')
      } else {

        context.commit('addToCart', payload)
        resolve('添加了新的商品')
      }
    })
    // state.cartList.push(payload)
  }
}