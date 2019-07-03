<template>
  <div class="app-container">
    <a-row :gutter="15">
      <a-col :span="18">
        <a-card :body-style="{padding: '0 10px'}">
          <h3>数据列表</h3>
          <a-tabs
                  hideAdd
                  v-model="activeKey"
                  type="card"
                  :style="{marginTop: '20px', padding: '0 5px'}"
                  :tabBarGutter="0"
          >
            <a-tab-pane tab="科室审核通过" key="1" :closable=false>
              <div class="item">
                <div class="query">
                  <div>
                    <a-range-picker size="large" allowClear  @change="onChange"></a-range-picker>
                    <a-button size="large" type="primary">查询</a-button>
                  </div>
                </div>
                <a-table :columns="columns" :dataSource="data" :style="{marginTop: '20px'}" :scroll="{}" :pagination="pagination"
                         :loading="loading">
                </a-table>
              </div>
            </a-tab-pane>
            <a-tab-pane tab="不下发" key="2" :closable=false>
              <div class="item">
                2
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card :body-style="{padding: '0 10px'}">
          <h3>任务详情</h3>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: '1', // tabs切换key值
      columns: [
        { title: '时间', width: 180, dataIndex: 'alarmTime', key: 'alarmTime'},
        { title: '监测点', width: 180, dataIndex: 'location', key: 'location',  },
        { title: '报警类型', dataIndex: 'alarmType', key: 'alarmType', width: 120 },
        { title: '数据值', dataIndex: 'dataValue', key: 'dataValue', width: 120 },
        { title: '负责人', dataIndex: 'name', key: 'name', width: 120 },
        { title: '联系电话', dataIndex: 'tel', key: 'tel', width: 180 },
        { title: '备注', dataIndex: 'remark', key: 'remark', width: 200 },
        { title: '状态', dataIndex: 'status', key: 'status', width: 80 },
      ], //表格列
      data: [],  //表格数据
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 5,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: total => `共 ${total} 条`,
        // onShowSizeChange:(current, pageSize)=>this.pageSize = pageSize,
        pageSizeOptions: ['5', '10', '20', '30']
      }, // 分页配置
      loading: false, // 表格是否加载中
    }
  },
  filters: {
   
  },
  created() {
  },
  methods: {
   
  }
}
</script>
<style scope lang="scss">
.item{
  height: calc(100vh - 216px);
}
</style>