<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <v-head :seller="seller"></v-head>
    <div class="tab">
      <router-link to="/goods">商品</router-link>
      <router-link to="/ratings">评论</router-link>
      <router-link to="/seller">商家</router-link>
    </div>
    <keep-alive>          <!-- 保证每个组件的状态不被改变 -->
      <router-view :seller="seller">   <!-- 组件通信，需要在这里绑定值 -->  
      </router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import head from './components/head/head.vue'
  import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      seller: ""
    }
  },
  created () {
    axios.get('api/seller').then((response) => {
      this.seller = Object.assign({}, this.seller, response.data);
      console.log( this.seller);
    }).catch((error) => {
      console.log("网络错误");
    })
  },
  components: {
    'v-head': head
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  .tab{ display: flex;width: 100%;height: 40px; line-height: 36px; justify-content: space-around;}
  .router-link-active{ color: red;}
</style>
