import Vue from 'vue'
import VueRouter from 'vue-router'
import Daily from "../views/Daily";
import Detail from "../views/Detail";
Vue.use(VueRouter)
const routes = [
  {
    path: '/daily',
    name: 'Daily',
    component: Daily,
    meta: {
      title: '硕眼舆情'
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta: {
      title: '热点事件详情'
    }
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // to来自  from  去哪
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = "硕眼舆情"
  }
  next()
})
export default router
