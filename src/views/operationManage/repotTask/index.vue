<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
				<page-header titles="任务基本信息"></page-header>
				  <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
				  	<a-row :gutter="24">
				  		<a-col v-for="i in 10" :key="i" :span="6" :style="{ display: i < count ? 'block' : 'none' }">
				  
				  			<a-form-item :label="`紧急程度`" v-if="i===1">
				  				<a-select v-decorator="[
				  						'urgencyDegree'
				  					]"
				  				 placeholder="紧急程度">
				  					<a-select-option value="1">
				  						紧急
				  					</a-select-option>
				  					<a-select-option value="2">
				  						普通
				  					</a-select-option>
				  				</a-select>
				  				</a-select>
				  			</a-form-item>
				  			<a-form-item :label="`任务大类`" v-if="i===2">
				  				<a-select v-decorator="[
				  						'bigLevel',
				  						{
				  						  rules: [{
				  						    required: true,
				  						    message: '请选择任务大类!',
				  						  }],
				  						}
				  					]"
				  				 placeholder="任务大类" @change="handleSelectChange">
				  					<a-select-option v-for="taskBig in taskBigLevel"
				  									:key="taskBig.id"
				  									:value="taskBig.id">
				  						{{taskBig.name}}
				  					</a-select-option>
				  				</a-select>
				  			</a-form-item>
				  			<a-form-item :label="`任务小类`" v-if="i===3">
				  				<a-select v-decorator="[
				  						'smallLevel',
				  						{
				  						  rules: [{
				  						    required: true,
				  						    message: '请选择任务小类!',
				  						  }],
				  						}
				  					]"
				  				 placeholder="任务小类" @change="handleSelectDetialChange">
				  					<a-select-option v-for="taskSmall in taskSmallLevel"
				  									:key="taskSmall.id"
				  									:value="taskSmall.id">
				  						{{taskSmall.name}}
				  					</a-select-option>
				  				</a-select>
				  			</a-form-item>
				  			<a-form-item :label="`细分类型`" v-if="i===4">
				  				<a-select v-decorator="[
				  						'detailLevel',
				  						{
				  						  rules: [{
				  						    required: true,
				  						    message: '请选择细分类型!',
				  						  }],
				  						}
				  					]"
				  				 placeholder="细分类型">
				  					<a-select-option v-for="taskDetail in taskDetailLevel"
				  									:key="taskDetail.id"
				  									:value="taskDetail.id">
				  						{{taskDetail.name}}
				  					</a-select-option>
				  				</a-select>
				  			</a-form-item>
				  			<a-form-item :label="`任务来源`" v-if="i===5">
				  				<a-input v-decorator="[
				  				  'source',
				  				  {
				  				    rules: [{
				  				      required: true,
				  				      message: '任务来源!',
				  				    }],
				  				  }
				  				]"
				  												 placeholder="上报人员" />
				  			</a-form-item>
				  			<a-form-item :label="`上报人员`" v-if="i===6">
				  				<a-input v-decorator="[
				  				  'userId',
				  				  {
				  				    rules: [{
				  				      required: true,
				  				      message: '上报人员!',
				  				    }],
				  				  }
				  				]"
				  												 placeholder="上报人员" />
				  			</a-form-item>
				  			<a-form-item :label="`上报单位`" v-if="i===7">
				  				<a-input v-decorator="[
				  				  'department',
				  				  {
				  				    rules: [{
				  				      required: true,
				  				      message: '上报单位!',
				  				    }],
				  				  }
				  				]"
				  												 placeholder="上报单位" />
				  			</a-form-item>
				  			<a-form-item :label="`上报时间`" v-if="i===8">
				  				<a-select v-decorator="[
				  						'reportTime',
				  						{
				  						  rules: [{
				  						    required: true,
				  						    message: '请选择上报时间!',
				  						  }],
				  						}
				  					]"
				  				 placeholder="上报时间">
				  					<a-select-option v-for="departmentType in departmentTypes"
				  									:key="departmentType.id"
				  									:value="departmentType.id">
				  						{{departmentType.name}}
				  					</a-select-option>
				  				</a-select>
				  			</a-form-item>
				  		</a-col>
				  	</a-row>
				  </a-form>
			</a-layout-header>
      <a-layout>
        <a-layout-content>map</a-layout-content>
        <a-layout-sider style="flex:0 0 400px;width:400px;max-width: 400px;margin-left: 15px;">
					<page-header titles="养护前照片上传"></page-header>
				</a-layout-sider>
      </a-layout>
      <a-layout-footer>
				<a-row>
					<a-col :span="24" :style="{ textAlign: 'right' }">
						<a-button :style="{ marginRight: '8px' }" @click="handleReset">
							清空
						</a-button>
						<a-button type="primary" html-type="submit">
							添加
						</a-button>
					</a-col>
				</a-row>
			</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped="scoped" lang="scss">
.ant-layout-header{
	height: 170px;
	padding:0;
	line-height: 1;
}
.ant-layout-footer{
	height: 80px;
	padding:0;
	line-height: 1;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #fff;
  color: #333;
}
#components-layout-demo-basic .ant-layout-footer {
  // line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #fff;
  color: #333;
	margin:15px 0;
}
#components-layout-demo-basic .ant-layout-content {
  background: #fff;
  color: #333;
  height: 570px;
	margin:15px 0;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>
<script>
	import pageHeader from '@/components/pageHeader.vue'
	export default{
		data(){
			return {
				 expand: false,
					form: this.$form.createForm(this),
					taskBigLevel:[],//任务大类集合
					taskSmallLevel:[],//任务小类集合
					taskDetailLevel:[] //细分类型集合
			}
		},
		components: {
			'page-header': pageHeader
		},
		created(){
			// 获取所有任务大类
		    this.$get("dic/getList?type=任务类型管理&rank=2").then(res=>{
		        this.taskBigLevel = res.data.data;
				})
		},
		mounted(){
			console.log(777777);
			console.log(data);
		},
		computed: {
			count () {
				return this.expand ? 11 : 9;
			},
		},
		methods: {
			handleSearch  (e) {
				e.preventDefault();
				this.form.validateFields((error, values) => {
					console.log('error', error);
					console.log('Received values of form: ', values);
				});
			},
			handleSelectChange (value) {
				// 获取大类对应下的任务小类
				  this.$get("dic/getList",{'parentId':value}).then(res=>{
				      this.taskSmallLevel = res.data.data;
					})
			},
			handleSelectDetialChange (value) {
				// 获取大类对应下的细分类型
				  this.$get("dic/getList",{'parentId':value}).then(res=>{
				      this.taskDetailLevel = res.data.data;
					})
			},
			handleReset () {
				this.form.resetFields();
			},

			toggle  () {
				this.expand = !this.expand;
			},
		}
	}
</script>