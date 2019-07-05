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
            <a-tab-pane tab="新任务" :key="1" :closable=false>
              <div class="item">
              </div>
            </a-tab-pane>
            <a-tab-pane tab="监理审核不通过" :key="6" :closable=false>
              <div class="item">
              </div>
            </a-tab-pane>
            <a-tab-pane tab="养护存在问题" :key="8" :closable=false>
              <div class="item">
              </div>
            </a-tab-pane>
          </a-tabs>
          <Ltable @rowDetails="rowDetails" :status="activeKey" :columns="columns"></Ltable>
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
        columns: [
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
        ], //表格列
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