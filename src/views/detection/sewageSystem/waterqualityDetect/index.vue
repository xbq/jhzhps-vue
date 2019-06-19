<template>
  <div class="app-container">
    <a-card class="waterpoint" :body-style="{padding: '0 10px'}">
      <h3>水质监测点-报警设置</h3>
      <a-spin :spinning='spinning[0]'>
        <ul>
          <li v-for="(item,index) in waterlist" @click="getwaterdata(item.id)"  :key="item.id" :class="active===index?'active':''">
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
    </a-card>
    <div>
      <a-card class="newwaterdate" :body-style="{padding: '0 10px'}">
        <h3>最新水位数据</h3>
        <ul>
          <li v-for="(item,index) in newwaterdata" :key="index">
            <div>
              <div>{{item.DATA_TYPE}}</div>
              <p>{{item.RECORD_TIME.substring(5,16).replace('-','/')}}</p>
            </div>
            <div>{{item.DATA_VALUE.toFixed(2)}}<span>{{item.UNIT}}</span></div>
          </li>
        </ul>
      </a-card>
      <a-card class="historywaterdate" :body-style="{padding: '0 10px'}">
        <h3>历史水位数据</h3>
      </a-card>
      <a-card class="waterdatelist" :body-style="{padding: '0 10px'}">
        <h3>数据列表</h3>
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0, // 选中的监测点位
      waterlist: [], // 水质监测点位
      spinning: [false], // 是否加载中
      newwaterdata: [], // 最新水位数据
    }
  },
  created() {
    // 获取水质监测点位
    this.$get("checkPoint/get", {limit: 1,type: 2})
      .then(res => {
        if (res) {
          console.log(res);
          this.waterlist = res.data.data
          this.getwaterdata(this.waterlist[0].id)
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
   // 获取最新水质数据
    getwaterdata(id) {
      this.$get("checkPointData/getLastDataById", {checkpointId: id})
        .then(res => {
          if (res) {
            console.log(res);
            this.newwaterdata = res.data.data
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
.app-container{
  display: flex;
  height: calc(100vh - 100px);
  .waterpoint{
    width: 406px;
    height: 100%;
    margin-right: 15px;
    ul{
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
  }
  .waterpoint+div{
    flex: 1;
    height: 100%;
    overflow: auto;
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
  }
  .waterdatelist{
    flex: 1;
    height: 500px;
  }
}
div{}
</style>