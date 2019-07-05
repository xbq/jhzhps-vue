<template>
  <div class="app-container">
    <a-layout>
      <a-layout-content>
        <a-card :body-style="{padding: '0 10px'}">
          <h3>任务列表</h3>
          <a-tabs
                  hideAdd
                  v-model="activeKey"
                  type="card"
                  :style="{marginTop: '20px', padding: '0 5px'}"
                  :tabBarGutter="0"
          >
            <a-tab-pane tab="待下发" :key="0" :closable=false>
              <div class="item">
<!--                <Ltable @rowDetails="rowDetails" :status="0" :columns="columns1" :scroll="{ y: 'calc(100vh - 380px)', x: 1330}" :getlistdata="{department: '9,14,15'}"></Ltable>-->
              </div>
            </a-tab-pane>
            <a-tab-pane tab="正在监理" :key="4" :closable=false>
              <div class="item">
<!--                <Ltable @rowDetails="rowDetails" :status="4" :columns="columns2" :scroll="{ y: 'calc(100vh - 380px)', x: 1330}"></Ltable>-->
              </div>
            </a-tab-pane>
            <a-tab-pane tab="监理审核通过" :key="5" :closable=false>
              <div class="item">
<!--                <Ltable @rowDetails="rowDetails" :status="5" :columns="columns2" :scroll="{ y: 'calc(100vh - 380px)', x: 1330}"></Ltable>-->
              </div>
            </a-tab-pane>
            <a-tab-pane tab="监理存在问题" :key="9" :closable=false>
              <div class="item">
<!--                <Ltable @rowDetails="rowDetails" :status="9" :columns="columns2" :scroll="{ y: 'calc(100vh - 380px)', x: 1330}"></Ltable>-->
              </div>
            </a-tab-pane>
          </a-tabs>
          <Ltable @rowDetails="rowDetails" :status="activeKey" :columns="activeKey===0?columns2:columns1"></Ltable>
        </a-card>
      </a-layout-content>
      <a-layout-sider style="flex:0 0 320px;width:320px;max-width: 320px;margin-left: 15px;background-color: transparent">
        <a-card :body-style="{padding: '0 10px'}">
          <h3>任务详情</h3>
          <taskDetail :details="rowDetail"></taskDetail>
        </a-card>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script>
  import taskDetail from '@/components/taskDetail'
  import Ltable from '@/components/tables'
  export default {
    components: {
      taskDetail,
      Ltable
    },
    data() {
      return {
        activeKey: 0, // tabs切换key值
        rowDetail: {}, //行信息
        columns1: [
          { title: '任务编号', width: 120, dataIndex: 'taskNum', key: 'taskNum'},
          { title: '状态', width: 60, dataIndex: '', key: ''},
          { title: '任务大类', width: 100, dataIndex: 'bigLevel', key: 'bigLevel'},
          { title: '紧急程度', width: 100, dataIndex: 'urgencyDegree', key: 'urgencyDegree', customRender: (text) => text === '1' ? '紧急' : '普通'},
          { title: '上报时间', width: 170, dataIndex: 'reportTime', key: 'reportTime'},
          { title: '地点/路线', width: 350, dataIndex: 'siteName', key: 'siteName'},
          { title: '任务来源', width: 150, dataIndex: 'source', key: 'source'},
          { title: '所用时间', width: 180, dataIndex: 'expend', key: 'expend'},
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            scopedSlots: { customRender: 'action' },
          }
        ], //表格1的列
        columns2: [
          { title: '任务编号', width: 120, dataIndex: 'taskNum', key: 'taskNum'},
          { title: '状态', width: 60, dataIndex: '', key: ''},
          { title: '任务大类', width: 100, dataIndex: 'bigLevel', key: 'bigLevel'},
          { title: '紧急程度', width: 100, dataIndex: 'urgencyDegree', key: 'urgencyDegree', customRender: (text) => text === '1' ? '紧急' : '普通'},
          { title: '上报时间', width: 170, dataIndex: 'reportTime', key: 'reportTime'},
          { title: '地点/路线', width: 350, dataIndex: 'siteName', key: 'siteName'},
          { title: '任务来源', width: 150, dataIndex: 'source', key: 'source'},
          { title: '剩余时间', width: 180, dataIndex: 'remaining', key: 'remaining'},
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            scopedSlots: { customRender: 'action' },
          }
        ], //表格2的列
      }
    },
    created() {
    },
    methods: {
      rowDetails(detail) {
        this.rowDetail = detail
      },
    }
  }
</script>
<style scoped lang="scss">
  .app-container .ant-layout-content{
    height: calc(100vh - 98px);
  }
  .item{

  }
</style>