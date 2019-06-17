<template>
  <a-carousel autoplay>
    <a slot="customPaging">
      <div></div>
    </a>
    <div>
      <a-col :span="8" v-for="item in waternewdata[0]">
        <h6 :title="item.name">{{item.name}}</h6>
        <p>{{item.dataValue}}<span>{{item.unit}}</span></p>
      </a-col>
    </div>
    <div>
      <a-col :span="8" v-for="item in waternewdata[1]">
        <h6 :title="item.name">{{item.name}}</h6>
        <p>{{item.dataValue}}<span>{{item.unit}}</span></p>
      </a-col>
    </div>
    <div>
      <a-col :span="8" v-for="item in waternewdata[2]">
        <h6 :title="item.name">{{item.name}}</h6>
        <p>{{item.dataValue}}<span>{{item.unit}}</span></p>
      </a-col>
    </div>
  </a-carousel>
</template>

<script>
  export default {
    name: "water-newdata",
    data () {
      return {
        waternewdata: [], //水质监测点最新数据
      }
    },
    mounted () {
      // 水质监测点最新数据接口
      this.$get("checkPointData/getLastData", {type: 2})
        .then(res => {
          if (res) {
            // console.log(res);
            res.data.data.forEach((val,index) => {
              if (index%3 === 0) {
                this.waternewdata.push([])
              }
              this.waternewdata[Math.floor(index/3)].push(val)
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