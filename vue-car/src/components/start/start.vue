<template>
     <div class="start" :class="startType">
       <span v-for="(item,index) in classItems" :class="item" class="start-item" :key="index"></span>
     </div>
</template>
<script>
  const LENGTH = 5;    // 定义星星的长度
  const CLS_ON = 'on';  // 定义不同的状态
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default {
      props: {
        size: {
          type: Number     // 根据状态来接收值
        },
        score: {
          type: Number
        }
      },
    computed: {
        startType () {
          return 'start-'+this.size
        },
        classItems () {       // 根据分数来计算星星的显示
           let result = [];
           let score = Math.floor(this.score*2)/2     // 根据分数向下取整
           let hasDemail = score% 1 !==0           // 对1取整看有没有小数
           let inter = Math.floor(score);
           for(let i=0;i<inter;i++){
             result.push(CLS_ON);      // 看有几个完整的星星
           }
           if(hasDemail){
             result.push(CLS_HALF);
           }
           while(result.length<LENGTH){
             result.push(CLS_OFF);
           }
           return result;        // 最后将结果返回出去
        }
    }
  }

</script>
<style>
   .start{ font-size: 0;}
   .start-item{
     display: inline-block;
     background-repeat: no-repeat;
   }
  .start-48 .start-item{ width: 20px;height: 20px;background-size: 20px 20px;margin-right: 22px; }
  .start-48:last-child{ margin-right: 0px;}
   .start-48 .on{ background-image: url("star48_on@2x.png");}
   .start-48 .half{ background-image: url("star48_half@2x.png");}
   .start-48 .off{ background-image: url("star48_off@2x.png");}
   @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
     .start-48 .on{ background-image: url("star48_on@3x.png");}
     .start-48 .half{ background-image: url("star48_half@3x.png");}
     .start-48 .off{ background-image: url("star48_off@3x.png");}
   }
   .start-36 .start-item{ width: 16px;height: 16px;background-size: 16px 16px;margin-right: 6px; }
   .start-48:last-child{ margin-right: 0px;}
   .start-36 .on{ background-image: url("star36_on@2x.png");}
   .start-36 .half{ background-image: url("star36_half@2x.png");}
   .start-36 .off{ background-image: url("star36_off@2x.png");}
   @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
     .start-36 .on{ background-image: url("star36_on@3x.png");}
     .start-36 .half{ background-image: url("star36_half@3x.png");}
     .start-36 .off{ background-image: url("star36_off@3x.png");}
   }
   .start-24 .start-item{ width: 10px;height: 10px;background-size: 10px 10px;margin-right: 3px; }
   .start-24:last-child{ margin-right: 0px;}
   .start-24 .on{ background-image: url("star24_on@2x.png");}
   .start-24 .half{ background-image: url("star24_half@2x.png");}
   .start-24 .off{ background-image: url("star24_off@2x.png");}
   @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
     .start-24 .on{ background-image: url("star24_on@3x.png");}
     .start-24 .half{ background-image: url("star24_half@3x.png");}
     .start-24 .off{ background-image: url("star24_off@3x.png");}
   }
</style>
