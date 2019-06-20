<template>
	<div class="query-box">
		<a-form layout="inline" :form="form" @submit="handleSearch">
			<a-form-item v-for="(item,index) in queryinputname" v-if="queryinputname.length > 0">
				<a-input v-decorator="[item.name]" :placeholder="item.palcename" />
			</a-form-item>
			<a-form-item v-for="(item,index) in queryselectname" v-if="queryselectname.length > 0">
				<a-select :placeholder="item.palcename" :style="{'width':item.width}" v-decorator="[item.name]">
					<a-select-option v-for="departmentItem in dataArr[index]"
									:key="departmentItem.id"
									:value="departmentItem.id"  v-if="item.name == 'gender'">
						{{departmentItem.sex}}
					</a-select-option>
					<a-select-option v-for="departmentItem in dataArr[index]"
									:key="departmentItem.id"
									:value="departmentItem.id" v-if="item.name == 'department'">
						{{departmentItem.name}}
					</a-select-option>
					<a-select-option v-for="departmentItem in dataArr[index]"
									:key="departmentItem.id"
									:value="departmentItem.id"  v-if="item.name == 'role'">
						{{departmentItem.name}}
					</a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item>
				<a-button type="primary" html-type="submit">
					查询
				</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				form: this.$form.createForm(this),
				dataArr:[],
				queryData:{}
			};
		},
		props: {
			queryinputname: {
				type: Array
			},
			queryselectname: {
				type: Array
			},
			queryhrefname:{
				type:Array
			}
		},
		mounted() {

		},
		methods: {
			handleSearch(e) {
			  e.preventDefault();
			  this.form.validateFields((err, values) => {
			    if (!err) {
				 this.queryData = values;
				 this.$emit('childFn', this.queryData);
			    }
			  });
			},
		},
		created() {
			var _this = this;
			this.queryhrefname.map((item,index)=>{
				(async function(obj){
					await _this.$get(obj.href).then(res => {
						_this.dataArr.push(res.data.data);
					})
				})(item)
			})
			this.dataArr.push([{'id':1,sex:'男'},{'id':2,sex:'女'}]);
		},
	};
</script>
<style lang="scss" scoped="scoped">
	.query-box {
		width: calc(100% - 20px);
		height: 40px;
		margin: 30px 0px 30px 20px;
	}
</style>
