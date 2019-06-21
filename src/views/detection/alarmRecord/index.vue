<template>
  <div class="app-container">
    <a-row :gutter="15">
      <a-col :span="10">
        <a-card class="newalarm" :body-style="{padding: '0 10px'}">
          <h3>最新报警记录</h3>
          <a-spin :spinning='spinning[0]'>
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
            <a-button size="large" type="primary" @click="query">查询</a-button>
          </div>
          <div>
            <a-button size="large" @click="add" icon="plus-circle">添加</a-button>
            <a-button size="large" icon="upload">导出</a-button>
            <a-button size="large" icon="printer">打印</a-button>
          </div>
        </div>
        <a-table :columns="columns" :dataSource="data" :style="{marginTop: '20px'}" :scroll="{ x: 1200, y: 457 }" :pagination="pagination"
                 :loading="loading">
          <a slot="action" slot-scope="text" @click="edit(text.key)">查看</a>
        </a-table>
      </div>
    </a-card>
    <a-modal
            title="报警信息"
            :visible="visible[0]"
            @ok="edithandleOk"
            :confirmLoading="confirmLoading[0]"
            @cancel="edithandleCancel"
            width="400px"
            :centered=true
    >
      <div class="editinfo">
        <div class="location">
          <div>{{editdate.location}}</div>
          <span>{{editdate.alarmTime}}</span>
        </div>
        <div class="alarmvalue">
          <h6>{{editdate.alarmType}}</h6>
          <div>{{editdate.alarmValue}}<span>{{editdate.unit}}</span></div>
        </div>
        <div class="status">
          <div>处理状态：</div>
          <ul>
            <li :class="editdate.status==='处理中'?'active':''" @click="editdate.status='处理中'">处理中</li>
            <li :class="editdate.status==='已处理'?'active':''" @click="editdate.status='已处理'">已处理</li>
            <li :class="editdate.status==='已忽略'?'active':''" @click="editdate.status='已忽略'">已忽略</li>
          </ul>
        </div>
        <div class="remark">
          <div>处理状态：</div>
          <input type="text" v-model="editdate.remark">
        </div>
      </div>
    </a-modal>
    <a-modal
            title="添加报警数据"
            :visible="visible[1]"
            @ok="addhandleOk"
            :confirmLoading="confirmLoading[1]"
            @cancel="addhandleCancel"
            width="790px"
            :centered=true
    >
      <a-form
              :form="form"
      >
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
                    label="时间"
                    :labelCol="{ span: 5 }"
                    :wrapperCol="{ span: 16, offset: 2 }"
            >
              <a-date-picker show-time
                             format="YYYY-MM-DD HH:mm:ss"
                             :style="{width: '100%'}"
                             v-decorator="[
                         'alarmTime',
                         {rules: [{ required: true, message: 'Please input your note!' }]}
                         ]"></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
                    label="监测点"
                    :labelCol="{ span: 5 }"
                    :wrapperCol="{ span: 16, offset: 2 }"
            >
              <a-select
                      v-decorator="[
          'checkPointId',
          {rules: [{ required: true, message: 'Please select your gender!' }]}
        ]"
                      placeholder="请选择监测点"
                      @change="getalarmtype"
              >
                <a-select-option v-for="item in checkpoints" :type="item.type" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
                    label="报警类型"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 16, offset: 2 }"
            >
              <a-select
                      v-decorator="[
          'alarmType',
          {rules: [{ required: true, message: 'Please select your gender!' }]}
        ]"
                      placeholder="请选择报警类型"
              >
                <a-select-option v-for="item in checkpointtypes" :key="item.id" :value="item.alarmType">{{item.alarmType}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
                    label="数据值"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 16, offset: 2 }"
            >
              <a-input
                      v-decorator="[
          'dataValue',
          {rules: [{ required: true, message: 'Please input your note!' }]}
        ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
                    label="状态"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 16, offset: 2 }"
            >
              <a-select
                      v-decorator="[
          'status',
        ]"
                      placeholder="请处理状态"
              >
                <a-select-option value="">
                  请处理状态
                </a-select-option>
                <a-select-option value="已处理">
                  已处理
                </a-select-option>
                <a-select-option value="处理中">
                  处理中
                </a-select-option>
                <a-select-option value="已忽略">
                  已忽略
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
                    label="备注"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 16, offset: 2 }"
            >
              <a-input
                      placeholder="请输入相关信息"
                      v-decorator="[
          'remark',
        ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
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
      checkpoints: [], //全部的监测点位
      checkpointtypes: [], //全部的报警类型
      quarydata: {
      }, // 查询数据
      confirmLoading: [false, false],
      visible: [false, false],
      editdate: {}, // 查看编辑的数据
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
    // 获取全部监测点
    this.$get("checkPoint/get", {origin: 1, used: 2})
      .then(res => {
        if (res) {
          console.log(res);
          this.checkpoints = res.data.data
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.refresh()
    this.getlist()
  },
  methods: {
    getalarmtype(index,val){
      this.form.resetFields('alarmType')
      this.$get("alarm/getAlarmTypeByCheckPointType", {checkpointType: val.data.attrs.type})
        .then(res => {
          if (res) {
            console.log(res);
            this.checkpointtypes = res.data.data
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取查询的时间段
    onChange (date,datestring) {
      this.quarydata.beginTime = datestring[0]
      this.quarydata.endTime = datestring[1]
    },
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
          this.$message.success('刷新成功', 1)
        })
        .catch(err => {
          console.log(err);
          this.spinning[0] = false
        });
    },
    // 获取数据列表
    getlist (data) {
      this.$get("alarm/getList", {origin: 1, limit: -1,...data})
        .then(res => {
          if (res) {
            console.log(res);
            this.data = []
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
    },
    // 查询
    query () {
      this.getlist(this.quarydata)
    },
    edithandleOk () {
      this.confirmLoading[0] = true
      let {alarmId, status, remark} = this.editdate
      this.$post("alarm/update", {alarmId, status, remark})
        .then(res => {
          if (res) {
            this.getlist()
            this.confirmLoading[0] = false
            this.visible[0] = false
          }
        })
        .catch(err => {
          console.log(err);
          this.confirmLoading[1] = false
          this.visible[0] = false
        });
    },
    addhandleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading[1] = true
          values.alarmTime = values.alarmTime.format('YYYY-MM-DD HH:mm:ss')
          console.log('Received values of form: ', values);
          this.$post("alarm/create", {...values})
            .then(res => {
              if (res) {
                this.getlist()
                this.confirmLoading[1] = false
                this.visible[1] = false
              }
            })
            .catch(err => {
              console.log(err);
              this.confirmLoading[1] = false
              this.visible[1] = false
            });
        }
      });
    },
    edithandleCancel () {
      this.visible[0] = false
    },
    addhandleCancel () {
      this.visible[1] = false
    },
    edit (id) {
      this.visible[0] = true;
      this.$get("alarm/getById", {alarmId: id})
        .then(res => {
          if (res) {
            this.editdate = res.data.data
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    add () {
      this.visible[1] = true;
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
.editinfo{
  .location{
    display: flex;
    align-items: center;
    justify-content: space-between;
    div{
      font-size: 16px;
      letter-spacing: 1px;
      color: #0095ff;
    }
    span{
      font-size: 12px;
      letter-spacing: 0px;
      color: #888888;
    }
  }
  .alarmvalue{
    background-color: #e89090;
    border: solid 1px #ff6666;
    box-shadow: 0px 0px 8px rgba(183,0,0,.5);
    height: 80px;
    padding: 12px 0;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 22px;
    h6{
      color: #e6d3d3;
      font-size: 14px;
      letter-spacing: 1px;
      margin-bottom: 0;
    }
    div{
      color: #b70000;
      font-size: 28px;
      letter-spacing: 2px;
      span{
        font-size: 16px;
        color: #e6d3d3;
        letter-spacing: 1px;
      }
    }
  }
  .status{
    height: 38px;
    display: flex;
    div{
      width: 75px;
      font-size: 14px;
      letter-spacing: 1px;
      color: #323232;
      line-height: 38px;
    }
    ul{
      display: flex;
      li{
        height: 38px;
        padding: 0 18px;
        background-color: #ffffff;
        border: solid 1px #e0e0e0;
        font-size: 14px;
        letter-spacing: 1px;
        color: #888888;
        line-height: 38px;
        text-align: center;
        cursor: pointer;
        border-right: 0;
      }
      li:nth-of-type(1){
        border-radius: 3px 0 0 3px;
      }
      li:nth-last-of-type(1){
        border-radius: 0 3px 3px 0;
        border-right: solid 1px #e0e0e0;
      }
      .active{
        background-color: #0095ff;
        border-color: #0095ff;
        color: #fff;
      }
    }
  }
  .remark{
    margin-top: 10px;
    display: flex;
    div{
      width: 75px;
      font-size: 14px;
      letter-spacing: 1px;
      color: #323232;
      line-height: 38px;
    }
    input{
      flex: 1;
      height: 38px;
      border: solid 1px #e0e0e0;
      padding: 0 10px;
      outline: none;
      line-height: 38px;
    }
  }
}
div{}
</style>