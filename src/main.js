import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Timeline,
  TimelineItem,
  Loading
} from 'element-ui';
import echarts from 'echarts'


Vue.config.productionTip = false
Vue.use(Timeline);
Vue.use(TimelineItem); Vue.use(Loading);
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
