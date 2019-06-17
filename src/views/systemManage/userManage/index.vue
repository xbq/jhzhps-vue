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
			<page-header titles = "数据列表"></page-header>
			<query-table :queryinputname = "queryinputname" :queryselectname = "queryselectname"></query-table>
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
				queryinputname:[{'palcename':'用户名','name':'name'},{'palcename':'手机号码','name':'tel'}],
				queryselectname:[{'palcename':'单位','name':'department','width':'200px'},{'palcename':'用户角色','name':'role','width':'200px'},{'palcename':'性别','name':'sex','width':'100px'}]
			};
		},
		components: {
			'page-header': pageHeader,
			'query-table':queryTable
		},
		computed: {
			count() {
				return this.expand ? 11 : 11;
			},
		},
		methods: {
			handleSearch(e) {
				e.preventDefault();
				this.form.validateFields((error, values) => {
					console.log('error', error);
					console.log('Received values of form: ', values);
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
</style>
