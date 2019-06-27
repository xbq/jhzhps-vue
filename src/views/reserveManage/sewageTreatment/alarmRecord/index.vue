<template>
  <div class="app-container">
    <a-row :gutter="15">
      <a-col :span="10">
        <a-card class="newalarm" :body-style="{padding: '0 10px'}">
          <h3>最新报警记录</h3>
          <ul>
            <li v-for="(item,index) in newalarms" :key="index">
              <a-row>
                <a-col :span="6" class="alarmtitle">
                  <h4>{{item.alarmType}}</h4>
                  <p :title="item.location">{{item.location}}</p>
                </a-col>
                <a-col :span="10" class="alarmnum">
                  <div>
                    {{item.dataValue}}
                    <span>{{item.unit}}</span>
                  </div>
                  <p>较警报值超{{Math.abs(item.dataValue - item.alarmValue).toFixed(2)}}</p>
                </a-col>
                <a-col :span="8" class="alarmtime">
                  <div>{{item.alarmTime}}</div>
                </a-col>
              </a-row>
            </li>
          </ul>
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
      <a-col :span="14">
        <a-card :body-style="{padding: '0 10px'}">
          <h3>报警类型统计</h3>
          <div id="type_gather"></div>
        </a-card>
      </a-col>
    </a-row>
    <a-card :body-style="{padding: '0 10px',marginTop: '15px'}">
      <h3>数据列表</h3>
      <div style="padding:27px 10px">
        <div class="query">
          <div>
            <a-range-picker size="large" allowClear  @change="onChange"></a-range-picker>
            <a-select v-model="quarydata.checkPointId" size="large"  placeholder="全部监测点" allowClear>
              <a-select-option v-for="item in checkpoints" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
            </a-select>
            <a-select v-model="quarydata.alarmType" placeholder="全部报警类型" size="large" allowClear>
              <!--              <a-select-option value="">全部报警类型</a-select-option>-->
              <a-select-option value="总磷">总磷</a-select-option>
              <a-select-option value="氨氮">氨氮</a-select-option>
              <a-select-option value="水位超标">水位超标</a-select-option>
              <a-select-option value="PH过小">PH过小</a-select-option>
              <a-select-option value="COD超标">COD超标</a-select-option>
              <a-select-option value="流量超标">流量超标</a-select-option>
              <a-select-option value="Yiminghe">PH过大</a-select-option>
            </a-select>
            <a-button size="large" type="primary">查询</a-button>
          </div>
        </div>
        <a-table :columns="columns" :dataSource="data" :style="{marginTop: '20px'}" :scroll="{}" :pagination="pagination"
                 :loading="loading" :locale="{emptyText: '数据待接入'}">
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newtime: '', // 当前时间
      newalarms: [
        {
          alarmValue: '6.49',
          alarmType: '厂外液位超标',
          location: '永济桥南桥头',
          dataValue: '6.52',
          unit: 'm',
          alarmTime: '12:14:25'
        },
        {
          alarmValue: '8.00',
          alarmType: 'PH值超标',
          location: '出水口',
          dataValue: '8.31',
          unit: '',
          alarmTime: '11:14:25'
        },
        {
          alarmValue: '5.42',
          alarmType: '氨氮超标',
          location: '进水口',
          dataValue: '15.42',
          unit: 'mg/L',
          alarmTime: '11:14:25'
        },
        {
          alarmValue: '6.91',
          alarmType: 'COD超标',
          location: '进水口',
          dataValue: '15.51',
          unit: 'mg/L',
          alarmTime: '10:14:25'
        }
      ], //最新报警记录
      columns: [
        { title: '时间', width: 180, dataIndex: 'alarmTime', key: 'alarmTime'},
        { title: '监测点', width: 180, dataIndex: 'location', key: 'location',  },
        { title: '报警类型', dataIndex: 'alarmType', key: 'alarmType', width: 120 },
        { title: '数据值', dataIndex: 'dataValue', key: 'dataValue', width: 120 },
        { title: '负责人', dataIndex: 'name', key: 'name', width: 120 },
        { title: '联系电话', dataIndex: 'tel', key: 'tel', width: 180 },
        { title: '备注', dataIndex: 'remark', key: 'remark', width: 200 },
        { title: '状态', dataIndex: 'status', key: 'status', width: 80 },
      ], //表格列
      data: [],  //表格数据
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 5,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: total => `共 ${total} 条`,
        // onShowSizeChange:(current, pageSize)=>this.pageSize = pageSize,
        pageSizeOptions: ['5', '10', '20', '30']
      }, // 分页配置
      loading: false, // 表格是否加载中
      checkpoints: [], //全部的监测点位
      checkpointtypes: [], //全部的报警类型
      quarydata: {
      }, // 查询数据
    }
  },
  created() {
    // 获取当前时间
    let date = new Date()
    this.newtime = this.checkTime(date.getHours()) + ":" + this.checkTime(date.getMinutes()) + ":" + this.checkTime(date.getSeconds())
    this.times = setInterval(() => {
      let date = new Date()
      this.newtime = this.checkTime(date.getHours()) + ":" + this.checkTime(date.getMinutes()) + ":" + this.checkTime(date.getSeconds())
    },1000)
    // 获取全部监测点
    this.$get("checkPoint/get", {origin: 1, used: 2})
      .then(res => {
        if (res) {
          this.checkpoints = res.data.data
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    this.echartstype()
  },
  methods: {
    // 获取查询的时间段
    onChange (date,datestring) {
      this.quarydata.beginTime = datestring[0]
      this.quarydata.endTime = datestring[1]
    },
    //绘制报警类型统计图表
    echartstype () {
      var echarts_type = this.$echarts.init(document.getElementById('type_gather')),
        options_type = {
          //报警类型统计图表
          title: {
            text: '所有报警记录分类统计',
            x: 'center',
            y: 20,
            textStyle: {
              fontSize: 18,
              color: '#323232'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} (条)",
            extraCssText: 'width:150px;height:80px;',
          },
          legend: {
            orient: 'vertical',
            left: 15,
            top: '10%',
            itemGap: 20,
            data: ['厂外液位超标', 'PH值超标', 'COD值超标', '氨氮超标', '总磷超标', '总氮超标']
          },
          series: [{
            name: '报警类型',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            data: [{ value: 2, name: '厂外液位超标' },
              { value: 1, name: 'PH值超标' },
              { value: 2, name: 'COD值超标' },
              { value: 2, name: '氨氮超标' },
              { value: 2, name: '总磷超标' },
              { value: 2, name: '总氮超标' }],
            color: ['#c23531', '#d48265', '#fa9d1b', '#fad453', '#969fb0', '#546570'],
            label: {

              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                show: false,
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
          }]
        };
      echarts_type.setOption(options_type);
      window.onresize = echarts_type.resize;
    },
    //校验时间,小于10前面加0
    checkTime (time) {
      if(time < 10) return "0" + time;
      return time;
    }
  },
  // 离开路由关闭定时器
  beforeRouteLeave(to, from, next) {
    clearInterval(this.times)
    next()
  }
}
</script>
<style scoped lang="scss">
p{
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.newalarm{
  ul{
    padding-top: 20px;
    height: 400px;
    li{
      border: dashed 1px #e0e0e0;
      height: 81px;
      margin-bottom: 14px;
      letter-spacing: 1px;
      color: #888888;
      font-size: 12px;
      line-height: 12px;
      padding: 15px 0;
      .alarmtitle{
        border-right: 1px solid #e6e6e6;
        padding: 7px 0 2px 19px;
        h4{
          color: #323232;
          font-size: 12px;
          height: 15px;
          line-height: 15px;
          margin-bottom: 14px;
        }
      }
      .alarmnum{
        padding: 3px 0 2px 25px;
        div{
          letter-spacing: 0px;
          color: #323232;
          font-size: 28px;
          height: 22px;
          line-height: 22px;
          margin-bottom: 11px;
          span{
            color: #888888;
            font-size: 12px;
          }
        }
      }
      .alarmtime{
        padding-top: 3px;
        padding-left: 20px;
        letter-spacing: 0px;
        color: #a6a6a6;
      }
    }
  }
  .newalarmbottom{
    display: flex;
    justify-content: space-between;
    line-height: 12px;
    height: 45px;
    letter-spacing: 1px;
    color: #888888;
    font-size: 12px;
    padding: 13px 0 20px 0;
    .refresh{
      color: #0095ff;
      cursor: pointer;
    }
  }
}
#type_gather{
  height: 445px;
  width: 100%;
}
.query{
  display: flex;
  justify-content: space-between;
  .ant-select,.ant-calendar-picker{
    width: 200px;
    margin-right: 15px;
  }
  &>div:nth-of-type(2){
    .ant-btn{
      margin-left: 15px;
    }
  }
}
div{}
</style>