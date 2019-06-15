<template>
	<div class="border-title">
		<p>{{titles}}</p>
	</div>
</template>


<script>
	export default{
		data(){
			return{
			}
		},
		props:{
			titles:{
				type: String,
				default: '数据列表'
			}
		}
	}
</script>
<style lang="scss" scoped="scoped">
	.border-title{
		width: calc(100% - 20px);
		height: 39px;
		margin:0 auto;
		border-bottom: 1px solid #e0e0e0;
		p{
			position: relative;
			padding-left: 10px;
			line-height: 36px;
			letter-spacing: 1px;
			color: #323232;
			font-family: AlibabaPuHuiTiR;
			font-size: 16px;
			&:before{
				content: '';
				width: 5px;
				height: 16px;
				background-color: #0095ff;
				position: absolute;
				left: 0px;
				top: 11px;
			}
		}
	}
</style>