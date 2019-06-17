<template>
  <div class="app-container">
    <a-row :gutter="15">
      <a-col :span="6">
        <a-card :body-style="{padding: '0 10px'}">
          <h3>报警情况</h3>
          <a-spin :spinning=false>
            <a-row class="mycardcont" :gutter="10">
              <a-col :span="12" v-for="item in 4">
                <h6>qwdqdw</h6>
                <p>{{item}}</p>
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
              <a-col :span="8" v-for="item in pointtype">
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
              <a-col :span="8" v-for="item in floodnewdata">
                <h6 :title="item.name">{{item.name}}</h6>
                <p>{{item.dataValue}}<span>{{item.unit}}</span></p>
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
            </a-row>
          </a-spin>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card :body-style="{padding: '0 10px'}">
          <h3>流量监测点最新数据</h3>
          <a-spin :spinning=false>
            <a-row class="mycardcont mycardcont2" :gutter="10">
              <a-col :span="8" v-for="item in floodnewdata">
                <h6 :title="item.name">{{item.name}}</h6>
                <p>{{item.dataValue}}<span>{{item.unit}}</span></p>
              </a-col>
            </a-row>
          </a-spin>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="15" style="margin-top: 15px">
      <a-col :span="16" >
        <a-card :body-style="{padding: '0 10px'}">
          <h3>监测数据统计
            <a class="tabcircle">
              <div v-for="i in [0,1,2]" @mouseenter="pointtabindex=i" :class="pointtabindex===i?'active':''"></div>
            </a>
          </h3>
          <div class="tabs">
            <div class="times">
              当前时间：{{newtime}}
            </div>
            <div class="Waterlogging">
              <div class="echarts-title">易涝点水位24小时数据</div>
              <a-carousel>
                <a slot="customPaging">
                  <div></div>
                </a>
                <div>

                </div>
                <div>

                </div>
                <div>

                </div>
              </a-carousel>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card :body-style="{padding: '0 10px'}"  v-show="pointtabindex===0">
          <h3>监测数据</h3>
          <div style="border-bottom: 1px solid #e0e0e0">
            <div class="data-title">水质监测点24小时均值</div>
            <a-spin :spinning=false>
              <a-row class="mycardcont mycardcont2" :gutter="10">
                <a-carousel autoplay>
                  <a slot="customPaging">
                    <div></div>
                  </a>
                  <div>
                    <a-col :span="8" v-for="item in 3">
                      <h6>qwdqdw</h6>
                      <p>{{item}}</p>
                    </a-col>
                  </div>
                  <div>
                    <a-col :span="8" v-for="item in 3">
                      <h6>qwdqdw</h6>
                      <p>{{item}}</p>
                    </a-col>
                  </div>
                </a-carousel>
              </a-row>
            </a-spin>
          </div>
          <div>
            <div class="data-title">水质历史最高数据</div>
            <a-spin :spinning=false>
              <a-row class="mycardcont mycardcont2" :gutter="10">
                <a-carousel autoplay>
                  <a slot="customPaging">
                    <div></div>
                  </a>
                  <div>
                    <a-col :span="8" v-for="item in 3">
                      <h6>qwdqdw</h6>
                      <p>{{item}}</p>
                    </a-col>
                  </div>
                  <div>
                    <a-col :span="8" v-for="item in 3">
                      <h6>qwdqdw</h6>
                      <p>{{item}}</p>
                    </a-col>
                  </div>
                </a-carousel>
              </a-row>
            </a-spin>
          </div>
        </a-card>
        <a-card :body-style="{padding: '0 10px'}"  v-show="pointtabindex===1">
          <h3>监测数据</h3>
          <div style="border-bottom: 1px solid #e0e0e0">
            <div class="data-title">水质监测点24小时均值</div>
            <a-spin :spinning=false>
              <a-row class="mycardcont mycardcont2" :gutter="10">
                <a-carousel autoplay>
                  <a slot="customPaging">
                    <div></div>
                  </a>
                  <div>
                    <a-col :span="8" v-for="item in 3">
                      <h6>qwdqdw</h6>
                      <p>{{item}}</p>
                    </a-col>
                  </div>
                  <div>
                    <a-col :span="8" v-for="item in 3">
                      <h6>qwdqdw</h6>
                      <p>{{item}}</p>
                    </a-col>
                  </div>
                </a-carousel>
              </a-row>
            </a-spin>
          </div>
          <div>
            <div class="data-title">水质历史最高数据</div>
            <a-spin :spinning=false>
              <a-row class="mycardcont mycardcont2" :gutter="10">
                <a-carousel autoplay>
                  <a slot="customPaging">
                    <div></div>
                  </a>
                  <div>
                    <a-col :span="8" v-for="item in 3">
                      <h6>qwdqdw</h6>
                      <p>{{item}}</p>
                    </a-col>
                  </div>
                  <div>
                    <a-col :span="8" v-for="item in 3">
                      <h6>qwdqdw</h6>
                      <p>{{item}}</p>
                    </a-col>
                  </div>
                </a-carousel>
              </a-row>
            </a-spin>
          </div>
        </a-card>
        <a-card :body-style="{padding: '0 10px'}"  v-show="pointtabindex===2">
          <h3>监测数据</h3>
          <div style="border-bottom: 1px solid #e0e0e0">
            <div class="data-title">水质监测点24小时均值</div>
            <a-spin :spinning=false>
              <a-row class="mycardcont mycardcont2" :gutter="10">
                <a-carousel autoplay>
                  <a slot="customPaging">
                    <div></div>
                  </a>
                  <div>
                    <a-col :span="8" v-for="item in 3">
                      <h6>qwdqdw</h6>
                      <p>{{item}}</p>
                    </a-col>
                  </div>
                  <div>
                    <a-col :span="8" v-for="item in 3">
                      <h6>qwdqdw</h6>
                      <p>{{item}}</p>
                    </a-col>
                  </div>
                </a-carousel>
              </a-row>
            </a-spin>
          </div>
          <div>
            <div class="data-title">水质历史最高数据</div>
            <a-spin :spinning=false>
              <a-row class="mycardcont mycardcont2" :gutter="10">
                <a-carousel autoplay>
                  <a slot="customPaging">
                    <div></div>
                  </a>
                  <div>
                    <a-col :span="8" v-for="item in 3">
                      <h6>qwdqdw</h6>
                      <p>{{item}}</p>
                    </a-col>
                  </div>
                  <div>
                    <a-col :span="8" v-for="item in 3">
                      <h6>qwdqdw</h6>
                      <p>{{item}}</p>
                    </a-col>
                  </div>
                </a-carousel>
              </a-row>
            </a-spin>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pointtabindex: 0, // 绑定监测数据切换
      newtime: '', // 当前时间
      pointtype: [], //监测点类型统计数据
      floodnewdata: [], //易涝监测点最新数据
      waternewdata: [], //水质监测点最新数据
    }
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
          console.log(res);
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
    //监测数据统计-水质监测点今日数据-tab切换模块接口数据
    this.$get("checkPointData/informationByType", {type: 2})
      .then(res => {
        if (res) {
          console.log(res);
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
    }
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer)
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
  height: 458px;
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
.echarts-title{
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 1px;
  color: #323232;
  line-height: 18px;
  padding-top: 5px;
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
}
div{}
</style>