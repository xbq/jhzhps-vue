<template>
  <div>
    <ul class="detailCons">
      <li class="rowCons">
        <h2>任务小类</h2>
        <div class="rowDetail" title=""><span>{{rowTaskDetail.smallLevel}}</span></div>
      </li>
      <li class="rowCons">
        <h2>细分类型</h2>
        <div class="rowDetail" title=""><span>{{rowTaskDetail.detailLevel}}</span></div>
      </li>
      <li class="rowCons">
        <h2>任务状态</h2>
        <div class="rowDetail" title=""><span>{{rowTaskDetail.status}}</span></div>
      </li>
      <li class="rowCons">
        <h2>上报单位</h2>
        <div class="rowDetail" title=""><span>{{rowTaskDetail.department}}</span></div>
      </li>
      <li class="rowCons">
        <h2>上报人</h2>
        <div class="rowDetail" title=""><span>{{rowTaskDetail.userName}}</span></div>
      </li>
      <li class="rowCons">
        <h2>任务地点</h2>
        <div class="rowDetail" title=""><span>{{rowTaskDetail.siteName}}</span><img src="../assets/img/wordMap.png" alt=""></div>
      </li>
      <li class="rowCons">
        <h2>问题详情</h2>
        <div class="rowDetail" title=""><span>{{rowTaskDetail.detail}}</span></div>
      </li>
    </ul>
    <div class="line"></div>
    <div class="imgdetail">
      <div>
        <span>养护前</span>
        <img v-if="!(rowTaskDetail.beforePicUrl&&rowTaskDetail.beforePicUrl.length>0)" src="../assets/img/noImg.png" alt="">
        <imgcarousel v-else :imgs="rowTaskDetail.beforePicUrl" :height="'157px'" :imgvisible='imgvisible' @imgdetail="imgdetail"></imgcarousel>
      </div>
      <div>
        <span>养护后</span>
        <img v-if="!(afterpicture&&afterpicture.length>0)" src="../assets/img/noImg.png" alt="">
        <imgcarousel v-else :imgs="afterpicture" :height="'157px'" :imgvisible='imgvisible' @imgdetail="imgdetail"></imgcarousel>
      </div>
      <a-button type="primary" @click="seedetail">查看详情</a-button>
    </div>
    <a-modal
            :title="'任务编号为' + details.taskId + '的任务详情'"
            :visible="visible"
            @ok="handleOk"
            :confirmLoading="confirmLoading"
            @cancel="handleCancel"
            :centered=true
            :footer="null"
            width="1200px"
            :body-style="{padding: 0}"
    >
      <div class="taskdetail">
        <div class="baseinfo">
          <h3>任务基本信息</h3>
          <div>
            任务编号：<span>{{rowTaskDetail.taskNum}}</span>
            <div>{{rowTaskDetail.reportTime}}</div>
          </div>
          <div>
            任务类型：{{rowTaskDetail.bigLevel + ' - ' + rowTaskDetail.smallLevel + ' - ' + rowTaskDetail.detailLevel}}
            <div>{{rowTaskDetail.typeStatus}}</div>
            <div>{{(rowTaskDetail.urgencyDegree === '1') ? '紧急' : '普通'}}</div>
          </div>
          <div>
            问题描述：<span :title="rowTaskDetail.detail ? rowTaskDetail.detail : ''">{{rowTaskDetail.detail ? rowTaskDetail.detail : '暂无相关描述'}}</span>
          </div>
          <div class="img">
            <div v-for="(items,index) in rowTaskDetail.beforePicUrl" :key="index">
              <img :src="items" alt="">
            </div>
          </div>
          <div>
            <div>
              上报人：<span>{{rowTaskDetail.userName}}</span>
            </div>
            <div>
              上报单位：<span>{{rowTaskDetail.department}}</span>
            </div>
            <div>
              任务来源：<span>{{rowTaskDetail.mobile}}</span>
            </div>
          </div>
          <div class="map">
            maps
          </div>
        </div>
        <div class="record">
          <h3>任务操作记录</h3>
          <ul>
            <li v-for="(item,index) in taskrecord" :key="index">
              <div v-if="item.type === '1'">
                <div class="name">
                  {{item.userName ? item.userName : '未知'}}&nbsp;&nbsp;{{item.status==='1'?'同意下发':'不同意下发'}}
                  <span>{{item.recordTime}}</span>
                </div>
                <div>设置任务期限：<span>{{item.expire}}天</span></div>
              </div>
              <div v-else-if="item.type === '2'">
                <div class="name">
                  {{item.userName ? item.userName : '未知'}}&nbsp;&nbsp;已签收
                  <span>{{item.recordTime}}</span>
                </div>
              </div>
              <div v-else-if="item.type === '3'">
                <div class="name">
                  {{item.userName ? item.userName : '未知'}}&nbsp;&nbsp;养护完成
                  <span>{{item.recordTime}}</span>
                </div>
                <div>工程量：<span>{{item.quantity?item.quantity:'暂无描述'}}</span></div>
                <div>养护详情：<span>{{item.detail?item.detail:'暂无描述'}}</span></div>
                <div class="img">
                  <div v-for="(items,index) in item.afterPicUrl" :key="index">
                    <img :src="items" alt="">
                  </div>
                </div>
              </div>
              <div v-else-if="item.type === '4'">
                <div class="name">
                  {{item.userName ? item.userName : '未知'}}&nbsp;&nbsp;开始监理
                  <span>{{item.recordTime}}</span>
                </div>
                <div>监理详情：<span>{{item.detail?item.detail:'暂无描述'}}</span></div>
              </div>
              <div v-else-if="item.type === '5'">
                <div class="name">
                  {{item.userName ? item.userName : '未知'}}&nbsp;&nbsp;{{item.status==='1'?'监理核查通过':'监理核查不通过'}}
                  <span>{{item.recordTime}}</span>
                </div>
                <div>工程量：<span>{{item.quantity?item.quantity:'暂无描述'}}</span></div>
                <div>监理详情：<span>{{item.detail?item.detail:'暂无描述'}}</span></div>
                <div class="img">
                  <div v-for="(items,index) in item.afterPicUrl" :key="index">
                    <img :src="items" alt="">
                  </div>
                </div>
              </div>
              <div v-else-if="item.type === '6'">
                <div class="name">
                  {{item.userName ? item.userName : '未知'}}&nbsp;&nbsp;{{item.status==='1'?'科室审核通过':'科室审核不通过'}}
                  <span>{{item.recordTime}}</span>
                </div>
                <div>审核详情：<span>{{item.detail?item.detail:'暂无描述'}}</span></div>
              </div>
              <div v-else-if="item.type === '7'">
                <div class="name">
                  {{item.userName ? item.userName : '未知'}}&nbsp;&nbsp;任务撤销
                  <span>{{item.recordTime}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </a-modal>
    <a-modal
            :title="details.taskId + '养护前后照片对比'"
            :visible="imgvisible"
            @cancel="handleCancel"
            :centered=true
            :footer="null"
            width="1200px"
            :body-style="{padding: 0}"
    >
      <div class="imgContrast">
        <div>
          <span>养护前</span>
          <img v-if="!(rowTaskDetail.beforePicUrl&&rowTaskDetail.beforePicUrl.length>0)" src="../assets/img/noImg.png" alt="">
          <imgcarousel v-else :imgs="rowTaskDetail.beforePicUrl" :height="'328px'" :imgvisible='imgvisible' @imgdetail="imgdetail"></imgcarousel>
        </div>
        <div>
          <span>养护后</span>
          <img v-if="!(afterpicture&&afterpicture.length>0)" src="../assets/img/noImg.png" alt="">
          <imgcarousel v-else :imgs="afterpicture" :height="'328px'" :imgvisible='imgvisible' @imgdetail="imgdetail"></imgcarousel>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import imgcarousel from './imgcarousel'
export default {
  components: {
    imgcarousel,
  },
  data() {
    return {
      rowTaskDetail: this.details,  //重新定义数据
      taskrecord: [], // 操作记录
      backurl: global.backUrl, // 地址前缀
      visible: false, //查看任务详情
      imgvisible: false, //查看图片对比
      confirmLoading: false, // 是否加载中
      afterpicture: [], // 养护后照片
    }
  },
  props: {
    details: {
      type: Object
    }
  },
  watch: {
    details: {
      handler(newValue, oldValue) {
        this.$get("task/getById", {'taskId': newValue.taskId}).then(res => {
          if (res.data.data.beforePicUrl) {
            res.data.data.beforePicUrl =  res.data.data.beforePicUrl.split(',');
          }
          let typeStatus = '';
          switch (res.data.data.status) {
            case '-1':
              typeStatus = '不维修'
              break;
            case '0':
              typeStatus = '待下发'
              break;
            case '1':
              typeStatus = '新任务'
              break;
            case '2':
              typeStatus = '正在养护'
              break;
            case '3':
              typeStatus = '养护完成'
              break;
            case '4':
              typeStatus = '正在监理'
              break;
            case '5':
              typeStatus = '监理审核通过'
              break;
            case '6':
              typeStatus = '监理审核不通过'
              break;
            case '7':
              typeStatus = '科室审核通过'
              break;
            case '8':
              typeStatus = '养护存在问题'
              break;
            case '9':
              typeStatus = '监理存在问题'
              break;
            default: break;
          }
          res.data.data.typeStatus = typeStatus
          this.rowTaskDetail = res.data.data;
          // console.log(this.rowTaskDetail);
        })
        this.$get("task/record/queryByTaskId", {'taskId': newValue.taskId}).then(res => {
          // console.log(res);
          this.afterpicture = []
          if (res.data.data && res.data.data.length>0) {
            this.taskrecord = res.data.data.map((val)=>{
              if (val.afterPicUrl) {
                val.afterPicUrl = val.afterPicUrl.split(',');
                this.afterpicture.push(...val.afterPicUrl)
              }
              return val
            });
          }else {
            this.taskrecord = []
          }
        })
      }
    }
  },
  created() {
    // this.$get("task/getById", {'taskId': '1610'}).then(res => {
    //   this.rowTaskDetail = res.data.data;
    //   console.log(this.rowTaskDetail);
    // })
  },
  methods: {
    // 查看详情
    seedetail() {
      this.visible = true
    },
    imgdetail(boo) {
      this.imgvisible = boo
    },
    // 确认修改
    handleOk () {
      this.visible = false
    },
    // 取消修改
    handleCancel () {
      this.visible = false
      this.imgvisible = false
      // console.log('cancel');
    },
  }
}
</script>

<style scoped="scoped" lang="scss">
// 右侧内容
.detailCons {
  width: 280px;
  margin: 10px auto;
  height: 216px;
  font-size: 12px;

  .rowCons {
    width: 280px;
    height: 31px;
    line-height: 31px;
    border-bottom: 1px solid #eee;

    h2 {
      color: #888;
      font-size: 12px;
      width: 54px;
      height: 31px;
      line-height: 31px;
      display: inline-block;
      letter-spacing: 1px;
      overflow: hidden;
      margin-right: 14px;
      vertical-align: middle;
    }

    .rowDetail {
      width: 212px;
      height: 31px;
      line-height: 31px;
      display: inline-block;
      vertical-align: top;
      color: #333;
      position: relative;

      span {
        display: inline-block;
        width: 196px;
        vertical-align: top;
        overflow: hidden;
        cursor: pointer;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      img {
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }

  .rowCons:nth-last-child(1) {
    border-bottom: 0;
  }
}

.line {
  width: 100%;
  height: 1px;
  background: #eee;
  margin-bottom: 15px;
}
.imgdetail{
  padding: 0 10px;
  &>div{
    width: 280px;
    height: 157px;
    position: relative;
    span{
      position: absolute;
      font-size: 12px;
      z-index: 1;
      left: 0;
      top: 5px;
      width: 60px;
      height: 26px;
      text-align: center;
      line-height: 24px;
      color: #fff;
      /*background-color: #ccc;*/
      /*border: 1px solid #eee;*/
      background-color: rgb(0, 149, 255);
      border: 1px solid rgb(116, 203, 253);
      border-radius: 0 3px 3px 0;
    }
    img{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
  button{
    background-color: rgb(0, 149, 255);
    border: 1px solid rgb(255, 255, 255);
    pointer-events: all;
    cursor: pointer;
    width: 280px;
    height: 32px;
    color: #fff;
    margin-top: 15px;
    margin-bottom: 20px;
  }
}
.taskdetail{
  padding: 15px 20px 30px;
  display: flex;
  .baseinfo{
    width: 565px;
    height: 490px;
    letter-spacing: 0px;
    color: #888888;
    padding: 0 10px;
    background-color: #ffffff;
    border: solid 3px #f6f6f6;
    &>div:nth-of-type(1){
      margin-top: 16px;
      line-height: 12px;
      height: 12px;
      span{
        color: #323232;
      }
      div{
        float: right;
      }
    }
    &>div:nth-of-type(2){
      margin-top: 13px;
      font-size: 14px;
      line-height: 20px;
      height: 20px;
      color: #323232;
      div{
        float: right;
        margin-left: 10px;
        height: 20px;
        line-height: 18px;
        border-radius: 10px;
        padding: 0 15px;
        font-size: 12px;
        &:nth-of-type(1){
          background-color: #d9ebff;
          border: solid 1px #4da4ff;
          color: #009dff;
        }
        &:nth-of-type(2){
          background-color: #0095ff;
          color: #ffffff;
          border: solid 1px #0095ff;
        }
      }
    }
    &>div:nth-of-type(3){
      font-size: 14px;
      margin-top: 11px;
      line-height: 14px;
      span{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 468px;
        float: right;
      }
    }
    &>div:nth-of-type(4){
      margin-top: 10px;
      font-size: 0;
      height: 70px;
      div{
        width: 70px;
        height: 70px;
        margin-right: 10px;
        background-color: #dbdbdb;
      }
    }
    &>div:nth-of-type(5){
      margin-top: 25px;
      display: flex;
      height: 12px;
      line-height: 12px;
      font-size: 12px;
      justify-content: space-between;
      span{
        color: #323232;
      }
    }
    .map{
      height: 217px;
      margin-top: 21px;
    }
  }
  .record{
    width: 575px;
    height: 490px;
    margin-left: 20px;
    background-color: #ffffff;
    border: solid 3px #f6f6f6;
    padding: 0 13px;
    ul{
      padding: 0 7px;
      height: 450px;
      overflow: auto;
      /*background: url(../assets/img/record-line.png) 7px 0 repeat-y;*/
      li{
        padding: 18px 0 18px 35px;
        letter-spacing: 0;
        color: #323232;
        position: relative;
        &:before{
          content: '';
          width: 24px;
          height: 12px;
          position: absolute;
          top: 19px;
          left: 2px;
          background: url(../assets/img/record-mark.png) no-repeat;
        }
        div{
          div{
            line-height: 12px;
            font-size: 12px;
            height: 12px;
            margin-top: 10px;
            span{
              color: #888888;
            }
          }
          .name{
            margin-top: 0;
            line-height: 14px;
            height: 14px;
            font-size: 14px;
            span{
              font-size: 12px;
              float: right;
              color: #888888;
            }
          }
          .name+div{
            margin-top: 20px;
          }
          .img{
            height: 70px;
            div{
              width: 70px;
              height: 70px;
              margin-right: 10px;
              background-color: #dbdbdb;
            }
          }
        }
      }
    }
  }
}
.imgContrast{
  display: flex;
  padding: 20px;
  justify-content: space-between;
  div{
    width: 572px;
    height: 328px;
    position: relative;
    span{
      position: absolute;
      font-size: 12px;
      z-index: 1;
      left: 0;
      top: 5px;
      width: 60px;
      height: 26px;
      text-align: center;
      line-height: 24px;
      color: #fff;
      /*background-color: #ccc;*/
      /*border: 1px solid #eee;*/
      background-color: rgb(0, 149, 255);
      border: 1px solid rgb(116, 203, 253);
      border-radius: 0 3px 3px 0;
    }
    img{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
}
</style>
