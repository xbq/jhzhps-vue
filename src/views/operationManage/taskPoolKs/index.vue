<template>
  <div id="components-layout-demo-basic">
	<a-layout>
        <a-layout-content>
					<page-header titles="任务列表"></page-header>
					<div class="card-container">
						<a-tabs type="card"  v-model="activeKey" @click="change(activeKey)">
							 <a-tab-pane :tab="taskTab.name" :key="taskTab.status" v-for="(taskTab,index) in taskTabTitle">
								<a-table :columns="columns" :dataSource="data" :scroll="{ x: 1300 }" @change="pagechange" :pagination="pagination" :customRow="click" :rowClassName="setRowClassName">
									<a slot="action" slot-scope="text" href="javascript:;">打印</a>
								</a-table>
							</a-tab-pane>
						</a-tabs>
					</div>
				</a-layout-content>
        <a-layout-sider style="flex:0 0 320px;width:320px;max-width: 320px;margin-left: 15px;">
					<page-header titles="任务详情"></page-header>
					<task-detail :details=this.rowDetails></task-detail>
				</a-layout-sider>
      </a-layout>
  </div>
</template>
<style scoped="scoped" lang="scss">
#components-layout-demo-basic .ant-layout-sider {
  background:#fff;
}
#components-layout-demo-basic .ant-layout-content {
  color: #fff;
  min-height: 120px;
	height: 850px;
	background: #fff;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
// 标签页
.card-container > .ant-tabs-card > .ant-tabs-content {
  height: 120px;
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
.card-container{
	background: #fff;
	overflow: hidden;
	padding:15px;
}
.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane[data-v-5412eb2e]{
	padding: 0;
}
.clickRowStyl{
	background-color:#00b4ed;
}
.ant-table-tbody>.clickRowStyl:hover>td{
	background-color:#00b4ed;
} 
</style>
<script>
import pageHeader from '@/components/pageHeader.vue'
import taskDetail from '@/components/taskDetail.vue'
const columns = [
  { title: '任务编号', width: 120, dataIndex: 'taskNum', key: '1', fixed: 'left' },
  { title: '状态', width: 100, dataIndex: '', key: '2', fixed: 'left' },
  { title: '任务大类', dataIndex: 'bigLevel', key: '3' },
  { title: '紧急程度', dataIndex:'urgencyDegree', key: '4' },
  { title: '上报时间', dataIndex: 'reportTime', key: '5' },
  { title: '地点/路线', dataIndex:'siteName', key: '6' },
  { title: '任务来源', dataIndex: 'source', key: '7' },
  { title: '剩余时间', dataIndex: 'expend',key: '8' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'action' },
  },
];

export default {
  data () {
    return {
			taskTabTitle:[{'name':'新任务','status':'1'},{'name':'正在养护','status':'2'},{'name':'养护完成','status':'3'},{'name':'正在监理','status':'4'},{'name':'监理审核不通过','status':'6'},{'name':'养护存在问题','status':'8'},{'name':'监理存在问题','status':'9'}],
			data:[],
      columns,
			rowDetails:{},//点击获取一行的值
			clickRowColor:{'background-color': 'rgb(204, 238, 255)'},
			activeKey: '1',
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
			  pageSizeOptions: ['10', '20', '30', '40', '50']
			}
    }
  },
	components: {
		'page-header': pageHeader,
		'task-detail':taskDetail
	},
	created(){
			// 初始化任务列表
			this.getList(1)
		},
  methods: {
    change (key) {
			this.getList(key);
    },
		getList(key){
			// 获取任务列表
			this.$get("task/getList",{'limit':'-1','status':key}).then(res=>{
					this.data = res.data.data;
			})
		},
    pagechange (pagination) {
		 // 页码改变时重新获取数据
        if(this.pagination.pageSize !== pagination.pageSize){
          pagination.current = 1;
        }
        this.pagination = pagination;
        this.getlist()
      },
		 click(record, index){
        return {
            on: {
               click: () => {
								 this.rowDetails = record;
               }
            }
        }
    },
		setRowClassName(record, index){
		}
  },
	mounted(){
		
	}
}
</script>
