<template>
	<div>
		<div id="form-box">
			<page-header titles="添加人员信息"></page-header>
			<div id="components-form-demo-advanced-search">
				<a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
					<a-row :gutter="24">
						<a-col v-for="i in 10" :key="i" :span="8" :style="{ display: i < count ? 'block' : 'none' }">

							<a-form-item :label="`用户名称`" v-if="i===1">
								<a-input v-decorator="[
			            `field-${i}`,
			            {
			              rules: [{
			                required: true,
			                message: 'Input something!',
			              }],
			            }
			          ]"
								 placeholder="placeholder" />
							</a-form-item>
							<a-form-item :label="`所属单位`" v-if="i===2">
								<a-select v-decorator="[
										`field-${i}`,
										{
										  rules: [{
										    required: true,
										    message: 'select something!',
										  }],
										}
									]"
								 placeholder="Select placeholder">
									<a-select-option value="male">
										male
									</a-select-option>
									<a-select-option value="female">
										female
									</a-select-option>
								</a-select>
							</a-form-item>
							<a-form-item :label="`姓名`" v-if="i===3">
								<a-input v-decorator="[
						      `field-${i}`,
						      {
						        rules: [{
						          required: true,
						          message: 'Input something!',
						        }],
						      }
						    ]"
								 placeholder="placeholder" />
							</a-form-item>
							<a-form-item :label="`设置密码`" v-if="i===4">
								<a-input v-decorator="[
						      `field-${i}`,
						      {
						        rules: [{
						          required: true,
						          message: 'Input something!',
						        }],
						      }
						    ]"
								 placeholder="placeholder" />
							</a-form-item>
							<a-form-item :label="`用户角色`" v-if="i===5">
								<a-select v-decorator="[
										`field-${i}`,
										{
										  rules: [{
										    required: true,
										    message: 'select something!',
										  }],
										}
									]"
								 placeholder="Select placeholder">
									<a-select-option value="male">
										male
									</a-select-option>
									<a-select-option value="female">
										female
									</a-select-option>
								</a-select>
							</a-form-item>
							<a-form-item :label="`性别`" v-if="i===6">
								<a-select v-decorator="[
										`field-${i}`,
										{
										  rules: [{
										    required: true,
										    message: 'select something!',
										  }],
										}
									]"
								 placeholder="Select placeholder">
									<a-select-option value="male">
										male
									</a-select-option>
									<a-select-option value="female">
										female
									</a-select-option>
								</a-select>
							</a-form-item>
							</a-form-item>
							<a-form-item :label="`确认密码`" v-if="i===7">
								<a-input v-decorator="[
						      `field-${i}`,
						      {
						        rules: [{
						          required: true,
						          message: 'Input something!',
						        }],
						      }
						    ]"
								 placeholder="placeholder" />
							</a-form-item>
							</a-form-item>
							<a-form-item :label="`联系电话`" v-if="i===8">
								<a-input v-decorator="[
						      `field-${i}`,
						      {
						        rules: [{
						          required: true,
						          message: 'Input something!',
						        }],
						      }
						    ]"
								 placeholder="placeholder" />
							</a-form-item>
							</a-form-item>
							<a-form-item :label="`年龄`" v-if="i===9">
								<a-input v-decorator="[
						      `field-${i}`,
						      {
						        rules: [{
						          required: true,
						          message: 'Input something!',
						        }],
						      }
						    ]"
								 placeholder="placeholder" />
							</a-form-item>
							<a-form-item :label="`负责业务`" v-if="i===10">
								<a-select v-decorator="[
										`field-${i}`,
										{
										  rules: [{
										    required: true,
										    message: 'select something!',
										  }],
										}
									]"
								 placeholder="Select placeholder">
									<a-select-option value="male">
										male
									</a-select-option>
									<a-select-option value="female">
										female
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
					</a-row>
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
				</a-form>
			</div>
		</div>
		<div id="data-box">
			<page-header titles="数据列表"></page-header>
			<query-table :queryinputname="queryinputname" :queryselectname="queryselectname" :queryhrefname="queryhrefname">

			</query-table>
			<a-table :columns="columns" size="small" :style="{wordBreak: 'break-all'}" :dataSource="data" :pagination="pagination"
			 :loading="loading" :scroll="{ y: 'calc(100vh - 440px)'}">
				<template slot="operation" slot-scope="text, record, index">
					<div class='editable-row-operations'>
						<a @click="edit(record.id)">编辑</a>
						<a style="padding: 0 6px;color: #e6e6e6;">|</a>
						<a @click="deleted(record.id)">删除</a>
					</div>
				</template>
			</a-table>
			<a-modal
			        title="信息编辑"
			        :visible="visible"
			        @ok="handleOk"
			        :confirmLoading="confirmLoading"
			        @cancel="handleCancel"
			        :centered=true
			>
			  <a-form>
			    <a-form-item label="单位名称" :labelCol="{span: 5}" :wrapperCol="{span: 16, offset: 1}" >
			      <a-input v-model="editinfo.name">
			      </a-input>
			    </a-form-item>
			    <a-form-item label="单位简称" :labelCol="{span: 5}" :wrapperCol="{span: 16, offset: 1}">
			      <a-input  v-model="editinfo.abbreviation">
			      </a-input>
			    </a-form-item>
			    <a-form-item label="单位类型" :labelCol="{span: 5}" :wrapperCol="{span: 16, offset: 1}" :style="{marginBottom: 0}">
			      <a-select :allowClear='true'  v-model="editinfo.type">
			        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
			        <a-select-option
			                v-for="departmentType in departmentTypes"
			                :key="departmentType.id"
			                :value="departmentType.id"
			        >{{departmentType.name}}</a-select-option>
			      </a-select>
			    </a-form-item>
			  </a-form>
			</a-modal>
		</div>
	</div>
</template>
<script>
	import pageHeader from '@/components/pageHeader.vue'
	import queryTable from '@/components/queryTable.vue'
	export default {
		data() {
			return {
				expand: false,
				form: this.$form.createForm(this),
				queryinputname: [{
					'palcename': '用户名',
					'name': 'name'
				}, {
					'palcename': '手机号码',
					'name': 'tel'
				}],
				queryselectname: [{
					'palcename': '性别',
					'name': 'sex',
					'width': '100px'
				},{
					'palcename': '单位',
					'name': 'department',
					'width': '300px'
				}, {
					'palcename': '用户角色',
					'name': 'role',
					'width': '200px'
				}],
				queryhrefname: [{
					'href': 'department/queryList',
					'data': ''
				}, {
					'href': 'dic/getList',
					'data': {
						type: '单位类型',
						rank: 2
					}
				}],
				columns: [{
						title: '单位类型',
						dataIndex: 'type',
						width: 100,
					},
					{
						title: '单位名称',
						dataIndex: 'name',
						width: 100,
					},
					{
						title: '单位简称',
						dataIndex: 'abbreviation',
						width: 100,
					},
					{
						title: '操作',
						dataIndex: 'operation',
						width: 100,
						scopedSlots: {
							customRender: 'operation'
						},
					}
				], // 表格列
				data: [], // 表格数据
				editinfo: {}, //编辑信息
				confirmLoading: false, // 是否加载中
				departmentTypes:[],
				visible: false, //企业信息编辑
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
			};
		},
		components: {
			'page-header': pageHeader,
			'query-table': queryTable
		},
		computed: {
			count() {
				return this.expand ? 11 : 11;
			},
		},
		mounted() {
			 this.getlist()
		},
		created(){
		    this.$get("dic/getList",{type:'单位类型',rank:2}).then(res=>{
		        this.departmentTypes = res.data.data;
		    })
		},
		methods: {
			handleSearch(e) {
				e.preventDefault();
				this.form.validateFields((error, values) => {
					console.log('error', error);
					console.log('Received values of form: ', values);
				});
			},
			// 获取单位列表
			getlist () {
			  this.$get("department/queryList")
			    .then(res => {
			      if (res) {
			        console.log(res);
			        this.data = res.data.data
			        this.data.forEach((val) => {
			          val.key = val.id
			        })
			      }
			    })
			    .catch(err => {
			      console.log(err);
			    });
			},
			// 修改单位数据
			edit (id) {
			  this.$get("department/getDetail", {id: id})
			    .then(res => {
			      if (res) {
			        console.log(res);
			        this.editinfo = res.data.data
			        this.visible = true
			      }
			    })
			    .catch(err => {
			      console.log(err);
			    });
			},
			// 确认修改
			handleOk () {
			  this.$post("department/updateById", this.editinfo)
			    .then(res => {
			      if (res) {
			        console.log(res);
			        this.getlist()
			      }
			    })
			    .catch(err => {
			      console.log(err);
			    });
			  this.visible = false
			  console.log('ok');
			},
			// 取消修改
			handleCancel () {
			  this.visible = false
			  console.log('cancel');
			},
			handleReset() {
				this.form.resetFields();
			},

			toggle() {
				this.expand = !this.expand;
			},
		},
	};
</script>
<style lang="scss">
	.ant-advanced-search-form {
		padding: 24px;
		border-radius: 6px;
	}

	.ant-advanced-search-form .ant-form-item {
		display: flex;
	}

	.ant-advanced-search-form .ant-form-item-control-wrapper {
		flex: 1;
	}

	#components-form-demo-advanced-search .ant-form {
		max-width: none;
	}
</style>
