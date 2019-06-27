<template>
  <a-carousel autoplay>
    <a slot="customPaging">
      <div></div>
    </a>
    <div>
      <a-col :span="8" v-for="(item,index) in waternewdata[0]" :key="index">
        <h6 :title="item.dataType">{{item.dataType}}</h6>
        <p :title="item.recordTime">{{item.dataValue.toFixed(2)}}<span>{{item.unit}}</span></p>
      </a-col>
    </div>
    <div>
      <a-col :span="8" v-for="(item,index) in waternewdata[1]" :key="index">
        <h6 :title="item.dataType">{{item.dataType}}</h6>
        <p :title="item.recordTime">{{item.dataValue.toFixed(2)}}<span>{{item.unit}}</span></p>
      </a-col>
    </div>
    <div>
      <a-col :span="12" v-for="(item,index) in waternewdata[2]" :key="index">
        <h6 :title="item.dataType">{{item.dataType}}</h6>
        <p :title="item.recordTime">{{item.dataValue.toFixed(2)}}<span>{{item.unit}}</span></p>
      </a-col>
    </div>
  </a-carousel>
</template>

<script>
  export default {
    name: "water-newdata",
    data () {
      return {
        waternewdata: [[], [], []], //水质监测点最新数据
      }
    },
    mounted () {
      // 水质监测点最新数据接口
      this.$get("checkPointData/getLastData", {type: 2})
        .then(res => {
          if (res) {
            // console.log(res);
            res.data.data.forEach((val) => {
              if(val.dataType === 'COD'){
                this.waternewdata[2].push(val)
              }else if(this.waternewdata[0].length === 3){
                this.waternewdata[1].push(val)
              }else {
                this.waternewdata[0].push(val)
              }
            })
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
</script>

<style scoped>
.slick-dots li div{
  width: 10px;
  height: 10px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #e2e2e2;
}
.slick-dots .slick-active div{
  background-color: #b7b7b7;
}
</style>