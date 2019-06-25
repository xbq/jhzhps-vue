<template>
  <div class="app-container">
    <a-card class="waterpoint" :body-style="{padding: '0 10px',height: 'calc(100% - 83px)',overflow: 'hidden'}">
      <h3>流量监测点位</h3>
      <a-spin :spinning='spinning[0]' class="L-spin">
        <ul>
          <li v-for="(item,index) in waterlist" @click="getwaterdata(item.id,index)"  :key="item.id" :class="active===index?'active':''">
            <div class="num">{{index+1}}</div>
            <div class="center">
              <div>{{item.name}}</div>
              <p>{{item.location}}</p>
            </div>
            <div class="right">
              <div>{{item.updatetime.substring(0, 10)}}</div>
              <span v-if="item.used === 1">待安装</span>
              <span v-else>投入使用</span>
            </div>
          </li>
        </ul>
      </a-spin>
      <div class="waterpointbottom">
        <div class="newtime">
          当前时间: {{newtime}}
        </div>
        <div class="refresh" @click="refresh">
          刷新
          <a-icon type="reload" />
        </div>
      </div>
    </a-card>
    <div>
      <div>
        <a-card class="newwaterdate" :body-style="{padding: '0 10px'}">
          <h3>最新流量数据</h3>
          <ul v-if="newwaterdata.length>0">
            <li v-for="(item,index) in newwaterdata" :key="index">
              <div>
                <div>{{item.DATA_TYPE}}</div>
                <p>{{item.RECORD_TIME.substring(5,16).replace('-','/')}}</p>
              </div>
              <div>{{item.DATA_VALUE.toFixed(2)}}<span>{{item.UNIT}}</span></div>
            </li>
          </ul>
          <div v-else style="padding: 10px">暂无相关数据</div>
        </a-card>
        <a-card class="historywaterdate" :body-style="{padding: '0 10px'}">
          <h3>24小时流量曲线</h3>
          <div v-if="hasechartdata" id="todayflowechart"></div>
          <div v-else class="nodata">
            <img src="../../../../assets/img/noData.png" alt="">
          </div>
        </a-card>
        <a-card class="waterdatelist" :body-style="{padding: '0 10px'}">
          <h3>数据列表</h3>
          <div style="padding:27px 10px 0px">
            <div class="query">
              <div>
                <a-range-picker size="large" allowClear  @change="onChange"></a-range-picker>
                <a-select v-model="quarydatas.checkPointId" size="large"  placeholder="全部监测点" allowClear>
                  <a-select-option v-for="item in checkpoints" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
                </a-select>
                <a-button size="large" type="primary" @click="query">查询</a-button>
              </div>
              <div>
                <a-button size="large" @click="add" icon="plus-circle">添加</a-button>
                <a-button size="large" icon="upload">导出</a-button>
                <a-button size="large" icon="printer">打印</a-button>
              </div>
            </div>
            <a-table size="middle" :columns="columns" :dataSource="data" :style="{marginTop: '20px'}" :scroll="{ y: 380 }" :pagination="pagination" @change="pagechange"
                     :loading="loading">
            </a-table>
          </div>
        </a-card>
        <a-modal
                title="添加报警数据"
                :visible="visible"
                @ok="addhandleOk"
                :confirmLoading="confirmLoading"
                @cancel="addhandleCancel"
                width="500px"
                :centered=true
        >
          <a-form
                  :form="form"
          >
            <a-form-item
                    label="时间"
                    :labelCol="{ span: 5 }"
                    :wrapperCol="{ span: 16, offset: 1 }"
            >
              <a-date-picker show-time
                             format="YYYY-MM-DD HH:mm:ss"
                             :style="{width: '100%'}"
                             v-decorator="[
                         'recordTime',
                         {rules: [{ required: true, message: 'Please input your note!' }]}
                         ]"></a-date-picker>
            </a-form-item>
            <a-form-item
                    label="监测点"
                    :labelCol="{ span: 5 }"
                    :wrapperCol="{ span: 16, offset: 1 }"
            >
              <a-select
                      v-decorator="[
          'checkPointId',
          {rules: [{ required: true, message: 'Please select your gender!' }]}
        ]"
                      placeholder="请选择监测点"
              >
                <a-select-option v-for="item in checkpointss" :type="item.type" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
                    label="数据类型"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 16, offset: 1 }"
            >
              <a-select
                      v-decorator="[
          'dataType',
          {rules: [{ required: true, message: 'Please select your gender!' }]}
        ]"
                      placeholder="请选择数据类型"
              >
                <a-select-option value="流量">流量</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
                    label="数据值"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 16, offset: 1 }"
            >
              <a-input
                      v-decorator="[
          'dataValue',
          {rules: [{ required: true, message: 'Please input your note!' }]}
        ]"
              />
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newtime: '', // 当前时间
        active: 0, // 选中的监测点位
        waterlist: [], // 水质监测点位
        spinning: [false], // 是否加载中
        newwaterdata: [], // 最新水位数据
        columns: [
          { title: '时间', width: 200, dataIndex: 'recordTime', key: 'recordTime'},
          { title: '监测点', width: 200, dataIndex: 'name', key: 'name',  },
          { title: '数据类型', dataIndex: 'dataType', key: 'dataType', width: 100 },
          { title: '数据值', dataIndex: 'dataValue', key: 'dataValue', width: 100 },
        ], //表格列
        data: [],  //表格数据
        pagination: {
          current: 1,
          defaultCurrent: 1,
          defaultPageSize: 10,
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          size: 'small',
          total: 0,
          showTotal: total => `共 ${total} 条`,
          // onShowSizeChange:(current, pageSize)=>this.pageSize = pageSize,
          pageSizeOptions: ['5', '10', '20', '30']
        }, // 分页配置
        loading: false, // 表格是否加载中
        quarydatas: {
        }, // 准备查询数据的参数
        quarydata: {
        }, // 查询数据参数
        checkpoints: [], //全部的监测点位
        checkpointss: [], //全部的监测点位
        id: 0, // 选择的监测点id
        hasechartdata: false, //有无图表数据
        confirmLoading: false,
        visible: false,
        form: this.$form.createForm(this),
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
      this.refresh (false)
    },
    methods: {
      //校验时间,小于10前面加0
      checkTime (time) {
        if(time < 10) return "0" + time;
        return time;
      },
      // 刷新流量监测点
      refresh (boo) {
        this.spinning[0] = true;
        // 获取水质监测点位
        this.$get("checkPoint/get", {limit: -1,type: 3})
          .then(res => {
            if (res) {
              this.waterlist = res.data.data;
              this.id = this.waterlist[0].id
              this.getwaterdata(this.waterlist[0].id, 0);
              this.spinning[0] = false;
              if (boo) {
                this.$message.success('刷新成功', 1)
              }
            }
          })
          .catch(err => {
            console.log(err);
            this.spinning[0] = false;
            if (boo) {
              this.$message.error('刷新失败，请稍后再试', 1)
            }
          });
      },
      // 获取不同监测点流量信息
      getwaterdata(id, index) {
        this.id = id
        this.active = index
        this.quarydata = {}
        this.quarydatas = {}
        this.pagination.current = 1;
        // 获取最新流量数据
        this.$get("checkPointData/getLastDataById", {checkpointId: id})
          .then(res => {
            if (res) {
              this.newwaterdata = res.data.data
            }
          })
          .catch(err => {
            console.log(err);
          });
        // 获取最新流量数据曲线
        this.$get("checkPointData/queryListForToday", {checkpointId: id,dataType: '流量'})
          .then(res => {
            if (res) {
              // console.log(res);
              if(res.data.data.length > 0){
                this.hasechartdata = true
                var times = [];
                var values = [];
                res.data.data.forEach((val) => {
                  times.push(val.recordTime.substring(5, 16))
                  values.push(val.dataValue.toFixed(2))
                });
                var todayflowechart = this.$echarts.init(document.getElementById('todayflowechart'))
                var option =
                  {
                    tooltip: {
                      show: true,
                      trigger: 'axis',
                      axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'line', // 默认为直线，可选为：'line' | 'shadow'
                        lineStyle: {
                          color: '#e0e0e0'
                        }
                      },
                      extraCssText: 'width:160px;height:60px;',
                      position: function(p) { //其中p为当前鼠标的位置
                        return [p[0] + 10, p[1] - 10];
                      },
                    },
                    legend: {
                      data: ['流量'],
                      x: 'left'
                    },
                    dataZoom: [{
                      show: true,
                      realtime: true,
                      start: 0
                    }, ],
                    grid: [{
                      left: 50,
                      right: 20,
                      bottom: 80
                    }],
                    xAxis: [{
                      type: 'category',
                      boundaryGap: false,
                      axisLabel: {
                        textStyle: {
                          color: '#323232',
                        },
                      },
                      axisLine: {
                        lineStyle: {
                          color: '#0095ff'
                        },
                        onZero: true
                      },
                      data: times
                    }, ],
                    yAxis: [{
                      name: '流量(m³/s)',
                      type: 'value',
                      nameGap: 10,
                      nameTextStyle: {
                        color: '#BCBCBC',
                        fontSize: 12
                      },
                      axisLabel: {
                        textStyle: {
                          color: '#323232',
                        },
                      },
                      axisLine: {
                        lineStyle: {
                          color: '#0095ff'
                        }
                      },
                      splitLine: {
                        show: false
                      }
                    }, ],
                    series: [{
                      name: '流量',
                      type: 'line',
                      symbolSize: 8,
                      hoverAnimation: false,
                      data: values
                    }]
                  };
                todayflowechart.setOption(option);
                window.onresize = todayflowechart.resize;
              } else {
                this.hasechartdata = false
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
        // 获取全部监测点
        this.$get("checkPoint/get", {type: 3, used: 2})
          .then(res => {
            if (res) {
              this.checkpoints = res.data.data
            }
          })
          .catch(err => {
            console.log(err);
          });
        this.getlist()
      },
      pagechange (pagination) {
        if(this.pagination.pageSize !== pagination.pageSize){
          pagination.current = 1;
        }
        this.pagination = pagination
        this.getlist()
      },
      // 获取数据列表
      getlist () {
        this.$get("checkPointData/getList", {'checkPointId':this.id, 'type':'3',limit: this.pagination.pageSize, page: this.pagination.current,...this.quarydata})
          .then(res => {
            if (res) {
              this.pagination.total = res.data.count
              this.data = []
              res.data.data.forEach((val,index) => {
                this.data.push({
                  key: index,
                  recordTime: val.recordTime,
                  name: val.name,
                  dataType: val.dataType,
                  dataValue: val.dataValue.toFixed(2)
                })
              })
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 获取查询的时间段
      onChange (date,datestring) {
        this.quarydatas.beginTime = datestring[0];
        this.quarydatas.endTime = datestring[1]
      },
      // 查询
      query () {
        this.id = this.quarydatas.checkPointId;
        this.pagination.current = 1;
        this.pagination.pageSize = 10;
        this.quarydata = this.quarydatas
        this.getlist()
      },
      addhandleOk () {
        this.form.validateFields((err, values) => {
          if (!err) {
            // this.confirmLoading = true
            values.recordTime = values.recordTime.format('YYYY-MM-DD HH:mm:ss');
            this.$post("checkPointData/create", values)
              .then(res => {
                if (res) {
                  // console.log(res);
                  this.pagination.current = 1;
                  this.pagination.pageSize = 10;
                }
              })
              .catch(err => {
                console.log(err);
              });
            this.visible = false
          }
        });
      },
      addhandleCancel () {
        this.visible = false
      },
      add () {
        // 获取全部监测点
        this.$get("checkPoint/get", {type: 3})
          .then(res => {
            if (res) {
              this.checkpointss = res.data.data
            }
          })
          .catch(err => {
            console.log(err);
          });
        this.visible = true;
      }
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
      margin-right: 15px;
      position: relative;
      .L-spin{
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        width: 150%;
        padding-right: 50%;
      }
      ul{
        width: 386px;
        padding: 20px 5px;
        height: 100%;
        .active{
          border: solid 1px #9bd5ff;
          .num{
            background-color: #ff9800;
          }
          .center{
            div{
              color: #009dff;
            }
          }
          .right{
            color: #72a7cc;
          }
        }
        li{
          display: flex;
          padding: 19px;
          height: 82px;
          align-items: center;
          font-size: 14px;
          letter-spacing: 1px;
          background-color: #f2faff;
          border: 1px dashed #e0e0e0;
          cursor: pointer;
          margin-bottom: 20px;
          .num{
            width: 20px;
            height: 20px;
            line-height: 20px;
            border-radius: 20px;
            background-color: #e0e0e0;
            color: #ffffff;
            text-align: center;
          }
          .center{
            margin-left: 11px;
            flex: 1;
            overflow: hidden;
            div{
              color: #404040;
              line-height: 16px;
              font-size: 16px;
              margin-bottom: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            p{
              color: #8a9399;
              line-height: 14px;
              margin: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .right{
            width: 90px;
            text-align: right;
            color: #888;
            div{
              margin-bottom: 14px;
              line-height: 13px;
              padding-top: 3px;
            }
            span{
              font-size: 12px;
            }
          }
        }
      }
      .waterpointbottom{
        position: absolute;
        bottom: 0;
        width: 386px;
        display: flex;
        justify-content: space-between;
        line-height: 12px;
        height: 45px;
        letter-spacing: 1px;
        color: #888888;
        font-size: 12px;
        padding: 13px 5px 20px 5px;
        .refresh{
          color: #0095ff;
          cursor: pointer;
        }
      }
    }
    .waterpoint+div{
      flex: 1;
      height: 100%;
      overflow: hidden;
      &>div{
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        width: calc(100% + 17px);
      }
    }
    .newwaterdate{
      margin-bottom: 15px;
      ul{
        display: flex;
        flex-wrap: wrap;
        li{
          display: flex;
          height: 71px;
          justify-content: space-between;
          padding: 17px 21px 19px 19px;
          &>div:nth-of-type(1){
            width: 50%;
            letter-spacing: 1px;
            font-size: 16px;
            color: #323232;
            height: 15px;
            line-height: 15px;
            p{
              letter-spacing: 1px;
              color: #888888;
              font-size: 12px;
              line-height: 12px;
              height: 12px;
              margin-bottom: 0;
              margin-top: 8px;
            }
          }
          &>div:nth-of-type(2){
            width: 50%;
            letter-spacing: 2px;
            color: #323232;
            font-size: 20px;
            line-height: 15px;
            padding-top: 11px;
            span{
              letter-spacing: 1px;
              color: #888888;
              font-size: 12px;
            }
          }
        }
        @media screen and (min-width: 1280px){
          li{
            width: 50%;
          }
        }
        @media screen and (min-width: 1600px){
          li{
            width: 33.333333333%;
          }
        }
        @media screen and (min-width: 1920px){
          li{
            width: 25%;
          }
        }
      }
    }
    .historywaterdate{
      margin-bottom: 15px;
      height: 433px;
      #todayflowechart{
        width: 100%;
        height: 395px;
      }
      .nodata{
        height: 290px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .waterdatelist{
      flex: 1;
      height: 614px;
      .query{
        display: flex;
        justify-content: space-between;
        .ant-select,.ant-calendar-picker{
          margin-right: 10px;
        }
        .ant-btn{
          margin-left: 10px;
          padding: 0 10px;
        }
        @media screen and (max-width: 1680px) {
          .ant-select,.ant-calendar-picker{
            width: 220px;
          }
        }
        @media screen and (max-width: 1600px) {
          .ant-select,.ant-calendar-picker{
            width: 140px;
          }
        }
        @media screen and (max-width: 1373px) {
          .ant-select,.ant-calendar-picker{
            width: 108px;
          }
        }
        @media screen and (min-width: 1440px) {
          .ant-select,.ant-calendar-picker{
            margin-right: 20px;
            .ant-btn{
              padding: 0 15px;
            }
          }
        }
        @media screen and (min-width: 1680px) {
          .ant-select,.ant-calendar-picker{
            width: 250px;
          }
        }
      }
    }
  }
  div{}
</style>