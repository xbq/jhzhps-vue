<template>
  <div class="app-container">
    <div>
      <a-row :gutter="15">
        <a-col :span="8">
          <div class="mycard">
            <h3>待下发</h3>
            <a-spin :spinning="spinning[0]">
              <a-row class="mycardcont" :gutter="10">
                <a-col :span="12" v-for="item in issuedlist">
                  <h6>{{item.bigLevel}}</h6>
                  <p>{{item.num}}</p>
                </a-col>
              </a-row>
            </a-spin>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="mycard">
            <h3>待审核</h3>
            <a-spin :spinning="spinning[1]">
              <a-row class="mycardcont" :gutter="10">
                <a-col :span="12" v-for="item in auditedlist">
                  <h6>{{item.bigLevel}}</h6>
                  <p>{{item.num}}</p>
                </a-col>
              </a-row>
            </a-spin>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="mycard">
            <h3>最新报警信息</h3>
            <a-spin :spinning="spinning[2]">
              <a-row class="mycardcont" :gutter="10">
                <a-col :span="12" v-for="item in errorlist">
                  <h6>{{item.type}}</h6>
                  <p>{{item.num}}</p>
                </a-col>
              </a-row>
            </a-spin>
          </div>
        </a-col>
      </a-row>
      <div class="divcard">
        <h3>今日上报情况</h3>
          <ul class="departList">
            <a-spin :spinning="spinning[3]">
              <li v-for="(item,index) in companylist" @click="gettable(item.departmentId,index)"
                  :class="active === index ?'active':''">
                <div class="left" v-if="index===0">
                  <img src="./img/first.png" alt="">
                </div>
                <div class="left" v-else-if="index===1">
                  <img src="./img/second.png" alt="">
                </div>
                <div class="left" v-else-if="index===2">
                  <img src="./img/third.png" alt="">
                </div>
                <div class="left" v-else>NO.{{index+1}}</div>
                <div class="cont">{{item.department}}</div>
                <div class="right">
                  {{item.num}}<span>个</span>
                </div>
              </li>
            </a-spin>
          </ul>
        <div class="desktable">
          <a-table :columns="columns"
                   :style="{wordBreak: 'break-all'}"
                   :dataSource="data"
                   :pagination="pagination"
                   :loading="loading"
                   :scroll="{ y: 'calc(100vh - 560px)'}"
          >
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spinning: [true, true, true, true],
      issuedlist: [], //待下发列表
      auditedlist: [], //待审核列表
      errorlist: [], //最新报警信息列表
      companylist: [], //企业列表
      cominfolist: [], //企业信息列表
      active: 0, // 选择的企业，默认第一个
      columns: [
        {
          title: '任务编号',
          dataIndex: 'name',
          // sorter: true,
          width: 100,
          // customHeaderCell: (col) => {
          //     console.log(col);
          // },
          // customRender: (text,record,index) => {
          //     console.log(text);
          //     console.log(record);
          //     console.log(index);
          //     return `<div style="width: 20%">${text}</div>`
          // }
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '任务类型',
          dataIndex: 'gender',
          // filters: [
          // { text: 'Male', value: 'male' },
          // { text: 'Female', value: 'female' },
          // ],
          width: 100,
        },
        {
          title: '上报时间',
          dataIndex: 'email',
          width: 100,
        },
        {
          title: '任务地点',
          dataIndex: 'emaisl',
          width: 100,
        },
        {
          title: '详细描述',
          dataIndex: 'emasdail',
          width: 100,
        }
      ], // 表格列
      data: [], // 表格数据
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 5,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: total => `共 ${total} 条数据`,
        // onShowSizeChange:(current, pageSize)=>this.pageSize = pageSize,
        pageSizeOptions: ['5', '10', '20', '30']
      }, // 分页配置
      loading: true, // 表格是否加载中
    }
  },
  filters: {},
  created() {
    // for (let i = 0; i < 20; i++) {
    //   this.data.push({
    //     key: i+10,
    //     name: 'ry4444',
    //     emaisl: 1344,
    //     emasdail: 1324,
    //     gender: 156,
    //     email: 2
    //   })
    // }
    // 待下发
    this.$get("task/sta/groupByBigLevel", {status: 5})
      .then(res => {
        if (res) {
          // console.log(res);
          this.issuedlist = res.data.data
          this.spinning[0] = false
        }
      })
      .catch(err => {
        console.log(err);
        // this.$message.error("error submit!!"); //登录失败提示错误
        // return false;
      });
    // 待审核
    this.$get("task/sta/groupByBigLevel", {status: 0})
      .then(res => {
        if (res) {
          // console.log(res);
          this.auditedlist = res.data.data
          this.spinning[1] = false
        }
      })
      .catch(err => {
        console.log(err);
        // this.$message.error("error submit!!"); //登录失败提示错误
        // return false;
      });
    // 最新报警信息
    this.$get("alarm/groupByAlarmType", {})
      .then(res => {
        if (res) {
          // console.log(res);
          this.errorlist = res.data.data
          this.spinning[2] = false
        }
      })
      .catch(err => {
        console.log(err);
        // this.$message.error("error submit!!"); //登录失败提示错误
        // return false;
      });
    // 获取单位信息
    this.$get("task/sta/groupByDepartment", {})
      .then(res => {
        if (res) {
          // console.log(res);
          this.companylist = res.data.data
          this.spinning[3] = false
          if (this.companylist.length > 0) {
            this.gettable(this.companylist[0].departmentId, 0)
          }
        }
      })
      .catch(err => {
        console.log(err);
        // this.$message.error("error submit!!"); //登录失败提示错误
        // return false;
      });
  },
  methods: {
    //校验时间,小于10前面加0
    checkTime(time) {
      if (time < 10) return "0" + time;
      return time;
    },
    // 点击企业获取表格数据
    gettable(departmentid, act) {
      this.loading = true
      // 选中的企业
      this.active = act
      // 获取当天的时间
      var myDate = new Date(),
        now_year = myDate.getFullYear(),
        now_month = myDate.getMonth(),
        now_day = myDate.getDate(),
        now_time = now_year + '-' + this.checkTime(now_month + 1) + '-' + this.checkTime(now_day);
      // console.log(now_time)
      var beginTime = now_time.toString() + ' 00:00:00',
        endTime = now_time.toString() + ' 23:59:59';
      // 获取相关单位表格信息
      this.$get("task/getList", {
        'department': departmentid,
        'beginTime': beginTime,
        'endTime': endTime
      })
        .then(res => {
          if (res) {
            console.log(res);
            this.loading = false
          }
        })
        .catch(err => {
          console.log(err);
          // this.$message.error("error submit!!"); //登录失败提示错误
          // return false;
        });
    }
  }
}
</script>
<style scoped>
.mycard {
  height: 240px;
  padding: 0 10px;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
}
 .divcard {
   position: relative;
   padding: 0 10px;
   background-color: #ffffff;
   box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
   margin-top: 15px;
   height: calc(100vh - 362px)
 }
 .departList {
   height: calc(100% - 58px);
   width: 386px;
   padding-top: 20px;
   background-color: #f8f8f8;
   box-shadow: 0px 1px 0px 0px rgba(224, 224, 224, 0.3);
   position: absolute;
   z-index: 2;
   list-style: none;
   padding-left: 0;
   margin-left: 20px;
   margin-bottom: 0;
   margin-top: 16px;
 }
 .departList li {
   height: 80px;
   line-height: 80px;
   border: 1px solid transparent;
 }
 .departList .active {
   width: 387px;
   border: 1px solid #e6e6e6;
   border-right: 2px solid #fff;
   margin-right: -1px;
 }
 .left {
   float: left;
   width: 66px;
   font-style: italic;
   color: #323232;
 }
 .cont {
   margin-left: 9px;
   float: left;
 }
 .right {
   float: right;
   margin-right: 25px;
   height: 23px;
   /*font-family: DIN-Medium;*/
   font-size: 28px;
   font-weight: normal;
   font-stretch: normal;
   letter-spacing: 2px;
   color: #323232;
 }
 .right span {
   /*font-family: MicrosoftYaHei;*/
   font-size: 12px;
   font-weight: normal;
   letter-spacing: 1px;
   color: #888888;
 }
 .desktable {
   height: calc(100% - 58px);
   position: absolute;
   left: 416px;
   width: calc(100% - 426px);
   background-color: #ffffff;
   box-shadow: 0px 1px 0px 0px rgba(224, 224, 224, 0.3);
   border: solid 1px #e6e6e6;
   padding: 20px 15px 0 20px;
   margin-top: 16px;
 }
</style>
