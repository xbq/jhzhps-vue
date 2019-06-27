<template>
  <div class="app-container">
    <a-row :gutter="15">
      <a-col :span="8">
        <a-card :body-style="{padding: '0 10px'}">
          <h3>进水水质数据</h3>
          <a-spin :spinning=false>
            <a-row class="mycardcont" :gutter="10">
              <a-col :span="12" v-for="(item,index) in Influent" :key="index">
                <h6>{{item.name}}</h6>
                <p>{{item.num}}<span>{{item.unit}}</span></p>
              </a-col>
            </a-row>
          </a-spin>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card :body-style="{padding: '0 10px'}">
          <h3>报警情况</h3>
          <a-spin :spinning=false>
            <a-row class="mycardcont" :gutter="10">
              <a-col :span="12" v-for="(item,index) in effluent" :key="index">
                <h6>{{item.name}}</h6>
                <p>{{item.num}}<span>{{item.unit}}</span></p>
              </a-col>
            </a-row>
          </a-spin>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card :body-style="{padding: '0 10px'}">
          <h3>报警情况</h3>
          <a-spin :spinning=false>
            <a-row class="mycardcont" :gutter="10">
              <a-col :span="24" v-for="(item,index) in flowdata" :key="index">
                <h6>{{item.name}}</h6>
                <p>{{item.num}}<span>{{item.unit}}</span></p>
              </a-col>
            </a-row>
          </a-spin>
        </a-card>
      </a-col>
    </a-row>
    <a-card :body-style="{padding: '0 10px', marginTop: '15px'}">
      <h3>监测数据统计
        <a class="tabcircle">
          <div v-for="i in [0,1]"  :key="i" @mouseenter="datatab(i)" :class="pointtabindex===i?'active':''"></div>
        </a>
      </h3>
      <div class="tabs">
        <a-carousel ref="tab" :dots="false">
          <div>
            <a-row class="mycardcont" type="flex">
              <a-col :style="{width: '20%'}" v-for="(item,index) in monitor[0]" :key="index">
                <h6>{{item.name}}</h6>
                <p>{{item.num}}<span>{{item.unit}}</span></p>
              </a-col>
            </a-row>
          </div>
          <div>
            <a-row class="mycardcont" type="flex">
              <a-col :style="{width: '20%'}" v-for="(item,index) in monitor[1]" :key="index">
                <h6>{{item.name}}</h6>
                <p>{{item.num}}<span>{{item.unit}}</span></p>
              </a-col>
            </a-row>
          </div>
        </a-carousel>
      </div>
    </a-card>
    <a-card :body-style="{padding: '0 10px', marginTop: '15px'}">
      <h3>工艺总图</h3>
      <div class="imgbox">
        <img src="./img/sewerage.png" alt="">
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pointtabindex: 0, // 绑定监测数据切换
      effluent: [
        {
          name: '出水PH值',
          num: 6.35,
          unit: ''
        },
        {
          name: '出水COD',
          num: 19.67,
          unit: 'mg/L'
        },
        {
          name: '出水氨氮',
          num: 0.26,
          unit: 'mg/L'
        },
        {
          name: '出水总磷',
          num: 0.03,
          unit: 'mg/L'
        },
        {
          name: '出水总氮',
          num: 6.72,
          unit: 'mg/L'
        }
      ], //出水水质数据
      Influent : [
        {
          name: '进水PH值',
          num: 8.03,
          unit: ''
        },
        {
          name: '进水COD',
          num: 150.94,
          unit: 'mg/L'
        },
        {
          name: '进水氨氮',
          num: 24.23,
          unit: 'mg/L'
        },
        {
          name: '进水总磷',
          num: 2.47,
          unit: 'mg/L'
        },
        {
          name: '进水总氮',
          num: 35.61,
          unit: 'mg/L'
        }
      ], //进水水质数据
      flowdata: [
        {
          name: '进水总流量',
          num: 7762.44,
          unit: 'm³/h'
        },
        {
          name: '出水总流量',
          num: 10506.03,
          unit: 'm³/h'
        },
      ], //流量数据
      monitor: [
        [
          {
            name: '婺剧院北检查井',
            num: 0.26,
            unit: 'm'
          },
          {
            name: '东阳街梅溪桥北检查井',
            num: 0.26,
            unit: 'm'
          },
          {
            name: '环城南路东市街检查井',
            num: 0.65,
            unit: 'm'
          },
          {
            name: '金星街G330检查井',
            num: 0.26,
            unit: 'm'
          },
          {
            name: '李渔桥下检查井',
            num: 0.26,
            unit: 'm'
          }
        ],
        [
          {
            name: '双龙南街二环路检查井',
            num: 0.26,
            unit: 'm'
          },
          {
            name: '桐溪污水干管检查井',
            num: 0.26,
            unit: 'm'
          },
          {
            name: '婺剧院南检查井',
            num: 0.65,
            unit: 'm'
          },
          {
            name: '永济桥北桥头检查井',
            num: 0.26,
            unit: 'm'
          },
          {
            name: '永济桥南桥头检查井',
            num: 0.26,
            unit: 'm'
          }
        ]
      ], //厂外液体监测
      boo: true
    }
  },
  filters: {
   
  },
  created() {
  },
  methods: {
    // 鼠标移入切换
    datatab (i) {
      if(this.boo){
        this.pointtabindex = i
        this.$refs.tab.goTo(i)
        this.boo = false
        setTimeout(()=>{
          this.boo = true
        }, 500)
      }
    },
  }
}
</script>
<style scoped lang="scss">
.mycardcont{
  height: 273px;
}
.tabcircle{
  float: right;
  div{
    width: 10px;
    height: 10px;
    margin-top: 14px;
    border-radius: 10px;
    background-color: #e2e2e2;
    float: left;
    margin-right: 6px;
  }
  .active{
    background-color: #b7b7b7;
  }
}
.tabs{
  .mycardcont{
    height: 126px;
    text-align: center;
  }
}
.imgbox{
  padding: 20px;
  padding-bottom: 10px;
  img{
    width: 100%;
  }
}
div{}
</style>
