<template>
	<div class="query-box">
		<a-form layout="inline" @submit="handleQuery">
			<a-form-item v-for="(item,index) in queryinputname" v-if="queryinputname.length > 0">
				<a-input :placeholder="item.palcename" :name="item.name" />
			</a-form-item>
			<a-form-item v-for="(item,index) in queryselectname" v-if="queryselectname.length > 0">
				<a-select :placeholder="item.palcename" :style="{'width':item.width}" :name="item.name">
					<a-select-option v-for="departmentItem in dataArr[index]"
									:key="departmentItem.id"
									:value="departmentItem.id"  v-if="item.name == 'sex'">
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
				dataArr:[]
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
			// 查询
			handleQuery(e) {
			  e.preventDefault();
			  this.form.validateFields((err, values) => {
			    if (!err) {
				     console.log('Received values of form: ', values);
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
