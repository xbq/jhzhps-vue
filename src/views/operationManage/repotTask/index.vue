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
				  						'urgencyDegree',
											{
				  						  rules: [{
				  						    required: true,
				  						    message: '请选择紧急程度!',
				  						  }],
				  						}
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
				  				<a-date-picker @change="onChange" v-decorator="[
				  						'reportTime',
											{
				  						  rules: [{
				  						    required: true
				  						  }],
				  						}
				  					]"/>
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
					<div class="clearfix">
						<a-upload
							action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
							listType="picture-card"
							:fileList="fileList"
							@preview="handlePreview"
							@change="handleChange"
						>
							<div v-if="fileList.length < 100">
								<a-icon type="plus" />
								<div class="ant-upload-text">Upload</div>
							</div>
						</a-upload>
						<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
							<img alt="example" style="width: 100%" :src="previewImage" />
						</a-modal>
					</div>
				</a-layout-sider>
      </a-layout>
      <a-layout-footer>
				<a-row>
					<a-col :span="24" :style="{ textAlign: 'right', marginTop: '20px'}">
						<a-button :style="{ marginRight: '15px' }" @click="handleReset">
							重置
						</a-button>
						<a-button :style="{ marginRight: '20px' }" type="primary" html-type="submit">
							创建
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
.ant-btn{
	height: 40px;
	width: 100px;
}
// 上传样式
.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
	margin-top: 8px;
	color: #666;
}
.clearfix{
	height: calc(50% - 15px);
	overflow: auto;
}
.ant-upload.ant-upload-select-picture-card{
	background: orange;
}
.clearfix .ant-upload-list-picture-card .ant-upload-list-item{
	width:90px;
	height:90px;
	margin:10px 0 10px 10px;
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
					taskDetailLevel:[],//细分类型集合
					previewVisible: false,
					previewImage: '',
					fileList: [{
						uid: '-1',
						name: 'xxx.png',
						status: 'done',
						url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
					}],
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
			onChange(date, dateString) {
				console.log(date, dateString);
			},
			handleReset () {
				this.form.resetFields();
			},
			handleCancel () {   // 上传
      this.previewVisible = false
			},
			handlePreview (file) {
				this.previewImage = file.url || file.thumbUrl
				this.previewVisible = true
			},
			handleChange ({ fileList }) {
				this.fileList = fileList
			},
			toggle  () {
				this.expand = !this.expand;
			},
		}
	}
</script>