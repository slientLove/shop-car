<template>
  <div>
     <div class="shop-wrap">
       <div class="shop-content">
          <div class="content-left" @click="toggle">
             <div class="logo-wrap">
                 <div class="shop-logo" :class="{'highlight':totallCount>0}">
                    <i class="icon iconfont icon-gouwucheman" :class="{'highlight':totallCount>0}"></i>
                 </div>
               <div class="num" v-show="totallCount>0">{{totallCount}}</div>
             </div>
             <div class="price" :class="{'highlight':totallPrice>0}">￥{{totallPrice}}</div>
             <div class="dist">另需配送费{{deliveryPrice}}元</div>
          </div>
          <div class="content-right">
             <div class="pay" :class="payClass">
               {{descPay}}
             </div>
          </div>
       </div>
       <transition name="fade">
         <div class="showdetail" v-show="listShow">    <!-- 根据商品数量判断是否显示 -->
           <div class="headlist">
             <h1 class="list-title">购物车</h1>
             <span class="empty" @click="empty">清空</span>
           </div>
           <div class="list-content" ref="listContent">
             <ul>
               <li class="food" v-for="food in selectedFoods">
                 <span class="name">{{food.name}}</span>
                 <div class="price">
                   <span>￥{{food.price * food.count}}</span>
                 </div>
                 <div class="addlist">
                   <cartcontrall :food="food"></cartcontrall>     <!-- 此处的绑定一定要对应-->
                 </div>
               </li>
             </ul>
           </div>
         </div>
       </transition>
     </div>
    <transition name="fold">
      <div class="show-mask" v-show="listShow"></div>
    </transition>
  </div>
</template>
<script>
  import cartcontrall from  "../cartcontrall/cartcontrall.vue"
  import BScroll from 'better-scroll'
   export default {
        data() {
          return {
            fold: true
          }
        },
        props: {
          selectedFoods: {
            type: Array|Object,
            default () {
              return [
                {
                  price: 10,
                  count: 2
                }
              ]
            }
          },
          deliveryPrice: {
            type: Number ,        // 配送费
            default: 0
          },
          minPrice: {
            type: Number,         // 最小起送费
            default: 0
          }
        },
        computed: {
          totallPrice () {
            let totall = 0;          // 计算总的金额ss
            this.selectedFoods.forEach( food => totall+=food.count*food.price);
            console.log(totall);
            return totall;
          },
          totallCount () {          // 计算总的数量
            let count = 0;
            this.selectedFoods.forEach( food =>count+=food.count )
            return count;
          },
          descPay () {
            if(this.totallPrice===0){
              return `${this.minPrice}元起送`;
            }else if( this.totallPrice<this.minPrice){
              let dist = this.minPrice - this.totallPrice;
              return `还差￥${dist}元起送`;
            }else{
              return `去结算`;
            }
          },
          payClass () {
            if(this.totallPrice<this.minPrice){
              return 'not-enough';
            }else{
              return 'enough';
            }
          },
          listShow() {
            if(!this.totallCount){
              this.fold = true;
              return false;
            }
            let mask = !this.fold        // 判断显示框的状态,还要结合点击购物车事件进行判断
            if(mask){
                this.$nextTick( () => {
                   if(!this.scroll){
                     this.scroll = new BScroll(this.$refs.listContent,{    // 操作dom元素
                        click: true
                     });
                   }else{
                     this.scroll.refresh();
                   }
                })
            }
            return mask
          }
        },
        methods: {
          empty() {
            return this.selectedFoods.map( item => item.count=0)    // 清空的时候将每个商品的数量清空
          },
          toggle() {
            if (!this.totallCount) {
              return;
            }else{
              this.fold = !this.fold;
            }
          }
        },
        components: {
         cartcontrall
       }
   }
</script>
<style>
  .shop-wrap{
    width: 100%;
    height: 48px;
    position: fixed;
    bottom: 0;
    left: 0;
   z-index: 101;
  }
  .shop-content{
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255,255,255,0.4);
  }
  .content-left{
    flex: 1;
  }

  .content-right{
    flex: 0 0 105px;
    width: 105px;
  }
  .logo-wrap{
    width: 56px;
    height: 56px;
    display: inline-block;
    box-sizing: border-box;
    background: #141d27;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    border-radius: 50%;
  }
  .shop-logo{
    width: 100%;
    height: 100%;
    vertical-align: top;
    border-radius: 50%;
    text-align: center;
    background: #2b343c;
  }
  .shop-logo.highlight{
    background: rgb(0,160,220);
  }
  .shop-wrap  .iconfont{
    text-align: center;
   padding-top: 8px;
  }
  .shop-wrap  .iconfont  .highlight{
       color: #fff;
  }
  .num{
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height:16px;
    text-align: center;
    font-size: 10px;
    color: #fff;
    font-weight: 700;
    border-radius: 16px;
    background: rgb(240,20,20);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4) ;
  }

  .shop-wrap  .price{
      display: inline-block;
      margin-top: 12px;
      line-height: 24px;
      vertical-align: top;
      padding-right: 12px;
      box-sizing: border-box;
      border-right: solid 1px rgba(255,255,255,0.1);
      font-weight: 700;
      font-size: 16px;
  }
  .price.highlight{
    color: #fff;
  }
  .shop-wrap  .dist{
    display: inline-block;
    vertical-align: top;
    margin: 12px 0 0 12px;
    line-height: 24px;
    font-size: 10px;
  }
  .pay{
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-weight: 700;
    font-size: 12px;
    background: #2b333b;
  }
  .enough{
    background: #00b43c;
    color: #fff
  }
  .not-enough{
    background: #2b333b;
  }
  .icon-gouwucheman:before{
    display: block;
    padding-top: 12px;
  }
  .showdetail{
    position: absolute;
    bottom: 50px;
    left: 0;
    width: 100%;
    z-index: -1;
  }
  .headlist{
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: solid 1px rgba(7,17,27,0.1);
  }
  .list-title{
    float: left;
    font-size: 14px;
    color: rgb(7,17,27);
  }
  .empty{
    float: right;
    font-size: 14px;
    color: rgb(0,160,220);
  }
  .showdetail  .list-content{
    max-height:217px;
    padding: 0 18px;
    overflow: hidden;
    background: #fff;
  }
  .food{
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: solid 1px rgba(7,17,27,0.1);
  }
  .name{
     line-height: 24px;
     font-size: 14px;
    color: rgb(7,17,27);
  }
  .list-content  .price{
    position: absolute;
    right: 150px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight:700;
    color: rgb(240,20,20);
  }
  .addlist{
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  .show-mask{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    backdrop-filter: blur(10px);       /* 显示模糊度 */
    opacity: 1;
    background: rgba(7,17,27,0.6);
  }

  /* 加上动画效果 */
  .fade-enter-active, .fade-leave-active{
    opacity: 1;
    transition: all 0.5s ;
  }
  .fade-enter, .fade-leave-active{
    background: rgba(7,17,27,0);
    opacity: 0;
  }
  .fold-enter-active,.fold-leave-active{
    opacity: 1;
    transition: all 0.5s ;
  }
  .fold-enter,.fold-leave-active{
    background: rgba(7,17,27,0);
    opacity: 0;
  }

</style>
