<template>
  <div class="app-container">
    <a-row :gutter="15">
      <a-col :span="10">
        <a-card class="newalarm">
          <h3>最新报警记录</h3>
          <a-spin :spinning=false>
            <ul>
              <li>
                <a-row>
                  <a-col :span="6">
                    <div>流量</div>
                    <div>流量监测</div>
                  </a-col>
                  <a-col :span="10">
                    <div>
                      <span>0.32</span>
                      <span>m/s</span>
                    </div>
                    <div>报警值</div>
                  </a-col>
                  <a-col :span="8">
                    <div>{{newtime}}</div>
                  </a-col>
                </a-row>
              </li>
              <li>
                <a-row>
                  <a-col :span="6">
                    <div>流量</div>
                    <div>流量监测</div>
                  </a-col>
                  <a-col :span="10">
                    <div>
                      <span>0.32</span>
                      <span>m/s</span>
                    </div>
                    <div>报警值</div>
                  </a-col>
                  <a-col :span="8">
                    <div>{{newtime}}</div>
                  </a-col>
                </a-row>
              </li>
              <li>
                <a-row>
                  <a-col :span="6">
                    <div>流量</div>
                    <div>流量监测</div>
                  </a-col>
                  <a-col :span="10">
                    <div>
                      <span>0.32</span>
                      <span>m/s</span>
                    </div>
                    <div>报警值</div>
                  </a-col>
                  <a-col :span="8">
                    <div>{{newtime}}</div>
                  </a-col>
                </a-row>
              </li>
              <li>
                <a-row>
                  <a-col :span="6">
                    <div>流量</div>
                    <div>流量监测</div>
                  </a-col>
                  <a-col :span="10">
                    <div>
                      <span>0.32</span>
                      <span>m/s</span>
                    </div>
                    <div>报警值</div>
                  </a-col>
                  <a-col :span="8">
                    <div>{{newtime}}</div>
                  </a-col>
                </a-row>
              </li>
            </ul>
          </a-spin>
          <div class="newalarmbottom">
            <div class="newtime">
              当前时间: {{newtime}}
            </div>
            <div class="refresh">
              刷新
              <a-icon type="reload" />
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :span="14"></a-col>
    </a-row>
    <a-card></a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newtime: '', // 当前时间
    }
  },
  created() {
    let date = new Date()
    this.newtime = this.checkTime(date.getHours()) + ":" + this.checkTime(date.getMinutes()) + ":" + this.checkTime(date.getSeconds())
    this.times = setInterval(() => {
      let date = new Date()
      this.newtime = this.checkTime(date.getHours()) + ":" + this.checkTime(date.getMinutes()) + ":" + this.checkTime(date.getSeconds())
    },1000)
  },
  methods: {
    checkTime (time) {
      if(time < 10) return "0" + time;
      return time;
    },
  }
}
</script>
<style scoped lang="scss">
.newalarm{
  ul{
    padding-top: 20px;
    li{
      border: dashed 1px #e0e0e0;
      height: 80px;
      margin-bottom: 14px;

    }
  }
  .newalarmbottom{
    display: flex;
    justify-content: space-between;
    .refresh{
      color: #0095ff;
      cursor: pointer;
    }
  }
}
</style>