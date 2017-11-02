<template>
     <div class="cart">
        <div class="cart-decrease  icon iconfont icon-chiping" v-show="food.count"
             @click.stop.prevent="decreaseNum"></div>
        <div class="cart-num" v-show="food.count">{{food.count}}</div>
        <div class="cart-add  icon iconfont icon-31guanzhudianpu" @click.stop.prevent="addNum"></div>
     </div>
</template>
<script>
  import Vue from 'vue';
  export default {
     props: {
       food: {
         type: Object
       }
     },
     methods: {
       addNum (event) {
         if(!event._constructed){
           return;          // 如果不是手动点击，则返回出去
         }
         if(!this.food.count){
           // 因为count是外部数据，用Vue.set() 来更新
           Vue.set(this.food, "count", 1)      // 首先检查商品是否有count属性，否则就赋值为1
         }else{
           this.food.count++;
         }
       },
       decreaseNum (event) {
         if(!event._constructed){
           return;          // 如果不是手动点击，则返回出去
         }
         if(this.food.count){
           this.food.count--;       // 将数量减少
         }
       }
     }
  }
</script>
<style>
    .cart{
     font-size: 0;
    }
   .cart-decrease{
     display: inline-block;
     padding: 6px;
     line-height: 24px;
     font-size: 24px;
     text-align: center;
   }
    .cart-decrease.icon{
     color: rgb(0,160,220);

   }
  .cart-num{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    line-height: 24px;
    text-align: center;
    padding-top: 6px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .cart-add{
    display: inline-block;
    padding: 6px;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0,160,220);
  }
</style>
