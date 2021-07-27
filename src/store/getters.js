export default {
  cartList(state) {
    return state.cartList
  },
  cartListLength(state) {
    return state.cartList.length
  },
  // totalPrice(state) {
  //   const cartList = state.cartList;
  //   return '￥' + cartList.filter(item => {
  //     return item.checked
  //   }).reduce((preValue, item) => {
  //     return preValue + item.count * item.newPrice
  //   }, 0)
  // },
  totalCount(state) {
    const cartList = state.cartList;
    return cartList.filter(item => {
      return item.checked
    }).reduce((preValue, item) => {
      return preValue + item.count 
    }, 0)
  },
}