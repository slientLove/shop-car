<template>
    <div id="head">
      <div class="content-wrap">
        <div v-if="seller" class="logo">
          <img style="width: 64px;height: 64px;" :src="seller.data.avatar" alt="">
        </div>
        <div class="content">
          <div class="title" v-if="seller">
            <span class="brand"></span>
            <span>{{seller.data.name}}</span>
          </div>
          <div class="way" v-if="seller.data">
            <span>{{seller.data.description}}/{{seller.data.deliveryTime}}分钟送达</span>
          </div>
          <div class="support" v-if="seller">
             <span class="icon" :class="classMap[seller.data.supports[0].type]"></span>
             <span class="text">{{seller.data.supports[0].description}}</span>
          </div>
        </div>
        <div class="support-count" v-if="seller" @click="show">  <!-- 用if先判断，没数据就不显示-->
           <span>{{seller.data.supports.length}}个</span>
           <span class="point">&gt;</span>
        </div>
      </div>
      <div class="bulletin-wrapper" v-if="seller" @click="show">
         <span class="bulletin-title"></span> <span class="bulletin-text">{{seller.data.bulletin}}</span>
         <i class="bulletin-point">&gt;</i>
      </div>
      <div class="background" v-if="seller">
        <img :src="seller.data.avatar" width="100%" height="100%" alt="这是图片">
      </div>
      <transition name="fade">
        <div class="detail" v-show="showDetail" >
          <!-- css striky 布局-->
          <div class="detail-wrapper clearfix" v-if="seller">
            <div class="detail-main">
              <h1 class="name">{{seller.data.name}}</h1>
              <div class="start-wrapper">
                <start :size="48" :score="seller.data.scroe"></start>
              </div>
              <div class="title-line">
                <div class="line"></div>
                <div class="line-text">优惠信息</div>
                <div class="line"></div>
              </div>
              <div class="supports" v-if="seller.data">
                <ul>
                  <li v-for="(item,index) in seller.data.supports" class="support-item">
                    <span class="icon" :class="classMap[seller.data.supports[index].type]"></span>
                    <span class="text">{{seller.data.supports[index].description}}</span>
                  </li>
                </ul>
              </div>
              <div class="title-line">
                <div class="line"></div>
                <div class="line-text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="bulletin">
                <p class="content">{{seller.data.bulletin}}</p>
              </div>
            </div>
          </div>
          <div class="detail-close">
            <span class="icon iconfont  icon-31guanbi" @click="hideDetail"></span>
          </div>
        </div>
      </transition>
    </div>
</template>
<script>
//  import axios from 'axios'
import start from '../start/start.vue';
  export default {
    name: 'head',
    props: {
      seller: {
        type: Object|String
      }
    },
    created () {
        // 定义操作类型，动态改变
        this.classMap = ['decrease', 'discount', 'special','invoice','guarantee']
    },
    data () {
      return {
        showDetail: false
      }
    },
    methods: {
      show() {
        this.showDetail = true
      },
      hideDetail () {
        this.showDetail = false
      }
    },
    components: {
      start
    }
  }
</script>
<style>
 #head{
   position: relative;
   color: #fff;overflow: hidden;
   background: rgba(7, 17, 27, 0.5);
 }
 .content-wrap{
   position: relative;
   padding:26px 12px 18px 24px;
 }
 .logo{
   display: inline-block;
   vertical-align: top;
   font-size:0;
 }
 .logo img{
   border-radius: 4px;
 }
 .content-wrap  .content{
   display: inline-block;
   margin-left: 16px;
 }
 .title{
   margin: 2px 0 6px 0;
 }
 .content-wrap .brand{
   display:inline-block;
   width: 30px;height: 18px;
   vertical-align: middle;
   background-image: url("brand@2x.png");
   background-repeat: no-repeat;
   background-size: 30px 18px;
 }
 @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
   .content-wrap .brand{
     background-image: url("brand@3x.png");
     background-size: 30px 18px;
     background-repeat: no-repeat;
   }
 }
 #head  .content  .way{
   margin-bottom: 10px;
   line-height: 12px;
   font-size: 12px;
   text-align: left;
 }
 .support{ text-align: left;}
 .support .icon{
    display: inline-block;
    width: 12px;height: 12px;
    line-height: 12px;vertical-align: middle;
    background-repeat: no-repeat;
    margin-left: 4px;
    background-size: 12px 12px;
  }
 .decrease{ background-image: url("decrease_1@2x.png");}
 .discount{ background-image: url("discount_1@2x.png");}
 .special{ background-image: url("special_1@2x.png");}
 .invoice{ background-image: url("invoice_1@2x.png");}
 .guarantee{ background-image: url("guarantee_1@2x.png");}
 .text{ font-size: 12px;line-height: 12px;}
 .support-count{
   display: inline-block;
   position: absolute;
   right: 14px;bottom: 14px;
   border-radius: 14px;
   background: rgba(0,0,0,0.2);
   padding: 0 8px;
   height: 24px;
   text-align: center;
   line-height: 24px;
 }
 .bulletin-wrapper{
   position: relative;
   height: 28px;
   padding: 0 22px 0 12px;
   line-height: 28px;
   background: rgba(7,17,27,0.2);
   text-overflow: ellipsis;
   white-space: nowrap;
   overflow: hidden;
 }
  .bulletin-title{
    display: inline-block;
    width: 22px;
    height: 12px;
    line-height: 12px;
    margin-top: 8px;
    margin-left: 12px;
    background-image: url("bulletin@2x.png");
    background-size: 22px 12px;
    background-repeat: no-repeat;
  }
 .bulletin-text{
   vertical-align: top;
   margin: 0 4px;
   font-size: 10px;
 }
  .bulletin-point{
    position: absolute;
    top: 2px;
    right: 12px;
    font-size: 10px;
  }

  .background{
    position: absolute;
    top: 0;left: 0;
    width: 100%;
    height: 100%;
    z-index:-1;
    filter: blur(10px);  /*设置透明度的 */
  }
  .detail{
    position: fixed;
    top: 0;left: 0;
    background: rgba(7,17,27,0.8);
    z-index:100;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .clearfix:after{
    display: block;
    content: "";
    clear: both;
    height: 0;
    line-height: 0;
    visibility: hidden;
  }
  .detail-wrapper{
    height: 100%;
    min-height:100%        /* 设置最小高度*/
  }
  .detail-main{
    margin-top: 64px;
    padding-bottom: 64px;     /* 这是必须的，保证内容不被覆盖*/
  }
  .name{
    line-height: 16px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
  }
  .start-wrapper{
    margin-top: 16px;
    text-align: center;
    padding: 2px 0;
  }
  .title-line{
    display: flex;
    width:80%;
    margin: 28px  auto 24px auto;
  }
  .line{
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2)
  }
  .line-text{
    padding: 0 12px;
    font-weight: 700;
    font-size: 14px;
  }
  .supports{
    width: 80%;
    margin: 0 auto;
  }
  .support-item{
    padding: 0 12px;
    margin-bottom: 12px;
  }
  .support-item:last-child{ margin-bottom: 0}
 .support-item .icon{
   display: inline-block;
   width: 16px;
   height: 16px;
   background-size: 16px 16px;
   margin-right: 6px;
   vertical-align: top;
   background-repeat: no-repeat;
 }
 .support-item .icon .decrease{background: url("decrease_2@2x.png");}
 .support-item .icon .discount{background: url("discount_2@2x.png");}
 .support-item .icon .special{background: url("special_2@2x.png");}
 .support-item .icon .invoice{background: url("invoice_2@2x.png");}
 .support-item .icon .guarantee{background: url("guarantee_2@2x.png");}
 .bulletin{
   width: 80%;
   margin: 0 auto;
 }
 .bulletin .content{
   padding: 0 12px;
   line-height:24px;
   font-size:12px;
 }
 .fade-enter-active, .fade-leave-active {    /* 加上过度动画 */
   transition: opacity .5s
 }
 .fade-enter, .fade-leave-to {
   opacity: 0
 }
  .detail-close{
    position: relative;
    width: 32px;
    height:32px;
    clear: both;
    margin-top: -64px;
    left: 50%;
    margin-left: -16px;
  }

</style>
