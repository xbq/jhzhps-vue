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
			            'username',
			            {
			              rules: [{
			                required: true,
			                message: '请输入用户名!',
			              }],
			            }
			          ]"
								 placeholder="用户名" />
							</a-form-item>
							<a-form-item :label="`所属单位`" v-if="i===2">
								<a-select v-decorator="[
										'department',
										{
										  rules: [{
										    required: true,
										    message: '请选择所属单位!',
										  }],
										}
									]"
								 placeholder="所属单位">
									<a-select-option v-for="departmentType in departmentTypes"
													:key="departmentType.id"
													:value="departmentType.id">
										{{departmentType.name}}
									</a-select-option>
								</a-select>
							</a-form-item>
							<a-form-item :label="`姓名`" v-if="i===3">
								<a-input v-decorator="[ 
						      'realName'
						    ]"
								 placeholder="姓名" />
							</a-form-item>
							<a-form-item :label="`设置密码`" v-if="i===4">
								<a-input v-decorator="[
						      'password',
						      {
						        rules: [{
						          required: true,
						          message: '请输入密码!'
						        }],
								initialValue: '123456'
						      }
						    ]" type="password"/>
							</a-form-item>
							<a-form-item :label="`用户角色`" v-if="i===5">
								<a-select v-decorator="[
										'role',
										{
										  rules: [{
										    required: true,
										    message: '请选择用户角色!',
										  }],
										}
									]"
								 placeholder="选择角色">
									<a-select-option v-for="roleType in roleTypes"
													:key="roleType.id"
													:value="roleType.id">
										{{roleType.name}}
									</a-select-option>
								</a-select>
							</a-form-item>
							<a-form-item :label="`性别`" v-if="i===6">
								<a-select v-decorator="[
										'gender'
									]"
								 placeholder="性别">
									<a-select-option value="1">
										男
									</a-select-option>
									<a-select-option value="2">
										女
									</a-select-option>
								</a-select>
							</a-form-item>
							</a-form-item>
							<a-form-item :label="`确认密码`" v-if="i===7">
								<a-input v-decorator="[
						      'passwordnew',
						      {
						        rules: [{
						          required: true,
						          message: '请确认密码!',
						        }],
								initialValue: '123456'
						      }
						    ]"
								 placeholder="确认密码" type="password"/>
							</a-form-item>
							</a-form-item>
							<a-form-item :label="`联系电话`" v-if="i===8">
								<a-input v-decorator="[
						      'mobile',
						      {
						        rules: [{
						          required: true,
						          message: '请输入联系电话!',
						        }],
						      }
						    ]"
								 placeholder="联系电话" />
							</a-form-item>
							</a-form-item>
							<a-form-item :label="`年龄`" v-if="i===9">
								<a-input-number :min="1" :max="150" v-decorator="[
						      'age'
						    ]"
								 placeholder="年龄" />
							</a-form-item>
							<a-form-item :label="`负责业务`" v-if="i===10">
								<a-select v-decorator="[
										'workIds',
										{
										  rules: [{
										    required: true,
										    message: '请选择负责的业务!',
										  }],
										}
									]"
								 placeholder="负责业务" mode='multiple'>
									<a-select-option v-for="saleType in saleTypes"
													:key="saleType.id"
													:value="saleType.id">
										{{saleType.name}}
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
			<query-table :queryinputname="queryinputname" :queryselectname="queryselectname" :queryhrefname="queryhrefname"  @childFn="parentFn">

			</query-table>
			<div class="table-box">
				<a-table :columns="columns"
				         size="small"
				         :style="{wordBreak: 'break-all'}"
				         :dataSource="data"
				         :pagination="pagination"
				         :loading="loading"
				         :scroll="{ y: 'calc(100vh - 420px)'}"
				>
				  <template slot="operation" slot-scope="text, record, index">
				    <div class='editable-row-operations'>
				      <a @click="edit(record.id)">编辑</a>
				      <a style="padding: 0 6px;color: #e6e6e6;">|</a>
				      <a @click="deleted(record.id)">删除</a>
				    </div>
				  </template>
				</a-table>
			</div>
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
				querymessage:{},
				limitdata:{'limit':'1000000000'},
				queryinputname: [{
					'palcename': '姓名',
					'name': 'realName'
				}, {
					'palcename': '手机号码',
					'name': 'mobile'
				}],
				queryselectname: [{
					'palcename': '性别',
					'name': 'gender',
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
					'href': 'role/getList',
					'data': ''
				}],
				columns: [{
						title: '单位',
						dataIndex: 'department',
						width: 150,
					},{
						title: '姓名',
						dataIndex: 'realName',
						width: 100,
					},{
						title: '用户名',
						dataIndex: 'username',
						width: 100,
					},{
						title: '用户角色',
						dataIndex: 'roleName',
						width: 100,
					},{
						title: '电话',
						dataIndex: 'mobile',
						width: 100,
					},
					{
						title: '性别',
						dataIndex: 'gender',
						width: 50,
					},
					{
						title: '年龄',
						dataIndex: 'age',
						width: 50,
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
				departmentTypes:[],// 单位集合
				roleTypes:[],// 角色集合
				saleTypes:[],// 业务类型集合
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
			 this.getlist(this.limitdata);
		},
		created(){
			// 获取所有单位
		    this.$get("department/queryList").then(res=>{
		        this.departmentTypes = res.data.data;
		    })
			// 获取所有角色
			this.$get("role/getList").then(res=>{
			    this.roleTypes = res.data.data;
			})
			// 获取所有业务类型
			this.$get("dic/getList",{'type':'任务类型管理','rank':'2'}).then(res=>{
			    this.saleTypes = res.data.data;
			})
		},
		methods: {
			// 添加单位请求
			handleSearch(e) {
			  e.preventDefault();
			  this.form.validateFields((err, values) => {
			    if (!err) {
				 delete values.passwordnew;
				 values.workIds = values.workIds.toString();
				     console.log('Received values of form: ', values);
					 this.$post("user/user_register",values)
					   .then(res => {
					     if (res) {
					       console.log(res);
					     }
					   })
					   .catch(err => {
					     console.log(err);
					     // return false;
					   });
			    }
			  });
			},
			parentFn(payload) {
        this.querymessage = payload;
				this.querymessage.limit = 100000000;
				console.log(899898);
				console.log(this.querymessage);
				this.getlist(this.querymessage);
      },
			// 获取用戶列表
			getlist (wheredata) {
			  this.$get("user/getList",wheredata)
			    .then(res => {
			      if (res) {
			        this.data = res.data.data
			        this.data.forEach((val) => {
			          val.key = val.userId
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
			  if (this.editinfo.name === '') {
			    console.log(this.message);
			    this.$message.warning('单位名称不能为空', 2)
			    return
			  }
			  if (this.editinfo.abbreviation === '') {
			    this.$message.warning('单位简称不能为空', 2);
			    return
			  }
			  if (isNaN(this.editinfo.type)) {
			    this.editinfo.type = Number(this.editinfo.typeId)
			  }
			  this.$post("department/updateById", this.editinfo)
			    .then(res => {
			      if (res) {
			        console.log(res);
			        this.getlist(this.limitdata)
			      }
			    })
			    .catch(err => {
			      console.log(err);
			    });
			  this.visible = false
			  this.$message.success('编辑成功',2);
			},
			// 取消修改
			handleCancel () {
			  this.visible = false
			  console.log('cancel');
			},
			// 删除单位信息
			deleted (id) {
			  this.$post("department/delete", {id: id})
				.then(res => {
				  if (res) {
					console.log(res);
					this.getlist(this.limitdata)
				  }
				})
				.catch(err => {
				  console.log(err);
				});
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
	.table-box{
		width: calc(100% - 40px);
		margin-left: 20px;
		height:300px;
		overflow: auto;
	}
</style>
