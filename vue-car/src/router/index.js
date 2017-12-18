import Vue from 'vue'
import Router from 'vue-router'
import head from '../components/head/head.vue'
import good from '../components/goods/goods.vue'
import seller from '../components/seller/seller.vue'
import ratings from '../components/ratings/rating.vue'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'good',
      component: good
    },
    {
      path: '/goods',
      name: 'good',
      component: good
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    },{
      path: '/ratings',
      name: 'ratings',
      component: ratings
    }
  ]
})
