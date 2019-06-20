<template>
  <div class="app-container">
    <a-card class="waterpoint" :body-style="{padding: '0 10px',height: 'calc(100% - 83px)',overflow: 'hidden'}">
      <h3>水质监测点-报警设置</h3>
      <a-spin :spinning='spinning[0]' class="L-spin">
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
          <h3>最新水质数据</h3>
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
          <h3>24小时水质曲线</h3>
        </a-card>
        <a-card class="waterdatelist" :body-style="{padding: '0 10px'}">
          <h3>数据列表</h3>
        </a-card>
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
    // 刷新水质监测点
    refresh (boo) {
      this.spinning[0] = true;
      // 获取水质监测点位
      this.$get("checkPoint/get", {limit: 1,type: 2})
        .then(res => {
          if (res) {
            console.log(res);
            this.waterlist = res.data.data;
            // for (let i = 0; i < 10; i++) {
            //   this.waterlist.push(this.waterlist[0])
            // }
            this.getwaterdata(this.waterlist[0].id);
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
    // 获取不同监测点水质信息
    getwaterdata(id) {
      // 获取最新水质数据
      this.$get("checkPointData/getLastDataById", {checkpointId: id})
        .then(res => {
          if (res) {
            // console.log(res);
            this.newwaterdata = res.data.data
          }
        })
        .catch(err => {
          console.log(err);
        });
      // 获取最新水质数据
      this.$get("checkPointData/queryListForToday", {checkpointId: id,dataType: '流量'})
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
      overflow: auto;
      width: 150%;
      padding-right: 50%;
    }
    ul{
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
      overflow: auto;
      width: 150%;
      padding-right: 50%;
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
  }
  .waterdatelist{
    flex: 1;
    height: 500px;
  }
}
div{}
</style>