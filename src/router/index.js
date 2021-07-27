import Vue from 'vue'
import VueRouter from 'vue-router'

// 对组件进行懒加载，引入
// const Home = () => import()
const Home = ()=> import('views/home/Home.vue')
const Category = ()=> import('views/category/Category.vue')
const Cart = ()=> import('views/cart/Cart.vue')
const Profile = ()=> import('views/profile/Profile.vue')
const Detail = ()=> import('views/detail/Detail.vue')


// 1.安装插件
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {footShow: true }
  },
  {
    path: '/category',
    component: Category,
    meta: {footShow: true }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {footShow: true }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {footShow: true }
  },
  {
    // 这个是params，带参数的
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
