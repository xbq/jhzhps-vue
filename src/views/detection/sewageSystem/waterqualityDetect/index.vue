<template>
  <div class="app-container">
    <a-card class="waterpoint" :body-style="{padding: '0 10px'}">
      <h3>水质监测点-报警设置</h3>
      <a-spin :spinning='spinning[0]'>
        <ul>
          <li v-for="item in waterlist" :key="item.id">
            <a-row>
              <a-col :span="6" class="alarmtitle">
                <h4>{{item.alarmType}}</h4>
                <p :title="item.location">{{item.location}}</p>
              </a-col>
              <a-col :span="10" class="alarmnum">
                <div>
                  {{item.dataValue}}
                  <span>{{item.unit!=null?item.unit:''}}</span>
                </div>
                <p>较警报值超{{Math.abs(item.dataValue - item.alarmValue).toFixed(2)}}</p>
              </a-col>
              <a-col :span="8" class="alarmtime">
                <div>{{item.alarmTime}}</div>
              </a-col>
            </a-row>
          </li>
        </ul>
      </a-spin>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      waterlist: [], // 水质监测点位
      spinning: [false], // 是否加载中
    }
  },
  created() {
    this.$get("checkPoint/get", {limit: 1,type: 2})
      .then(res => {
        if (res) {
          this.waterlist = res.data.data
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
.app-container{
  display: flex;
  height: calc(100vh - 100px);
  .waterpoint{
    width: 406px;
    height: 100%;
  }
}
div{}
</style>