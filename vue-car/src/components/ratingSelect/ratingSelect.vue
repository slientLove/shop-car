<template>
   <div class="ratingselect">
       <div class="rating-type">
           <span @click="select(0,$event)" class="select-type positive" :class="{'active':selectType===0}">{{desc.all}}
                <span class="count">{{ratings.length}}</span></span>
           <span @click="select(1,$event)" class="select-type positive" :class="{'active':selectType===1}">{{desc.positive}}
                <span class="count">{{positives.length}}</span></span>
           <span @click="select(2,$event)" class="select-type negative" :class="{'active':selectType===2}">{{desc.negative}}
                <span class="count">{{negatives.length}}</span></span>
       </div>
       <div class="switch" @click="toggleSelect" :class="{'on':onlyContent}">
           <span class="icons icon iconfont icon-31xuanzhong"></span>
           <span class="texts">只看有内容的评价</span>
       </div>
   </div>
</template>
<script>
    const ALL = 0;
    const POSITIVE = 1;
    const NEGATIVE = 2;
    export default {
        props:{
            ratings:{
                type:Array,
                default(){     // 设置默认值
                    return [];
                }
            },
            selectType:{
                type: Number,
                default: ALL
            },
            onlyContent:{
                type:Boolean,
                default: false
            },
            desc:{
                type:Object,
                default(){
                    return {
                        all:"全部",
                        positive:"满意",
                        negative:"不满意"
                    }
                }
            }
        },
        data () {
            return {
                mes:"this is a select"
            }
        },
        computed:{
            positives(){
                return this.ratings.filter( rating => {
                    return rating.rateType==POSITIVE;
                })
            },
            negatives(){
                return this.ratings.filter( rating => {
                    return rating.rateType==NEGATIVE;
                })
            }
        },
        methods:{
            select(type,event){
                this.$emit("select",type);     // 父子组件之间通信
            },
            toggleSelect(type,event){
                this.$emit("toggle");
            }
        }
    }
</script>
<style lang="scss" scoped="" type="text/css">
    .ratingselect{
        .rating-type{
        padding: 18px 0;
        margin: 0 18px;
        border-bottom: solid 1px rgba(7,17,27,0.1);
        font-size: 0;
            .select-type{
                display: inline-block;
                padding: 8px 12px;
                margin-right: 8px;
                line-height: 16px;
                border-radius: 1px;
                font-size: 12px;
                color:rgb(77,85,93);
                &.active{
                    background: #fff;
                }
                .count{
                    margin-left: 2px;
                    font-size: 8px;
                }
                &.positive{
                    background: rgba(0,160,220,0.2);
                    &.active{
                      background: rgb(0, 160, 220)
                    }
                }
                &.negative{
                    background: rgba(77, 85, 93, 0.2);
                    &.active{
                      background: rgb(175, 185, 196);
                    }
                }
            }
        }
        .switch{
            padding: 12px 18px;
            line-height: 24px;
            border-bottom: solid 1px rgba(7,17,27,0.1);
            color: rgb(147,153,159);
            font-size: 0;
            &.on{
                .icons{
                    color: #00c850;
                }
            }
            .icons{
                display: inline-block;
                vertical-align: top;
                font-size: 24PX;
                margin-right: 4px;
            }
            .texts{
                display: inline-block;
                vertical-align: top;
                font-size: 12px;
            }
        }
    }
   
</style>

