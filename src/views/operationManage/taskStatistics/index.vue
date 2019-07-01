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
        <a-range-picker size="large" @change="onChange" :disabled="activetime!==6"></a-range-picker>
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
          <li v-for="(item, index) in places" :key="index">
            <div>{{item.bigLevel}}</div>
            <span>{{item.num}}</span>
          </li>
        </ul>
        <div class="items">
          <div>
            <h4>道路任务小类类型统计</h4>
            <div id="smalltype"></div>
          </div>
          <div>
            <h4>道路任务小类类型统计</h4>
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
             <a-table size="middle" :columns="columns" :dataSource="data" :style="{marginTop: '20px'}" :scroll="{ y: 380 }" :pagination="pagination"
                      :loading="loading">
             </a-table>
           </a-col>
           <a-col :span="12">
             <div class="map">
               map
             </div>
           </a-col>
         </a-row>
       </div>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activetime: 0, //时间选择切换
      columns: [
        { title: '地点/路线', width: 150, dataIndex: 'roadName', key: 'roadName'},
        { title: '任务总量', dataIndex: 'count', key: 'count',  },
        { title: '桥梁任务', dataIndex: '桥梁', key: '桥梁' },
        { title: '道路任务', dataIndex: '道路', key: '道路' },
        { title: '排水任务', dataIndex: '排水', key: '排水' },
        { title: '交通设施', dataIndex: '交通设施', key: '交通设施'},
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
      places: [], // 道路数据
    }
  },
  filters: {
   
  },
  created() {
    this.getplaces()
    this.gettable()
  },
  methods: {
    // 设置时间
    settime(i) {
      this.activetime = i

    },
    // 日期改变的回调
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    // 获取地点任务情况统计图表
    getplaces(beginTime, endTime) {
      this.$get("task/sta/groupByBigLevel", {beginTime, endTime})
        .then(res => {
          if (res) {
            console.log(res);
            this.places = res.data.data
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取地点任务情况统计表格
    gettable(beginTime, endTime) {
      this.$get("task/sta/groupByRoad", {beginTime, endTime})
        .then(res => {
          if (res) {
            console.log(res);
            this.data = res.data.data
            this.data.forEach((val, index) => {
              val.key = index
            })
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取详细数据
    getdetail(beginTime,endTime){
      // 获取小类类型 统计图表
      this.$get("task/sta/groupBySmallLevel", {beginTime, endTime, bigLevelId: 0})
        .then(res => {
          if (res) {
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
      // 获取细分类型统计图表
      this.$get("task/sta/groupByDetailLevel", {beginTime, endTime, smallLevelId: 0})
        .then(res => {
          if (res) {
            console.log(res);
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
  ul{
    width: 122px;
    margin-top: 30px;
    li{
      border: solid 1px #e9f6ff;
      height: 94px;
    }
  }
  .items{
    flex: auto;
    display: flex;
    margin-top: 30px;
    height: 362px;
    border: solid 1px #0095ff;
    &>div{
      width: 50%;
    }
  }
}
.place{
  padding: 0 10px 30px;
  height: 619px;
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