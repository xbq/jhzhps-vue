<template>
  <div class="app-container">
    <a-card class="time" :body-style="{padding: '0 10px'}">
       <ul>
         <li :class="activetime===0?'active':''" @click="settime(0)">所有</li>
         <li :class="activetime===1?'active':''" @click="settime(1)">当天</li>
         <li :class="activetime===2?'active':''" @click="settime(2)">三天</li>
         <li :class="activetime===3?'active':''" @click="settime(3)">本周</li>
         <li :class="activetime===4?'active':''" @click="settime(4)">本月</li>
         <li :class="activetime===5?'active':''" @click="settime(5)">本年</li>
         <li :class="activetime===6?'active':''" @click="settime(6)">自定义</li>
       </ul>
      <div>
        <a-range-picker size="large" @change="onChange" v-model="date" :disabled="activetime!==6"></a-range-picker>
      </div>
    </a-card>
    <a-card :body-style="{padding: '0 10px',marginTop: '15px'}">
      <h3>按类型统计</h3>
      <div class="types">
        <div class="tasktype">
          <h4>地点任务详情情况统计</h4>
          <div id="tasktype"></div>
        </div>
        <ul>
          <li v-for="(item, index) in places" @click="tabplace(index)" :class="tabactive===index?'active':''" :key="index">
            <div>{{item.bigLevel}}</div>
            <p>{{item.num}}</p>
          </li>
        </ul>
        <div class="items">
          <div>
            <h4>道路任务小类类型统计</h4>
            <div id="smalltype"></div>
          </div>
          <div>
            <h4>道路任务小类类型统计</h4>
            <div class="select">
              <a-select style='width: 100px' @change="selectchange" v-model="selectval">
                <a-select-option v-for="(item, index) in selectdetail" :key="index" :value="item.smallLevelId">{{item.smallLevel}}</a-select-option>
              </a-select>
            </div>
            <div id="detailtype"></div>
          </div>
        </div>
      </div>
    </a-card>
    <a-card :body-style="{padding: '0 10px',marginTop: '15px'}">
      <h3>按地点统计</h3>
       <div class="place">
         <h4>地点任务情况统计</h4>
         <a-row :gutter="15">
           <a-col :span="12">
             <a-table :rowClassName="(record,index)=>{return record.key===tableactive?'tableactive':''}" size="middle" :customRow="customRow" :columns="columns" :dataSource="data" :style="{marginTop: '20px'}" :scroll="{ y: 400}" :pagination="pagination" @change="pagechange"
                      :loading="loading">
               <div slot="description" slot-scope="text" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 90px" :title="text">
                 <span>{{text?text:'未知'}}</span>
               </div>
             </a-table>
           </a-col>
           <a-col :span="12">
             <div id="maps">
               map
             </div>
           </a-col>
         </a-row>
       </div>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      activetime: 0, //时间选择切换
      tabactive: 0, // 地点选择切换
      columns: [
        { title: '地点/路线', width: 110, dataIndex: 'roadName', key: 'roadName',  scopedSlots: { customRender: 'description' }},
        { title: '任务总量', dataIndex: 'count', key: 'count', customRender: (text) => text?text:0},
        { title: '桥梁任务', dataIndex: '桥梁', key: '桥梁', customRender: (text) => text?text:0},
        { title: '道路任务', dataIndex: '道路', key: '道路', customRender: (text) => text?text:0},
        { title: '排水任务', dataIndex: '排水', key: '排水', customRender: (text) => text?text:0},
        { title: '交通设施', dataIndex: '交通设施', key: '交通设施', customRender: (text) => text?text:0},
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
        pageSizeOptions: ['10', '20', '30', '40', '50']
      }, // 分页配置
      loading: false, // 表格是否加载中
      places: [], // 道路数据
      date: [], // 绑定时间
      selectdetail: [], //地点详情下拉框选项
      selectval: '', // 下拉框选中
      customRow:  (record) => {
        return {
          props: {
            // xxx... //属性
          },
          on: { // 事件
            click: () => {
              // console.log(record);
              this.tableactive = record.key
              this.getmapplace(record.roadName)
            },       // 点击行
            mouseenter: () => {
            },  // 鼠标移入行
            // xxxx...
          },
        }
      }, // 设置表格行事件
      tableactive: 0, // 表格选中行的key
    }
  },
  created() {
    this.getplaces()
    this.gettable()
  },
  methods: {
    // 处理时间
    moment,
    // 页码改变时重新获取数据
    pagechange (pagination) {
      if(this.pagination.pageSize !== pagination.pageSize){
        pagination.current = 1;
      }
      this.pagination = pagination;
      this.gettable()
    },
    // 设置时间
    settime(i) {
      this.activetime = i
      let date = new Date()
      // console.log(date);
      switch (i) {
        case 0: this.date = [];break;
        case 1: this.date = [moment(date, 'YYYY-MM-DD'), moment(date, 'YYYY-MM-DD')];break;
        case 2: this.date = [moment(new Date(date.getTime() - 86400000 * 2), 'YYYY-MM-DD'), moment(date, 'YYYY-MM-DD')];break;
        case 3: this.date = [moment(new Date(date-(date.getDay()-1)*86400000), 'YYYY-MM-DD'), moment(date, 'YYYY-MM-DD')];break;
        case 4: this.date = [moment(new Date(date.getFullYear(),date.getMonth(),1), 'YYYY-MM-DD'), moment(date, 'YYYY-MM-DD')];break;
        case 5: this.date = [moment(date.getFullYear() + '-01-01', 'YYYY-MM-DD'), moment(date, 'YYYY-MM-DD')];break;
        case 6: return;
      }
      this.pagination.current = 1;
      this.getplaces()
      this.gettable()
    },
    // 日期改变的回调
    onChange(date, dateString) {
      console.log(date, dateString);
      this.pagination.current = 1;
      this.getplaces()
      this.gettable()
    },
    // 获取地点任务情况统计图表
    getplaces() {
      this.$get("task/sta/groupByBigLevel", this.date.length>0?{beginTime: this.date[0].format('YYYY-MM-DD'), endTime: this.date[1].format('YYYY-MM-DD')}:{})
        .then(res => {
          if (res) {
            this.places = res.data.data
            this.tabplace(0)
            let echarts = this.$echarts.init(document.getElementById('tasktype'))
            let rich = {
              yellow: {
                color: "#ffc72b",
                fontSize: 12,
                padding: [5, 4],
                align: 'center'
              },
              total: {
                color: "#0095ff",
                fontSize: 30,
                align: 'center'
              },
              white: {
                color: "#fff",
                align: 'center',
                fontSize: 12,
                padding: [21, 0]
              },
              blue: {
                color: '#49dff0',
                fontSize: 12,
                align: 'center'
              },
              hr: {
                borderColor: '#0b5263',
                width: '100%',
                borderWidth: 1,
                height: 0,
              }
            }
            let option = {
              backgroundColor: 'transparent',
              title: {
                text: '总任务数量',
                subtext: res.data.data.reduce((total, val) => {
                  return total + val.num
                }, 0),
                subtextStyle: {
                  color: "#0095ff",
                  fontSize: 30,
                  rich: rich
                },
                left: 'center',
                top: '36%',
                padding: [24, 0],
                textStyle: {
                  color: '#323232',
                  fontSize: 12,
                  align: 'center'
                }
              },
              series: [{
                name: '总任务数量',
                type: 'pie',
                radius: ['52%', '75%'],
                hoverAnimation: false,
                color: ['#6734e2', '#ffcf7b', '#8cdd80', '#0083cc'],
                label: {
                  normal: {
                    show: false
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: JSON.parse(JSON.stringify(res.data.data).replace(/bigLevel/g, "name").replace(/num/g, "value"))
              }]
            };
            echarts.setOption(option);
            // window.onresize = echarts.resize;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 切换地点
    tabplace(i) {
      this.tabactive = i
      this.getsmall(this.places[i].bigLevelId, this.places[i].bigLevel)
    },
    // 下拉框选项改变
    selectchange(val, option) {
      this.getdetail(val, option.key)
    },
    // 获取地点任务情况统计表格
    gettable() {
      this.$get("task/sta/groupByRoad", this.date.length>0?{beginTime: this.date[0].format('YYYY-MM-DD'), endTime: this.date[1].format('YYYY-MM-DD'),limit: this.pagination.pageSize, page: this.pagination.current}:{limit: this.pagination.pageSize, page: this.pagination.current})
        .then(res => {
          if (res) {
            // console.log(res);
            if(res.data.data){
              this.pagination.total = res.data.count
              this.data = res.data.data
              this.data.forEach((val, index) => {
                val.key = index
              })
              this.getmapplace(res.data.data[0].roadName)
              this.tableactive = 0
            }else {
              this.data = []
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取详细数据
    getsmall(bigLevelId, text) {
      // 获取小类类型 统计图表
      this.$get("task/sta/groupBySmallLevel", this.date.length>0?{beginTime: this.date[0].format('YYYY-MM-DD'),  endTime: this.date[1].format('YYYY-MM-DD'), bigLevelId}:{bigLevelId})
        .then(res => {
          if (res) {
            // console.log(res);
            if (res.data.data.length > 0) {
              this.selectval = res.data.data[0].smallLevelId
              this.getdetail(res.data.data[0].smallLevelId, 0)
            }else {
              this.selectval = ''
              this.$echarts.init(document.getElementById('detailtype')).clear()
            }
            this.selectdetail = res.data.data
            let echarts_types = this.$echarts.init(document.getElementById('smalltype'))
            let rich = {
              yellow: {
                color: "#4a525c",
                fontSize: 12,
                align: 'center',
                padding: [2, 4]
              },
              total: {
                color: "#4a525c",
                fontSize: 30,
                align: 'center'
              },
              white: {
                color: "#4a525c",
                align: 'center',
                fontSize: 12,
              },
              blue: {
                color: '#4a525c',
                fontSize: 12,
                align: 'center',
                padding: [2, 0]
              },
              hr: {
                borderColor: '#e9eef5',
                width: '100%',
                borderWidth: 1,
                height: 0,
              }
            }
            let total = res.data.data.reduce((total, val) => {
              return total + val.num
            }, 0)
            let option ={
              backgroundColor: 'transparent',
              title: {
                text: text + '任务数',
                subtext: total,
                subtextStyle: {
                  color: "#4a525c",
                  fontSize: 30,
                  rich: rich
                },
                left: 'center',
                top: '36%',
                padding: [24, 0],
                textStyle: {
                  color: '#4a525c',
                  fontSize: 12,
                  align: 'center'
                }
              },
              series: [{
                name: '道路任务数',
                type: 'pie',
                radius: ['32%', '60%'],
                hoverAnimation: false,
                roseType: 'area',
                color: ['#2291ff', '#446cb3', '#4684b2', '#69b3e0', '#81cfe0', '#b3ecf4', '#5cdfe5', '#50d1b8', '#46b280'],
                label: {
                  normal: {
                    formatter: function (params) {
                      // var total = 0; //考生总数量
                      var percent = 0; //考生占比
                      // console.log(params.data)
                      // console.log(total)
                      percent = ((params.data.value / total) * 100).toFixed(1);
                      return '{white|' + params.data.smallLevel + '}{yellow|' + params.data.value + '}\n{hr|}\n{blue|' + percent + '%}';
                    },
                    rich: rich
                  },
                },
                labelLine: {
                  normal: {
                    length: 15,
                    length2: 0,
                    lineStyle: {
                      color: '#e9eef5'
                    }
                  }
                },
                data: JSON.parse(JSON.stringify(res.data.data).replace(/bigLevel/g, "name").replace(/num/g, "value"))
              }]
            }
            echarts_types.setOption(option);
            window.addEventListener("resize", function () {
              echarts_types.resize()
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getdetail(smallLevelId, index) {
      // 获取细分类型统计图表
      this.$get("task/sta/groupByDetailLevel", this.date.length>0?{beginTime: this.date[0].format('YYYY-MM-DD'),  endTime: this.date[1].format('YYYY-MM-DD'), smallLevelId}:{smallLevelId})
        .then(res => {
          if (res) {
            // console.log(res);
            let echarts_type = this.$echarts.init(document.getElementById('detailtype'))
            let xData = [], yData = [], colorData = ['#2291ff', '#446cb3', '#4684b2', '#69b3e0', '#81cfe0', '#b3ecf4', '#5cdfe5', '#50d1b8', '#46b280'];
            if (res.data.data.length) {
              res.data.data.forEach(function (element) {
                xData.push(element.detailLevel);
                yData.push(element.num);
              });
            }
            let option = {
              backgroundColor: 'transparent',
              tooltip: {},
              // calculable : true,
              grid: {
                top: 40,
                bottom: 0,
                left: 0,
                right: 20,
                containLabel: true
              },
              xAxis: [{
                'type': 'category',
                'data': xData,
                axisLabel: {
                  interval: 0,
                  rotate: 20,
                  margin: 30,
                  textStyle: {
                    color: '#657080',
                    align: 'center',
                    fontSize: 10,
                  },
                },
                axisLine: {
                  lineStyle: {
                    color: '#f0f2f5'
                  }
                },
                axisTick: {
                  alignWithLabel: true,
                  show: false
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: ['#f0f2f5'],
                    type: 'solid'
                  }
                },
              }],
              yAxis: [{
                type: 'value',
                name: '个',
                nameTextStyle: {
                  color: '#657080',
                  fontSize: 12,
                },
                axisLabel: {
                  interval: 0,
                  // rotate:20,
                  margin: 10,
                  textStyle: {
                    color: '#657080',
                    align: 'center',
                    fontSize: 12,
                  },
                },
                axisLine: {
                  lineStyle: {
                    color: '#f0f2f5'
                  }
                },
                axisTick: {
                  alignWithLabel: true,
                  show: false
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: ['#f0f2f5'],
                    type: 'solid'
                  }
                },
              }],
              series: [{
                type: 'bar',
                data: yData,
                barWidth: 20,
                itemStyle: {
                  normal: {
                    color: colorData[index]
                  }
                }
              }]
            }
            // window.onresize = echarts_type.resize;
            window.addEventListener("resize", function () {
              echarts_type.resize()
            });
            echarts_type.setOption(option);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取地图地点
    getmapplace(roadName) {
      this.$get("task/getListByRoadName", {roadName})
        .then(res => {
          if (res) {
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
</script>
<style scoped lang="scss">
h4{
  letter-spacing: 1px;
  color: #323232;
  font-size: 16px;
  line-height: 16px;
  height: 16px;
  margin-top: 30px;
}
.time{
  height: 130px;
  div{
    text-align: center;
    margin-top: 18px;
  }
  ul{
    display: flex;
    justify-content: center;
    cursor: pointer;
    li{
      width: 120px;
      height: 32px;
      line-height: 32px;
      background-color: #ffffff;
      border: solid 1px #e6e6e6;
      opacity: 0.6;
      letter-spacing: 1px;
      color: #888888;
      text-align: center;
      &:nth-of-type(1){
        border-radius: 3px 0 0 3px;
      }
      &:nth-last-of-type(1){
        border-radius: 0 3px 3px 0;
      }
    }
    .active{
      border-color: #0095ff;
      background-color: #e9f6ff;
      color: #0095ff;
    }
  }
}
.types{
  display: flex;
  height: 447px;
  padding: 0 10px;
  .tasktype{
    width: 310px;
  }
  #tasktype{
    width: 100%;
    height: 360px;
  }
  ul{
    width: 122px;
    margin-top: 30px;
    cursor: pointer;
    li{
      height: 90px;
      letter-spacing: 0;
      border-right: solid 1px #0095ff;
      padding: 25px 0 25px 32px;
      div{
        letter-spacing: 1px;
        color: #888888;
        height: 12px;
        line-height: 12px;
        position: relative;
        &:before{
          content: '';
          position: absolute;
          top: 2px;
          left: -13px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
      }
      p{
        margin-top: 6px;
        font-size: 26px;
        line-height: 21px;
        height: 21px;
        color: #323232;
      }
      &:nth-of-type(1){
        div:before{
          background-color: #0083cc;
        }
      }
      &:nth-of-type(2){
        div:before{
          background-color: #8cdd80;
        }
      }
      &:nth-of-type(3){
        div:before{
          background-color: #ffcf7b;
        }
      }
      &:nth-of-type(4){
        div:before{
          background-color: #6734e2;
        }
      }
    }
    .active{
      border-right: 0;
      background: url(./img/task-hover.png) center center no-repeat #fff;
      background-size: 100% 100%;
      border-color: #0095ff;
      color: #0095ff;
      div{
        color: #56baff;
      }
      p{
        color: #0095ff;
      }
    }
  }
  .items{
    width: calc(100% - 432px);
    display: flex;
    margin-top: 30px;
    height: 360px;
    border: solid 1px #0095ff;
    border-left: 0;
    &>div{
      width: 50%;
      position: relative;
      h4{
        padding-left: 38px;
      }
      #smalltype, #detailtype{
        width: 100%;
        height: calc(100% - 86px);
      }
      .select{
        position: absolute;
        right: 0;
        left: 0;
        top: 54px;
        text-align: center;
        z-index: 2;
      }
      @media screen and (min-width: 1400px) {
        .select{
          top: 22px;
          right: 25px;
          left: unset;
        }
      }
    }

  }
}
.place{
  padding: 0 10px 30px;
  /*height: 619px;*/
  h4+div{
    height: 508px;
    margin-top: 30px;
    .map{
      height: 508px;
    }
  }
}
div{}
</style>