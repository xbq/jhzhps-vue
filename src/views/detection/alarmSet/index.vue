<template>
  <div class="app-container">
    <a-card class="newalarm" :body-style="{padding: '0 10px'}">
      <h3>易涝监测点-报警设置</h3>
      <a-spin :spinning='spinning[0]'>
        <div class="L-boxcont">
          <Leditcard v-for="(item,index) in floordata" :data="item" :key="index"></Leditcard>
        </div>
      </a-spin>
    </a-card>
    <a-card class="newalarm" :body-style="{padding: '0 10px'}">
      <h3>水质监测点-报警设置</h3>
      <a-spin :spinning='spinning[0]'>
        <div class="L-boxcont">
          <Leditcard v-for="(item,index) in waterdata" :data="item" :key="index"></Leditcard>
        </div>
      </a-spin>
    </a-card>
    <a-card class="newalarm" :body-style="{padding: '0 10px'}">
      <h3>流量监测点-报警设置</h3>
      <a-spin :spinning='spinning[0]'>
        <div class="L-boxcont">
          <Leditcard v-for="(item,index) in flowdata" :data="item" :key="index"></Leditcard>
        </div>
      </a-spin>
    </a-card>
  </div>
</template>

<script>
import Leditcard from './components/L-editcard'
export default {
  data() {
    return {
      floordata: [], // 易涝监测点数据
      waterdata: [], // 水质监测点数据
      flowdata: [], // 流量监测点数据
      spinning: [false], //是否加载中
    }
  },
  components: {
    Leditcard
  },
  created() {
    // 易涝监测点报警设置列表
    this.$get("alarmCondition/queryListByType", {type: 1})
      .then(res => {
        if (res) {
          console.log(res);
          this.floordata = res.data.data
          let name = ''
          this.floordata.forEach((val) => {
            if (val.name === name) {
              val.name = ''
            }else {
              name = val.name
            }
          })
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 水质监测点报警设置列表
    this.$get("alarmCondition/queryListByType", {type: 2})
      .then(res => {
        if (res) {
          console.log(res);
          this.waterdata = res.data.data
          let name = ''
          this.waterdata.forEach((val) => {
            if (val.name === name) {
              val.name = ''
            }else {
              name = val.name
            }
          })
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 流量监测点报警设置列表
    this.$get("alarmCondition/queryListByType", {type: 3})
      .then(res => {
        if (res) {
          console.log(res);
          this.flowdata = res.data.data
          let name = ''
          this.flowdata.forEach((val) => {
            if (val.name === name) {
              val.name = ''
            }else {
              name = val.name
            }
          })
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
   
  }
}
</script>
<style scoped lang="scss">
.L-boxcont{
  display: flex;
  flex-wrap: wrap;
  padding: 10px 20px;
}
</style>