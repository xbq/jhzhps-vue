<template>
  <div class="app-container">
    <a-row :gutter="15">
      <a-col :span="6">
        <a-card :body-style="{padding: '0 10px'}">
          <h3>报警情况</h3>
          <a-spin :spinning=false>
            <a-row class="mycardcont" :gutter="10">
              <a-col :span="12">
                <h6>总报警次数</h6>
                <p>{{countByStatus[0]}}</p>
              </a-col>
              <a-col :span="12">
                <h6>已处理报警数</h6>
                <p>{{countByStatus[1]}}</p>
              </a-col>
              <a-col :span="12">
                <h6>处理中报警数</h6>
                <p>{{countByStatus[2]}}</p>
              </a-col>
              <a-col :span="12">
                <h6>已忽略报警数</h6>
                <p>{{countByStatus[3]}}</p>
              </a-col>
            </a-row>
          </a-spin>
        </a-card>
      </a-col>
      <a-col :span="10">
        <a-card :body-style="{padding: '0 10px'}">
          <h3>监测点统计</h3>
          <a-spin :spinning=false>
            <a-row class="mycardcont" :gutter="10">
              <a-col :span="8" v-for="(item,index) in pointtype"  :key="index">
                <h6>{{item.type}}</h6>
                <p>{{item.COUNT}}</p>
              </a-col>
            </a-row>
          </a-spin>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card :body-style="{padding: '0 10px'}">
          <h3>监测点类型统计</h3>
          <div class="mycardcont" id="pointtype"></div>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="15" style="margin-top: 15px">
      <a-col :span="8" >
        <a-card :body-style="{padding: '0 10px'}">
          <h3>易涝监测点最新数据</h3>
          <a-spin :spinning=false>
            <a-row class="mycardcont mycardcont2" :gutter="10">
              <a-col :span="8" v-for="(item,index) in floodnewdata"  :key="index">
                <h6 :title="item.location">{{item.location}}</h6>
                <p  :title="item.recordTime">{{item.dataValue.toFixed(2)}}<span>{{item.unit}}</span></p>
              </a-col>
            </a-row>
          </a-spin>
        </a-card>
      </a-col>
      <a-col :span="10">
        <a-card :body-style="{padding: '0 10px'}">
          <h3>水质监测点最新数据</h3>
          <a-spin :spinning=false>
            <a-row class="mycardcont mycardcont2" :gutter="10">
              <waternewdata></waternewdata>
            </a-row>
          </a-spin>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card :body-style="{padding: '0 10px'}">
          <h3>流量监测点最新数据</h3>
          <a-spin :spinning=false>
            <a-row class="mycardcont mycardcont2" :gutter="10">
              <a-col :span="24" v-for="(item,index) in flownewdata"  :key="index">
                <h6 :title="item.dataType">{{item.dataType}}</h6>
                <p :title="item.recordTime">{{item.dataValue.toFixed(2)}}<span>{{item.unit}}</span></p>
              </a-col>
            </a-row>
          </a-spin>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="15" style="margin-top: 15px">
      <a-col :span="15" >
        <a-card :body-style="{padding: '0 10px'}">
          <h3>监测数据统计
            <a class="tabcircle">
              <div v-for="i in [0,1,2]"  :key="i" @mouseenter="datatab(i)" :class="pointtabindex===i?'active':''"></div>
            </a>
          </h3>
          <div class="tabs">
            <div class="times">
              当前时间：{{newtime}}
            </div>
            <div v-if="pointtabindex===0">
              <div class="echarts-title">易涝点水位24小时数据</div>
              <ul class="L-tabtitle">
                <li :class="floodactive === 0 ? 'active' : ''" @click="floodechart(0)">八一立交</li>
                <li :class="floodactive === 1 ? 'active' : ''" @click="floodechart(1)">环城东路/丰亭路</li>
                <li :class="floodactive === 2 ? 'active' : ''" @click="floodechart(2)">洪源立交</li>
              </ul>
              <a-spin :spinning='spinning[0]'>
                <div>
                  <div v-if="floodechartdata !== '今日无数据'" id="L-floorecharts" style="height: 304px;width: 100%"></div>
                  <nodata v-else></nodata>
                </div>
              </a-spin>
            </div>
            <div v-if="pointtabindex===1">
              <div class="echarts-title">水质监测点24小时数据</div>
              <ul class="L-tabtitle">
                <li :class="wateractive === 0 ? 'active' : ''" @click="waterechart(0)">COD</li>
                <li :class="wateractive === 1 ? 'active' : ''" @click="waterechart(1)">PH值</li>
                <li :class="wateractive === 2 ? 'active' : ''" @click="waterechart(2)">氨氮</li>
                <li :class="wateractive === 3 ? 'active' : ''" @click="waterechart(3)">电导率</li>
                <li :class="wateractive === 4 ? 'active' : ''" @click="waterechart(4)">浊度</li>
                <li :class="wateractive === 5 ? 'active' : ''" @click="waterechart(5)">溶解氧</li>
                <li :class="wateractive === 6 ? 'active' : ''" @click="waterechart(6)">水温</li>
              </ul>
              <a-spin :spinning='spinning[1]'>
                <div v-if="waterechartdata !== '今日无数据'" id="L-waterecharts"  style="height: 304px;width: 100%"></div>
                <nodata v-else></nodata>
              </a-spin>
            </div>
            <div v-if="pointtabindex===2">
              <div class="echarts-title">流量监测点24小时数据</div>
              <a-spin :spinning='spinning[2]'>
                <div v-if="flowechartdata.list !== '今日无数据'" id="L-flowecharts"  style="height: 304px;width: 100%;margin-top: 45px"></div>
                <nodata v-else></nodata>
              </a-spin>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :span="9">
        <a-card :body-style="{padding: '0 10px'}"  v-if="pointtabindex===0">
          <h3>监测数据</h3>
          <div style="border-bottom: 1px solid #e0e0e0;padding-bottom: 2px">
            <div class="data-title">易涝点水位今日均值</div>
            <a-spin :spinning=false>
              <a-row v-if="floodavgAndTopData.todayAvg !== '今日无数据'" class="mycardcont mycardcont2" :gutter="10">
                <a-col :span="8" v-for="(item,index) in floodavgAndTopData.todayAvg" :key="index">
                  <h6>{{item.location}}</h6>
                  <p :title="item.recordTime">{{item.dataValue.toFixed(2)}}<span>{{item.unit}}</span></p>
                </a-col>
              </a-row>
              <div v-else class="mycardcont mycardcont2">
                <p style="text-align: center"><span>无</span></p>
              </div>
            </a-spin>
          </div>
          <div style="padding: 8px 0 13px">
            <div class="data-title">易涝点历史最高水位</div>
            <a-spin :spinning=false>
              <a-row class="mycardcont mycardcont2" :gutter="10">
                <a-col :span="8" v-for="(item,index) in floodavgAndTopData.histrcalBigest" :key="index">
                  <h6 :title="item.location">{{item.location}}</h6>
                  <p :title="item.recordTime">{{item.dataValue.toFixed(2)}}<span>{{item.unit}}</span></p>
                </a-col>
              </a-row>
            </a-spin>
          </div>
        </a-card>
        <a-card :body-style="{padding: '0 10px'}"  v-else-if="pointtabindex===1">
          <h3>监测数据</h3>
          <div style="border-bottom: 1px solid #e0e0e0;padding-bottom: 2px">
            <div class="data-title">水质监测点24小时均值</div>
            <a-spin :spinning=false>
              <a-row class="mycardcont mycardcont2" :gutter="10">
                <a-carousel autoplay v-if="wateravgAndTopData.todayAvg !== '今日无数据'">
                  <a slot="customPaging">
                    <div></div>
                  </a>
                  <div v-for="(item,index) in wateravgAndTopData.todayAvg" :key="index">
                    <a-col :span="12" v-for="(items,indexs) in item" :key="indexs">
                      <h6>{{items.dataType}}</h6>
                      <p :title="items.recordTime">{{items.dataValue.toFixed(2)}}<span>{{items.unit}}</span></p>
                    </a-col>
                  </div>
                </a-carousel>
                <p v-else style="text-align: center"><span>无</span></p>
              </a-row>
            </a-spin>
          </div>
          <div style="padding: 8px 0 13px">
            <div class="data-title">水质历史最高数据</div>
            <a-spin :spinning=false>
              <a-row class="mycardcont mycardcont2" :gutter="10">
                <a-carousel autoplay>
                  <a slot="customPaging">
                    <div></div>
                  </a>
                  <div v-for="(item,index) in wateravgAndTopData.histrcalBigest" :key="index">
                    <a-col :span="12" v-for="(items,indexs) in item" :key="indexs">
                      <h6>{{items.dataType}}</h6>
                      <p :title="items.recordTime">{{items.dataValue.toFixed(2)}}<span>{{items.unit}}</span></p>
                    </a-col>
                  </div>
                </a-carousel>
              </a-row>
            </a-spin>
          </div>
        </a-card>
        <a-card :body-style="{padding: '0 10px'}"  v-else-if="pointtabindex===2">
          <h3>监测数据</h3>
          <div style="border-bottom: 1px solid #e0e0e0;padding-bottom: 2px">
            <div class="data-title">流量监测点24小时数据</div>
            <a-spin :spinning=false>
              <a-row class="mycardcont mycardcont2" :gutter="10">
                <a-col :span="12">
                  <h6>流量均值</h6>
                  <p v-if="flowavgAndTopData.todayBigest !== '今日无数据'">{{flowavgAndTopData.todayBigest[0].dataValue.toFixed(2)}}<span>{{flowavgAndTopData.todayBigest[0].unit}}</span></p>
                  <p v-else><span>无</span></p>
                </a-col>
                <a-col :span="12">
                  <h6>流量峰值</h6>
                  <p v-if="flowavgAndTopData.todayAvg !== '今日无数据'">{{flowavgAndTopData.todayAvg[0].dataValue.toFixed(2)}}<span>{{flowavgAndTopData.todayAvg[0].unit}}</span></p>
                  <p v-else><span>无</span></p>
                </a-col>
              </a-row>
            </a-spin>
          </div>
          <div style="padding: 8px 0 13px">
            <div class="data-title">流量历史最高数据</div>
            <a-spin :spinning=false>
              <a-row class="mycardcont mycardcont2" :gutter="10">
                <a-col :span="12">
                  <h6>最高均值</h6>
                  <p :title="flowavgAndTopData.histrcalAvg[0].recordTime">{{flowavgAndTopData.histrcalAvg[0].dataValue.toFixed(2)}}<span>{{flowavgAndTopData.histrcalAvg[0].unit}}</span></p>
                </a-col>
                <a-col :span="12">
                  <h6>最高峰值</h6>
                  <p :title="flowavgAndTopData.histrcalAvg[0].recordTime">{{flowavgAndTopData.histrcalBigest[0].dataValue.toFixed(2)}}<span>{{flowavgAndTopData.histrcalBigest[0].unit}}</span></p>
                </a-col>
              </a-row>
            </a-spin>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import waternewdata from './components/water-newdata'
import nodata from '@/components/nodata'
export default {
  data() {
    return {
      countByStatus: [0, 0, 0, 0],
      pointtabindex: 0, // 绑定监测数据切换
      newtime: '', // 当前时间
      pointtype: [], //监测点类型统计数据
      floodnewdata: [], //易涝监测点最新数据
      flownewdata: [], //流量监测点最新数据
      flowavgAndTopData: {}, // 流量均值和峰值
      floodavgAndTopData: {}, // 流量均值和峰值
      wateravgAndTopData: {}, // 流量均值和峰值
      floodechartdata: [], //易涝图表数据
      waterechartdata: [], //水质图表数据
      flowechartdata: [], //流量图表数据
      spinning: [true, true, true], //数据加载中
      floodactive: 0, // 易涝选中
      wateractive: 0, // 水质选中
    }
  },
  components: {
    waternewdata,
    nodata
  },
  mounted() {
  },
  created() {
    // 实时获取当前时间
    let date = new Date()
    this.newtime = this.checkTime(date.getHours()) + ":" + this.checkTime(date.getMinutes()) + ":" + this.checkTime(date.getSeconds())
    this.times = setInterval(() => {
      let date = new Date()
      this.newtime = this.checkTime(date.getHours()) + ":" + this.checkTime(date.getMinutes()) + ":" + this.checkTime(date.getSeconds())
    },1000)
    // 报警情况接口
    this.$get("alarm/countByStatus", {origin: 1})
      .then(res => {
        if (res) {
          // console.log(res);
          this.countByStatus[0] = res.data.count;
          res.data.data.forEach((val) => {
            if (val.STATUS == "已忽略") {
              this.countByStatus[3] = val.COUNT
            } else if (val.STATUS == "已处理") {
              this.countByStatus[1] = val.COUNT
            } else if (val.STATUS == "处理中") {
              this.countByStatus[2] = val.COUNT
            }
          })
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 监测点类型接口
    this.$get("checkPoint/countByType",{origin: 1})
      .then(res => {
        if (res) {
          // console.log(res);
          this.pointtype = res.data.data
          let pointdata = JSON.parse(JSON.stringify(res.data.data).replace(/type/g, "name").replace(/COUNT/g, "value"));
          // 监测点类型统计图表
          var echarts_type = this.$echarts.init(document.getElementById('pointtype')),
            options_type = {
              //访客浏览器分布
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} (个)"
              },
              legend: {
                orient: 'vertical',
                right: '1%',
                bottom: '20%',
                data: pointdata.map((val) => {
                  return val.name
                })
              },
              series: [{
                name: '监测点类型',
                type: 'pie',
                radius: ['35%', '70%'],
                center: ['35%', '50%'],
                data: pointdata,
                color: ['#eda958', '#ea5f59', '#0eccba', '#4885ff', '#7650ff', '#ffcb58'],
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
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 易涝监测点最新数据接口
    this.$get("checkPointData/getLastData", {type: 1})
      .then(res => {
        if (res) {
          // console.log(res);
          this.floodnewdata = res.data.data
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 流量监测点最新数据接口
    this.$get("checkPointData/getLastData", {type: 3})
      .then(res => {
        if (res) {
          // console.log(res);
          this.flownewdata = [res.data.data[0]]
        }
      })
      .catch(err => {
        console.log(err);
      });
    //监测数据统计-易涝点水位均值和峰值-tab切换模块接口数据
    this.$get("checkPointData/avgAndTopDataByType", {type: 1})
      .then(res => {
        if (res) {
          // console.log(res);
          this.floodavgAndTopData = res.data.data
        }
      })
      .catch(err => {
        console.log(err);
      });
    //监测数据统计-水质监测点均值和峰值-tab切换模块接口数据
    this.$get("checkPointData/avgAndTopDataByType", {type: 2})
      .then(res => {
        if (res) {
          // console.log(res);
          this.wateravgAndTopData.histrcalBigest = []
          res.data.data.histrcalBigest.forEach((val,index) => {
            if (index%2 === 0) {
              this.wateravgAndTopData.histrcalBigest.push([])
            }
            this.wateravgAndTopData.histrcalBigest[Math.floor(index/2)].push(val)
          })
          if (res.data.data.todayAvg !== '今日无数据') {
            this.wateravgAndTopData.todayAvg = []
            res.data.data.todayAvg.forEach((val,index) => {
              if (index%2 === 0) {
                this.wateravgAndTopData.todayAvg.push([])
              }
              this.wateravgAndTopData.todayAvg[Math.floor(index/2)].push(val)
            })
          }else {
            this.wateravgAndTopData.todayAvg = '今日无数据'
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
    //监测数据统计-流量监测点今日数据-tab切换模块接口数据
    this.$get("checkPointData/avgAndTopDataByType", {type: 3})
      .then(res => {
        if (res) {
          // console.log(res);
          this.flowavgAndTopData = res.data.data
        }
      })
      .catch(err => {
        console.log(err);
      });
    //监测数据统计-易涝点水位今日数据-tab切换模块接口数据
    this.$get("checkPointData/informationByType", {type: 1})
      .then(res => {
        if (res) {
          console.log(res.data.data.list !== '今日无数据');
          if (res.data.data.list !== '今日无数据') {
            this.floodechartdata[0].dataBeast = [];
            this.floodechartdata[0].xAxisData = [];
            res.data.data.list1.forEach((val) => {
              this.floodechartdata[0].xAxisData.push(val.recordTime.slice(11));
              this.floodechartdata[0].dataBeast.push(val.dataValue);
            })
            this.floodechartdata[1].dataBeast = [];
            this.floodechartdata[1].xAxisData = [];
            res.data.data.list2.forEach((val) => {
              this.floodechartdata[1].xAxisData.push(val.recordTime.slice(11));
              this.floodechartdata[1].dataBeast.push(val.dataValue);
            })
            this.floodechartdata[2].dataBeast = [];
            this.floodechartdata[2].xAxisData = [];
            res.data.data.list3.forEach((val) => {
              this.floodechartdata[2].xAxisData.push(val.recordTime.slice(11));
              this.floodechartdata[2].dataBeast.push(val.dataValue);
            })
          } else {
            this.floodechartdata = '今日无数据'
          }
          this.floodechart(0)
        }
      })
      .catch(err => {
        console.log(err);
      });
    //监测数据统计-水质监测点今日数据-tab切换模块接口数据
    this.$get("checkPointData/informationByType", {type: 2})
      .then(res => {
        if (res) {
          // console.log(res);
          if (res.data.data.list !== '今日无数据') {
            res.data.data.list.forEach((val) => {
              if (val.dataType === 'COD') {
                this.waterechartdata[0].dataBeast.push(val.dataValue);
                this.waterechartdata[0].xAxisData.push(val.recordTime.slice(11));
              } else if (val.dataType === 'PH') {
                this.waterechartdata[1].dataBeast.push(val.dataValue);
                this.waterechartdata[1].xAxisData.push(val.recordTime.slice(11));
              } else if (val.dataType === '氨氮') {
                this.waterechartdata[2].dataBeast.push(val.dataValue);
                this.waterechartdata[2].xAxisData.push(val.recordTime.slice(11));
              } else if (val.dataType === 'DDL') {
                this.waterechartdata[3].dataBeast.push(val.dataValue);
                this.waterechartdata[3].xAxisData.push(val.recordTime.slice(11));
              } else if (val.dataType === '浊度') {
                this.waterechartdata[4].dataBeast.push(val.dataValue);
                this.waterechartdata[4].xAxisData.push(val.recordTime.slice(11));
              } else if (val.dataType === 'DO') {
                this.waterechartdata[5].dataBeast.push(val.dataValue);
                this.waterechartdata[5].xAxisData.push(val.recordTime.slice(11));
              } else if (val.dataType === 'WT') {
                this.waterechartdata[6].dataBeast.push(val.dataValue);
                this.waterechartdata[6].xAxisData.push(val.recordTime.slice(11));
              }
            })
          } else {
            this.waterechartdata = '今日无数据'
          }
          this.waterechart(0)
        }
      })
      .catch(err => {
        console.log(err);
      });
    //监测数据统计-流量监测点今日数据-tab切换模块接口数据
    this.$get("checkPointData/informationByType", {type: 3})
      .then(res => {
        if (res) {
          // console.log(res);
          this.flowechartdata = res.data.data
          if (res.data.data.list !== '今日无数据') {
            let dataBeast = [];
            let xAxisData = [];
            res.data.data.list.forEach((val) => {
              xAxisData.push(val.recordTime.slice(11));
              dataBeast.push(val.dataValue);
            })
            this.flowechart(xAxisData, dataBeast)
          }
          this.spinning[2] = false
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    //校验时间,小于10前面加0
    checkTime (time) {
      if(time < 10) return "0" + time;
      return time;
    },
    datatab (i) {
      this.pointtabindex = i
    },
    // 易涝点水位今日数据图表
    floodechart (i) {
      this.spinning[0] = true
      this.floodactive = i
      if (this.floodechartdata !== '今日无数据') {
        var Lfloodecharts = this.$echarts.init(document.getElementById('L-floodecharts'))
        Lfloodecharts.clear()
        var option =
          {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                lineStyle: {
                  color: '#ddd'
                }
              },
              padding: [5, 10]
            },
            backgroundColor: '#ffffff',
            grid: {
              show: false,
              backgroundColor: '#ffffff',
              left: '3%',
              right: '4%',
              bottom: '5%',
              top: 120,
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: this.floodechartdata[i].xAxisData,
              boundaryGap: false,
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#0095ff'
                }
              },
              axisLabel: {
                margin: 10,
                textStyle: {
                  fontSize: 12,
                  color: '#323232'
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#efefef'],
                  type: 'solid'
                }
              },
            },
            yAxis: {
              type: 'value',
              name: 'cm',
              nameLocation: 'end',
              nameGap: 10,
              nameTextStyle: {
                color: '#BCBCBC',
                fontSize: 12
              },
              splitLine: {
                lineStyle: {
                  color: ['#efefef'],
                  type: 'solid'
                }
              },
              axisTick: {
                show: false,
                inside: true,
                lineStyle: {
                  color: '#7B88B5'
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#0095ff'
                }
              },
              axisLabel: {
                margin: 10,
                textStyle: {
                  fontSize: 12,
                  color: '#323232'
                }
              },
              splitArea: {
                show: true,
                // color: ['#ffffff','#e3e3e3']
              }
            },
            dataZoom: [ //给x轴设置滚动条
              {
                start: 0, //默认为0
                end: 100,
                type: 'slider',
                show: false,
              },
              //下面这个属性是里面拖到
              {
                type: 'inside',
                show: true,
                xAxisIndex: [0],
                start: 0, //默认为1
                end: 50
              }
            ],
            series: [{
              name: '易涝点',
              type: 'line',
              smooth: true,
              showSymbol: true,
              // symbol: 'circle',
              symbolSize: 6,
              data: this.floodechartdata[i].dataBeast,
              areaStyle: {
                normal: {
                  color: i===0?'rgba(182, 162, 222,1)':i===1?'rgba(46, 199, 201,0.7)':'rgba(90, 177, 239,0.7)'
                }
              },
              itemStyle: {
                normal: {
                  color: i===0?'#b6a2de':i===1?'#2ec7c9':'#5ab1ef'
                }
              },
              lineStyle: {
                normal: {
                  width: 2
                }
              }
            }]
          };
        Lfloodecharts.setOption(option);
        window.onresize = Lfloodecharts.resize;
        Lfloodecharts.resize()
      }
      this.spinning[0] = false
    },
    // 水质监测点水位今日数据图表
    waterechart (i) {
      this.spinning[1] = true
      this.wateractive = i
      if (this.waterechartdata !== '今日无数据') {
        var Lwaterecharts = this.$echarts.init(document.getElementById('L-waterecharts'))
        Lwaterecharts.clear()
        var options =
            [
              {
                tooltip: {
                  show: true,
                  trigger: 'axis',
                  axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                grid: {
                  show: false,
                  left: '3%',
                  right: '4%',
                  bottom: '5%',
                  top: 120,
                  containLabel: true
                },
                xAxis: {
                  show: true,
                  axisLabel: {
                    interval: 0,
                    // rotate:20,
                    // margin: 20,
                    textStyle: {
                      color: '#323232',
                      align: 'center'
                    },
                  },
                  axisLine: {
                    lineStyle: {
                      color: '#0095ff'
                    }
                  },
                  axisTick: {
                    alignWithLabel: true,
                    show: false
                  },
                  data: [],
                  splitLine: {
                    show: true,
                    lineStyle: {
                      color: ['#D8DBE7'],
                      type: 'solid'
                    }
                  },
                },
                yAxis: [{
                  type: 'value',
                  name: 'mg/L',
                  nameLocation: 'start',
                  nameGap: 20,
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
                  axisTick: {
                    show: false
                  },
                  splitLine: {
                    lineStyle: {
                      color: ['#D8DBE7'],
                      type: 'solid'
                    }
                  },
                }],
                dataZoom: [ //给x轴设置滚动条
                  {
                    start: 0, //默认为0
                    end: [],
                    type: 'slider',
                    show: false,
                  },
                  //下面这个属性是里面拖到
                  {
                    type: 'inside',
                    show: true,
                    xAxisIndex: [0],
                    start: 0, //默认为1
                    end: 50
                  }
                ],
                series: [{
                  type: 'bar',
                  label: {
                    normal: {
                      show: false,
                      position: 'top',
                      textStyle: {
                        fontSize: 12,
                        color: '#0099FF'
                      }
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#60BFFF'
                    }
                  },
                  name: 'COD',
                  barWidth: '40%',
                  data: []
                }]
              },
              {
                tooltip: {
                  show: true,
                  trigger: 'axis',
                  axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'line', // 默认为直线，可选为：'line' | 'shadow'
                    lineStyle: {
                      color: '#e0e0e0'
                    }
                  }
                },
                grid: {
                  show: false,
                  left: '3%',
                  right: '4%',
                  bottom: '5%',
                  top: 120,
                  containLabel: true
                },
                xAxis: {
                  show: true,
                  axisLabel: {
                    interval: 0,
                    // rotate:20,
                    // margin: 20,
                    textStyle: {
                      color: '#323232',
                      align: 'center'
                    },
                  },
                  axisLine: {
                    lineStyle: {
                      color: '#0095ff'
                    }
                  },
                  axisTick: {
                    alignWithLabel: true,
                    show: false
                  },
                  data: [],
                  splitLine: {
                    show: true,
                    lineStyle: {
                      color: ['#D8DBE7'],
                      type: 'solid'
                    }
                  },
                },
                yAxis: [{
                  type: 'value',
                  name: '',
                  nameLocation: 'start',
                  nameGap: 20,
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
                  axisTick: {
                    show: false
                  },
                  splitLine: {
                    lineStyle: {
                      color: ['#D8DBE7'],
                      type: 'solid'
                    }
                  },
                }],
                dataZoom: [ //给x轴设置滚动条
                  {
                    start: 0, //默认为0
                    end: [],
                    type: 'slider',
                    show: false,
                  },
                  //下面这个属性是里面拖到
                  {
                    type: 'inside',
                    show: true,
                    xAxisIndex: [0],
                    start: 0, //默认为1
                    end: 50
                  }
                ],
                series: [{
                  type: 'line',
                  label: {
                    normal: {
                      show: false,
                      position: 'top',
                      textStyle: {
                        fontSize: 12,
                        color: '#0099FF'
                      }
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#60BFFF'
                    }
                  },
                  name: 'PH值',
                  barWidth: '40%',
                  data: []
                }]
              }];
        var option = options[1];
        if (i === 0) {
          option = options[0]
        } else if (i === 1) {
          option.yAxis[0].min = 0
          option.yAxis[0].max = 14
          option.series[0].markLine = {
            silent: true,
            data: [{
              yAxis: 7
            }],
            lineStyle: {
              color: '#c23531'
            }
          }
        } else if (i === 2) {
          option.series[0].name = '氨氮'
        } else if (i === 3) {
          option.yAxis[0].name = 'μs/cm'
          option.series[0].name = '电导率'
        } else if (i === 4) {
          option.yAxis[0].name = 'NTU'
          option.series[0].name = '浊度'
        } else if (i === 5) {
          option = options[0]
          option.series[0].name = '溶解氧'
        } else if (i === 6) {
          option.yAxis[0].name = '℃'
          option.series[0].name = '水温'
        }
        option.xAxis.data = this.waterechartdata[i].xAxisData
        option.series[0].data = this.waterechartdata[i].dataBeast
        option.dataZoom[0].end = (7 / this.waterechartdata[i].xAxisData.length) * 100
        Lwaterecharts.setOption(option);
        window.onresize = Lwaterecharts.resize;
        Lwaterecharts.resize()
      }
      this.spinning[1] = false
    },
    // 流量监测点水位今日数据图表
    flowechart (xAxisData, dataBeast) {
      var Lflowecharts = this.$echarts.init(document.getElementById('L-flowecharts'))
      var option =
        {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#ddd'
              }
            },
            padding: [5, 10]
          },
          backgroundColor: '#ffffff',
          legend: {
            x: 'center',
            y: 50,
            align: 'right',
            textStyle: {
              color: '#868686',
              fontSize: 12
            },
            data: ['流量']
          },
          grid: {
            show: false,
            backgroundColor: '#ffffff',
            left: '3%',
            right: '4%',
            bottom: '5%',
            top: 120,
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: xAxisData,
            boundaryGap: false,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#0095ff'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 12,
                color: '#323232'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#efefef'],
                type: 'solid'
              }
            },
          },
          yAxis: {
            type: 'value',
            name: 'm³/s',
            nameLocation: 'end',
            nameGap: 10,
            nameTextStyle: {
              color: '#BCBCBC',
              fontSize: 12
            },
            splitLine: {
              lineStyle: {
                color: ['#efefef'],
                type: 'solid'
              }
            },
            axisTick: {
              show: false,
              inside: true,
              lineStyle: {
                color: '#7B88B5'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#0095ff'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 12,
                color: '#323232'
              }
            },
            splitArea: {
              show: true,
              // color: ['#ffffff','#e3e3e3']
            }
          },
          dataZoom: [ //给x轴设置滚动条
            {
              start: 0, //默认为0
              end: 100,
              type: 'slider',
              show: false,
            },
            //下面这个属性是里面拖到
            {
              type: 'inside',
              show: true,
              xAxisIndex: [0],
              start: 0, //默认为1
              end: 50
            }
          ],
          series: [{
            name: '流量',
            type: 'line',
            smooth: true,
            showSymbol: true,
            // symbol: 'circle',
            symbolSize: 6,
            data: dataBeast,
            areaStyle: {
              normal: {
                color: 'rgba(27, 178, 216,1)'
              }
            },
            itemStyle: {
              normal: {
                color: '#1bb2d8'
              }
            },
            lineStyle: {
              normal: {
                width: 2
              }
            }
          }]
        }
      Lflowecharts.setOption(option);
      window.onresize = Lflowecharts.resize;
    }
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.times)
    next()
  }
}
</script>
<style scoped>
 div{}
#pointtype{
  /*width: 100%;*/
  height: 202px;
}
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
.tabcircle{
  float: right;
}
.tabcircle div{
  width: 10px;
  height: 10px;
  margin-top: 14px;
  border-radius: 10px;
  background-color: #e2e2e2;
  float: left;
  margin-right: 6px;
}
.tabcircle .active{
  background-color: #b7b7b7;
}
.tabs{
  position: relative;
  padding: 15px 5px;
  height: 402px;
}
.tabs .times{
  position: absolute;
  top: 25px;
  right: 5px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 1px;
  color: #323232;
  line-height: 14px;
}
.L-tabtitle{
   display: flex;
  justify-content: center;
  margin-top: 15px;
}
.L-tabtitle li{
  padding: 0 15px;
  line-height: 30px;
  height: 30px;
  background-color: #ffffff;
  border: solid 1px #e0e0e0;
  border-right: 0;
  letter-spacing: 1px;
  color: #888888;
  cursor: pointer;
}
.L-tabtitle li:nth-of-type(1){
  border-radius: 3px 0 0 3px;
}
.L-tabtitle li:nth-last-of-type(1){
  border-radius: 0 3px 3px 0;
  border-right: solid 1px #e0e0e0;
}
.L-tabtitle .active{
  background-color: #0095ff;
  color: #ffffff;
}
.echarts-title{
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 1px;
  color: #323232;
  line-height: 18px;
  padding-top: 5px;
  text-align: center;
}
.data-title{
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 1px;
  color: #323232;
  line-height: 18px;
  padding-top: 40px;
  padding-bottom: 10px;
  text-align: center;
}
div{}
</style>