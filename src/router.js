import Vue from 'vue'
import Router from 'vue-router'
const Component404 = resolve => require(['@/components/Component404'],resolve)
// import Home from '@/views/Home.vue'
// const Home = resolve => require(['@/views/Home'],resolve)

// import Login from '@/views/Login.vue'

// 世界杯
const WorldCupList = resolve => require(['@/views/WorldCupList'],resolve)
// // ---slider线性图---
// const SliderLineImg = resolve => require(['@/views/SliderLineImg'],resolve)
// // ---slider线性直方图---
// const Histogram = resolve => require(['@/views/Histogram'],resolve)
// // ---饼状图---
// const CakeImg = resolve => require(['@/views/CakeImg'],resolve)

Vue.use(Router)
const routes = [
  {
    path: '/activity/admin',
    redirect: '/activity/admin/worldcup'
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login
  // },
  {
    path: '/activity/admin/worldcup',
    redirect: '/activity/admin/worldcup/1'
  },
  {
    path:'/activity/admin/worldcup/:page',
    component:WorldCupList,
    name:'世界杯',
  },
  // {
  //   path: '/sliderlineimg',
  //   name: 'slider线性图',
  //   component: SliderLineImg
  // },
  // {
  //   path: '/sliderhistogram',
  //   name: 'slider直方图',
  //   component: Histogram
  // },
  // {
  //   path: '/cakeimg',
  //   name: '饼状图',
  //   component: CakeImg
  // },
  {
    path:'*',
    component: Component404
  },
]
export default new Router({
  mode: 'history',
  routes: routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})
