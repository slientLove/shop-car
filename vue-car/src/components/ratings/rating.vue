<template>
  <div class="rating" ref="ratings">
      <div class="rating-content">
         <div class="showDetail">
            <div class="showDetail-left">
              <h1>{{ seller.data.score }}</h1>
              <div class="titles">综合评价</div>
              <p class="rank">高于周边商家{{seller.data.rankRate}}% </p>
            </div>
            <div class="showDetail-right">
               <div class="score-wrap" v-if="seller.data.serviceScore">
                 <span class="titles">服务态度</span>
                 <start :size="36" :score="seller.data.serviceScore"></start>
                 <span class="score">{{seller.data.serviceScore}}</span>
               </div>
               <div class="score-wrap">
                 <span class="titles">商品评分</span>
                 <start :size="36" :score="seller.data.foodScore"></start>
                 <span class="score">{{ seller.data.foodScore }}</span>
               </div>
               <div class="delivery-wrap">
                 <span class="titles">送达时间</span>
                 <span class="delivery">{{ seller.data.deliveryTime +"分钟" }}</span>
               </div>
            </div>
         </div>
         <split></split>   <!-- 组件-->
         <!-- 组件动态改变数据 -->
         <ratingSelect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingSelect>   
         <div class="rating-wrap">
           <ul>
              <li class="rating-item" v-for="(rating,index) in ratings" :key="index" v-show="needShow(rating.rateType,rating.text)">
                 <div class="avatar">
                   <img height="28px" width="28px" :src="rating.avatar" alt="图像">
                 </div>
                 <div class="content">
                    <div class="name">
                        <div class="userName">{{rating.username}}</div>
                        <div class="time">{{ rating.rateTime|formatime }}</div>
                    </div>
                    <div class="star-wrap">
                      <start :size="36" :score="rating.score"></start>
                      <span class="delivery">{{ rating.deliveryTime?rating.deliveryTime:50}}分钟送达</span>
                    </div>
                    <p class="text">{{ rating.text }}</p>
                    <div class="recommend" v-show="rating.recommend&&rating.recommend.length">
                       <span></span>
                       <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
                    </div>
                 </div>
              </li>
           </ul>
         </div> 
      </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import start from "../start/start.vue";
import split from "../split/split.vue";
import axios from "axios";
import formatime from "../../common/js/date";
import ratingSelect from "../ratingSelect/ratingSelect.vue";
  const ALL = 0;
  export default {
    props:{                // 父子组件传值
      seller:{
        type:Object|String
      }
    },
    data () {
      return {
         ratings: [],
         selectType: ALL,
         onlyContent: true,
      }
    },
    created() {
       axios.get("/api/ratings").then( (response) =>{
          this.ratings = response.data.data;
          // console.log( this.ratings );
       }).catch( (err) => {
         console.log(err);
       });
       this.$nextTick( () => {
          this.scroll = new BScroll( this.$refs.ratings,{
            click: true
          });
       })
    },
    methods:{
       needShow(type,text){
         if(this.onlyContent&&!text){
           return false;
         }
         if(this.selectType==ALL){
           return true;
         }else{
           return type===this.selectType;
         }
       },
       selectRating(type){
         this.selectType = type;     // 接收从子元素传过来的值
         this.$nextTick(() => {
          this.scroll.refresh();
        });
       },
       toggleContent(){
         this.onlyContent = !this.onlyContent;   // 点击取反
         this.$nextTick(() => {
           this.scroll.refresh();
        });
       }
    },
    filters:{
      formatime(oTime){
        let date = new Date(oTime);
        return formatime(date);
      }
    },
    components:{
      start,
      split,
      ratingSelect
    }
  }
</script>
<style lang="scss" scoped="" type="text/css">
  .rating {
      position:absolute;
      top: 176px;
      bottom:0;
      left: 0;
      width: 100%;
      overflow:hidden;
      .showDetail {
         display: flex;
         padding: 18px 0;
        .showDetail-left {
          flex: 0 0 137px;
          padding: 6px 0;
          width: 137px;
          border-right: solid 1px rgba(7,17,27,0.1);
          text-align: center;
          @media only screen and (max-width:320px){
            flex: 0 0 120px;
            width: 120px;
          }
          h1{
            margin-bottom: 8px;
            line-height: 28px;
            font-size: 24px;
            color: rgb(255,253,0)
          }
          .titles {
            margin-bottom: 8px;
            line-height: 12px;
            font-size: 12px;
            color: rgb(7,17,27);
          }
          .rank {
            font-size:10px;
            line-height: 10px;
            color:rgb(147,153,159);
          }
        }
        @at-root .showDetail-right {
          flex: 1;
          padding: 6px 0 6px 24px;
          @media screen and (max-width:320px){
            padding-left: 6px;
          }
          .score-wrap{
            margin-bottom: 8px;
            font-size: 0;
            .titles {
              line-height: 18px;
              font-size: 12px;
              display:inline-block;
              vertical-align: top;
            }
            .start {
              display: inline-block;
              vertical-align: top;
              margin: 0 12px;
            }
            .score {
              display: inline-block;
              line-height: 18px;
              vertical-align: top;
              font-size: 12px;
              color: rgb(255,153,0);
            }
          }
          .delivery-wrap{
            font-size: 0;
            .titles{
              line-height: 18px;
              font-size: 12px;
              color: rgb(7,17,27);
            }
            .delivery{
              margin-left: 12px;
              font-size: 12px;
              color: rgb(147, 153, 159);
            }
          }
        }
      }
      .rating-wrap{
        padding: 0 18px;
        @at-root .rating-item{
           display:flex;
           padding: 18px 0;
           border-bottom: solid 1px rgba(7,17,27,0.1);
          .avatar{
            flex: 0 0 28px;
            width: 28px;
            margin-right: 12px;
            img{
              border-radius: 50%;
            }
          }
          .content{
             flex: 1;
            .name{
               display: flex;
               justify-content: space-between;
               margin-bottom: 10px;
               font-size: 12px;
               line-height: 12px;
              .userName{
                 color:rgb(7, 17, 27);
               }
              .time{
                 color: rgb(147, 153, 159);
               }
            }
            .star-wrap{
               font-size: 0;
               margin-bottom: 6px;
                font-size: 12px;
                line-height: 12px;
              .start{
                 display: inline;
                 margin-right: 6px;
                 vertical-align: top;
                 color: rgb(147,153,159);
               }
              .delivery{
                 display: inline;
                 color: rgb(147, 153, 159);
              }
             }
            .text{
               margin-bottom: 8px;
               font-size: 12px;
               line-height: 18px;
               color: rgb(7,17,27);
            }
            .recommend{
              line-height: 16px;
              font-size: 0;
              .item{
                display: inline;
                margin: 0 8px 4px 0;
                font-size: 10px;
                border: solid 1px rgba(7,17,27,0.1);
                border-radius: 1px;
                background: #fff;
                color: rgb(147,153,159);
              }
            }
          }
        }
      }
  }
</style>
