<template>
  <div>
     <div class="goods" >
        <div class="menu-wrapper"  ref="menuWrapper">
          <ul>
              <!-- 数据处理要精准 -->
              <li v-for="(item, index) in goods.data" class="menu-item" v-if="item"
                  ref="menuList" :class="{'current':_currentIndex===index}"  @click='_selectMenu(index,$event)' :key="index">
                  <span class="menu-text">
                     <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                  </span>
              </li>
          </ul>
        </div>
        <div class="goods-wrapper" ref="goodsWrapper">
          <ul>
            <li v-for="item in goods.data" ref="foodList">
                <h1 class="title">{{item.name}}</h1>
                <ul>
                  <li v-for="food in item.foods" class="food-item">
                     <div class="img-icon">
                       <img width="57" height="57" :src="food.icon" alt="分类图片">
                     </div>
                    <div class="food-content">
                        <h2 class="name">{{ food.name}}</h2>
                        <p class="desc">{{food.description}}</p>
                        <div class="extra">
                          <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                        </div>
                        <div class="price">
                        <span class="now">￥{{food.price}}</span><span class="old">￥{{food.oldPrice}}</span>
                      </div>
                    </div>
                    <div class="cartWrap">
                      <cartcontrall :food="food"></cartcontrall>   <!-- 在此处将商品数据传给子组件 -->
                    </div>
                  </li>
                </ul>
            </li>
          </ul>
        </div >
        <div class="shopCart">
             <shopcart v-if="seller" :deliveryPrice="seller.data.deliveryPrice" :minPrice="seller.data.minPrice"
                       :selectedFoods="selectedFoods"></shopcart>
        </div>
     </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import Vue from 'vue';
  import shopcart from '../shopcart/shopcart.vue'
  import scroll from 'better-scroll'       // 滚动的一个插件
  import cartcontrall from  "../cartcontrall/cartcontrall.vue"
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object|String,
        default: ''
      }
    },
    data () {
      return {
        goods: [],
        classMap:['decrease', 'discount', 'special','invoice','guarantee'],
        listHeight: [],               // 存储左侧商品每一个对应的Y轴高度，存在数组里面
        scrollY: 0,               // y轴滚动高度
      }
    },
    computed: {
       _currentIndex () {         // 计算当前位置的索引
           for(let i=0;i<this.listHeight.length;i++){
             let height1 = this.listHeight[i];
             let height2 = this.listHeight[ i+1 ];
             // 商品不是最后一个的时候
             if(!height2||(this.scrollY>=height1&&this.scrollY<=height2)){
                  this.followIndex(i);
                   console.log(i);
                  return i;
             }
           }
           return 0;        // 没有数据就返回0
       },
       selectedFoods () {         // 计算已经选择商品,当子组件中属性改变时，数据会重新计算
         let arr = [];
         for( let foods in this.goods.data){
              let food = this.goods.data[foods].foods;
               for(let i in food){
                 if(food[i].count){
                   arr.push(food[i]);
                 }
               }
         }
         return arr;
      }
    },
    created () {
      axios.get('api/goods').then((response) => {
        if(response.data.errno===ERR_OK){
          this.goods = response.data ;
          this.$nextTick( () =>{          // 调用这个方法可以在数据发生变化后，重新渲染DOM,不然这个方法可能不起作用
            this._initScroll();
            this._calculateHeight();     // 初始化的时候计算整个右侧列表的高度
          })
        }
      });
    },
    methods: {
      _initScroll () {               // 插件初始化
        this.menuScroll = new scroll(this.$refs.menuWrapper,{
          click: true     // 此处要开启点击事件，不然无法点击
        });
        this.foodScroll = new scroll(this.$refs.goodsWrapper,{
          click: true,
          probeType: 3
        });
        this.foodScroll.on("scroll",(pos) =>{
          // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
           if(pos.y<=0){
             this.scrollY = Math.abs(Math.round(pos.y));
           }
        })
      },
       _calculateHeight () {         // 获取一系列高度
         let foodLists = this.$refs.foodList;
         let height = 0;
         this.listHeight.push(height);
         for(let i=0;i<foodLists.length;i++){
           let oHeight = foodLists[i];
           height+=oHeight.clientHeight;
           this.listHeight.push(height);
         }
         console.log( this.listHeight );
      },
       followIndex (index) {
         let menuLists = this.$refs.menuList;
         let el = menuLists[index];
        this.menuScroll.scrollToElement(el, 300, 0, -100);
      },
      _selectMenu (index,event) {     // 点击菜单选择不同选项
          if(!event._constructed){       // 插件本身带有一定影响，看有没有点击，针对浏览器，浏览器会有两次点击
              return;
          }
          let foodLists = this.$refs.foodList;
          let el = foodLists[index];
          this.foodScroll.scrollToElement(el, 300);    // 让左侧的商品滚动到相应位置
      },
    },
    components: {
      shopcart,
      cartcontrall
    }
  }
</script>
<style>
  .goods{
    width: 100%;
    display: flex;
    position: absolute;
    overflow: hidden;
    top: 174px;
    bottom: 46px;
    background: rgba(7,17,27,0.1);
  }
  .goods   .menu-wrapper{
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }
  .menu-wrapper  .current {
    position: relative;
    z-index: 10;
    margin-top: -1px;
    background: #fff;
    font-weight:700;
  }
  .goods  .goods-wrapper{
    flex: 1;
  }
  .menu-item{
    display: table;
    width: 56px;
    height: 54px;
    padding: 0 12px;
    line-height: 12px;
  }
  .menu-text  .icon{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    background-size: 12px 12px;
    margin-right: 2px;
    background-repeat: no-repeat;
  }
  .icon  .decrease{ background-image: url("decrease_3@3x.png")}
  .icon  .discount{ background-image: url("discount_3@3x.png")}
  .icon  .special{ background-image: url("special_3@3x.png")}
  .icon  .invoice{ background-image: url("invoice_3@3x.png")}
  .icon  .guarantee{ background-image: url("guarantee_3@3x.png")}
  .menu-text{
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    font-size: 12px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    line-height: 14px;
  }
  .title{
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147,153,159);
    background:#f3f5f7 ;
  }
  .food-item{
    border-bottom: solid 1px #f3f5f7;
    display: flex;
    margin: 18px;
    padding-bottom: 18px;
    /* background: rgba(7,17,27,0.1); */
    position: relative;
  }
  .food-item:last-child{
    margin-bottom: 0;
    border: none;
  }
  .img-icon{
    flex: 0 0 57px;
    margin-right: 10px;
  }
  .food-content{
    padding-left: 10px;
    flex: 1;
  }
  .food-content  .name{
    text-align: left;
    margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    color: rgb(7,17,27);
  }
  . desc, .extra{
    font-size: 10px;
    line-height: 10px;
    color: rgb(147,153,159);
  }
  .extra  .count{
    margin-right: 12px;
  }
  .price{
    font-weight: 700;
    line-height: 24px;
    display: inline-block;
  }
  .price  .now{
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240,20,20);
  }
  .price  .old{
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .cartWrap{
    position: absolute;
    right: 2px;
    bottom: 12px;
  }
</style>
