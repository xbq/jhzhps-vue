<template>
  <div class="app-container">
    <a-row :gutter="15">
      <a-col :span="10">
        <a-card class="newalarm" :body-style="{padding: '0 10px'}">
          <h3>最新报警记录</h3>
          <a-spin :spinning='spinning[0]'>
            <ul>
              <li v-for="item in newalarms">
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
          <div class="newalarmbottom">
            <div class="newtime">
              当前时间: {{newtime}}
            </div>
            <div class="refresh" @click="refresh">
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
      <div style="padding:27px 10px 29px">
        <div class="query">
          <div>
            <a-date-picker size="large"></a-date-picker>
            <a-select v-model="quarydata.type" size="large">
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
              <a-select-option value="Yiminghe">yiminghe</a-select-option>
            </a-select>
            <a-select v-model="quarydata.type" size="large">
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
              <a-select-option value="Yiminghe">yiminghe</a-select-option>
            </a-select>
            <a-button size="large" type="primary">添加</a-button>
          </div>
          <div>
            <a-button size="large" icon="plus-circle">添加</a-button>
            <a-button size="large" icon="upload">导出</a-button>
            <a-button size="large" icon="printer">打印</a-button>
          </div>
        </div>
        <a-table :columns="columns" :dataSource="data" :style="{marginTop: '20px'}" :scroll="{ x: 1200, y: 457 }" :pagination="pagination"
                 :loading="loading">
          <a slot="action" slot-scope="text" href="javascript:;">action</a>
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
      newalarms: [], //最新报警记录
      spinning: [false], // 加载中
      columns: [
        { title: '时间', width: 180, dataIndex: 'alarmTime', key: 'alarmTime'},
        { title: '监测点', width: 180, dataIndex: 'location', key: 'location',  },
        { title: '报警类型', dataIndex: 'alarmType', key: 'alarmType', width: 120 },
        { title: '数据值', dataIndex: 'dataValue', key: 'dataValue', width: 120 },
        { title: '级别', dataIndex: 'alarmLevel', key: 'alarmLevel', width: 80 },
        { title: '报警值', dataIndex: 'alarmValue', key: 'alarmValue', width: 120 },
        { title: '备注', dataIndex: 'remark', key: 'remark', width: 180 },
        { title: '处理状态', dataIndex: 'status', key: 'status'},
        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          width: 100,
          scopedSlots: { customRender: 'action' },
        },
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
      quarydata: {}, // 查询数据
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
    // 获取报警类型统计数据
    this.$get("alarm/countByType", {origin: 1})
      .then(res => {
        if (res) {
          // console.log(res);
          this.echartstype(JSON.parse(JSON.stringify(res.data.data).replace(/ALARM_TYPE/g, "name").replace(/COUNT/g, "value")))
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.refresh()
    this.getlist()
  },
  methods: {
    //绘制报警类型统计图表
    echartstype (data) {
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
            data: data.map((val) => {
              return val.name
            })
          },
          series: [{
            name: '报警类型',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            data: data,
            color: ['#e87f39', '#4a6565', '#44403f', '#a22313', '#cdb061', '#ffca58', '#ffa300'],
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
    },
    // 刷新最新报警记录
    refresh () {
      this.spinning[0] = true
      //获取最新报警记录
      this.$get("alarm/newestAlarm", {origin: 1})
        .then(res => {
          if (res) {
            this.newalarms = res.data.data
            // this.$message.success('刷新成功', 1)
          }
          this.spinning[0] = false
        })
        .catch(err => {
          console.log(err);
          this.spinning[0] = false
        });
    },
    // 获取数据列表
    getlist () {
      this.$get("alarm/getList", {origin: 1})
        .then(res => {
          if (res) {
            console.log(res);
            res.data.data.forEach((val) => {
              this.data.push({
                key: val.alarmId,
                alarmTime: val.alarmTime,
                location: val.location,
                alarmType: val.alarmType,
                dataValue: val.dataValue.toFixed(2),
                alarmLevel: val.alarmLevel,
                alarmValue: Number(val.alarmValue).toFixed(2),
                remark: val.remark,
                status: val.status
              })
            })
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer)
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
  @media screen and (max-width: 1600px) {
    .ant-select,.ant-calendar-picker{
      width: 200px;
    }
  }
  @media screen and (max-width: 1440px) {
    .ant-select,.ant-calendar-picker{
      width: 175px;
    }
  }
  @media screen and (min-width: 1600px) {
    .ant-select,.ant-calendar-picker{
      width: 250px;
    }
  }
  .ant-select,.ant-calendar-picker{
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