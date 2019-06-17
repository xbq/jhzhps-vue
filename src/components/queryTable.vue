<template>
	<div class="query-box">
		<a-form layout="inline">
			<a-form-item v-for="(item,index) in queryinputname" v-if="queryinputname.length > 0">
				<a-input :placeholder="item.palcename" :name="item.name" />
			</a-form-item>
			<a-form-item v-for="(item,index) in queryselectname" v-if="queryselectname.length > 0">
				<a-select :placeholder="item.palcename" :style="{'width':item.width}" :name="item.name">
					<a-select-option value="角色1">
						角色1
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
				departmentArr:[]
			};
		},
		props: {
			queryinputname: {
				type: Array
			},
			queryselectname: {
				type: Array
			}
		},
		mounted() {
			console.log(this.queryinputname);
			console.log(this.queryselectname);
		},
		methods: {},
		created() {
			this.$get("department/queryList").then(res => {
				this.departmentArr = res.data.data;
				console.log(res);
			})
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
